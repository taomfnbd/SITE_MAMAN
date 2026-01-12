
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables manually if not provided
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    } catch (e) {
        console.log("Could not read .env file, relying on process.env");
    }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'cms-images';

function isBase64(str) {
    return typeof str === 'string' && str.startsWith('data:');
}

function getExtensionFromMime(mime) {
    switch (mime) {
        case 'image/jpeg': return 'jpg';
        case 'image/png': return 'png';
        case 'image/webp': return 'webp';
        case 'image/gif': return 'gif';
        case 'application/pdf': return 'pdf';
        case 'application/msword': return 'doc';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'docx';
        default: return 'bin';
    }
}

async function uploadBase64(base64Str) {
    try {
        // Extract content type and base64 data
        const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        
        if (!matches || matches.length !== 3) {
            console.warn("Invalid base64 string format");
            return base64Str; // Return original if invalid
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const extension = getExtensionFromMime(mimeType);
        
        const buffer = Buffer.from(base64Data, 'base64');
        const fileName = `migrated-${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, buffer, {
                contentType: mimeType,
                upsert: false
            });

        if (error) {
            console.error("Error uploading to Supabase:", error);
            return base64Str;
        }

        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        console.log(`Uploaded ${fileName} -> ${publicUrl}`);
        return publicUrl;
    } catch (e) {
        console.error("Exception during upload:", e);
        return base64Str;
    }
}

async function traverseAndMigrate(obj) {
    if (!obj) return obj;

    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = await traverseAndMigrate(obj[i]);
        }
    } else if (typeof obj === 'object') {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (isBase64(obj[key])) {
                    console.log(`Found Base64 in key: ${key}`);
                    obj[key] = await uploadBase64(obj[key]);
                } else {
                    obj[key] = await traverseAndMigrate(obj[key]);
                }
            }
        }
    }
    return obj;
}

async function migrateSiteContent() {
    console.log("Migrating site_content...");
    const { data: records, error } = await supabase.from('site_content').select('*');
    
    if (error) {
        console.error("Error fetching site_content:", error);
        return;
    }

    let updatedCount = 0;

    for (const record of records) {
        const originalDataStr = JSON.stringify(record.data);
        const newData = await traverseAndMigrate(JSON.parse(JSON.stringify(record.data)));
        
        if (JSON.stringify(newData) !== originalDataStr) {
            console.log(`Updating site_content key: ${record.key}`);
            const { error: updateError } = await supabase
                .from('site_content')
                .update({ data: newData })
                .eq('key', record.key);
            
            if (updateError) console.error(`Failed to update ${record.key}:`, updateError);
            else updatedCount++;
        }
    }
    console.log(`Finished site_content. Updated ${updatedCount} records.`);
}

async function migrateArticles() {
    console.log("Migrating articles...");
    const { data: records, error } = await supabase.from('articles').select('*');
    
    if (error) {
        console.error("Error fetching articles:", error);
        return;
    }

    let updatedCount = 0;

    for (const record of records) {
        const originalDataStr = JSON.stringify(record.data);
        const newData = await traverseAndMigrate(JSON.parse(JSON.stringify(record.data)));
        
        if (JSON.stringify(newData) !== originalDataStr) {
            console.log(`Updating article id: ${record.id}`);
            const { error: updateError } = await supabase
                .from('articles')
                .update({ data: newData })
                .eq('id', record.id);
            
            if (updateError) console.error(`Failed to update article ${record.id}:`, updateError);
            else updatedCount++;
        }
    }
    console.log(`Finished articles. Updated ${updatedCount} records.`);
}

async function main() {
    await migrateSiteContent();
    await migrateArticles();
    console.log("Migration complete.");
}

main();

import React, { useRef, useEffect, useCallback } from 'react';
import * as FiIcons from 'react-icons/fi';

const ToolbarButton = ({ icon: Icon, onClick, title }) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    className="p-2 rounded hover:bg-clay/20 text-charcoal-light hover:text-clay transition-colors"
    title={title}
    type="button"
  >
    <Icon className="w-4 h-4" />
  </button>
);

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const contentRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.innerHTML !== value) {
        if (value === '' || !contentRef.current.innerHTML) {
            contentRef.current.innerHTML = value || '';
        }
    }
  }, []);

  const execCommand = (command, arg = null) => {
    document.execCommand(command, false, arg);
    flushChange();
  };

  const flushChange = useCallback(() => {
    if (contentRef.current) {
      onChange(contentRef.current.innerHTML);
    }
  }, [onChange]);

  const handleChange = useCallback(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(flushChange, 300);
  }, [flushChange]);

  return (
    <div className="border border-clay/20 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-clay/5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-clay/10 bg-sage/5 sticky top-0 z-10">
        <ToolbarButton icon={FiIcons.FiBold} onClick={() => execCommand('bold')} title="Gras" />
        <ToolbarButton icon={FiIcons.FiItalic} onClick={() => execCommand('italic')} title="Italique" />
        <ToolbarButton icon={FiIcons.FiUnderline} onClick={() => execCommand('underline')} title="Souligné" />
        <div className="w-px h-4 bg-clay/20 mx-2" />
        <ToolbarButton icon={FiIcons.FiAlignLeft} onClick={() => execCommand('justifyLeft')} title="Aligner à gauche" />
        <ToolbarButton icon={FiIcons.FiAlignCenter} onClick={() => execCommand('justifyCenter')} title="Centrer" />
        <ToolbarButton icon={FiIcons.FiAlignRight} onClick={() => execCommand('justifyRight')} title="Aligner à droite" />
        <div className="w-px h-4 bg-clay/20 mx-2" />
        <ToolbarButton icon={FiIcons.FiList} onClick={() => execCommand('insertUnorderedList')} title="Liste à puces" />
        <ToolbarButton icon={FiIcons.FiLink} onClick={() => { const url = prompt('URL du lien:'); if(url) execCommand('createLink', url); }} title="Lien" />
        {/* Basic Header support via formatBlock */}
        <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'H2'); }} className="px-2 text-sm font-serif font-bold text-charcoal-light hover:text-clay">H1</button>
        <button onMouseDown={(e) => { e.preventDefault(); execCommand('formatBlock', 'H3'); }} className="px-2 text-sm font-serif font-bold text-charcoal-light hover:text-clay">H2</button>
      </div>
      
      {/* Editor Area */}
      <div
        ref={contentRef}
        className="p-8 min-h-[500px] outline-none prose prose-lg max-w-none text-charcoal-light font-light leading-loose focus:bg-white transition-colors"
        contentEditable
        onInput={handleChange}
        onBlur={flushChange}
        style={{ minHeight: '60vh' }}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;

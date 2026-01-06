import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from './CMSContext';

const EditableText = ({
  id,
  value: propValue,
  onChange,
  defaultValue = '',
  as: Component = 'p',
  className = '',
  multiline = false,
  placeholder = 'Cliquez pour modifier...',
  children
}) => {
  const { isEditMode, getContent, updateContent } = useCMS();
  const [content, setContent] = useState('');
  const elementRef = useRef(null);

  // Determine if controlled or connected
  const isControlled = onChange !== undefined;

  useEffect(() => {
    if (isControlled) {
      setContent(propValue || '');
      if (elementRef.current && elementRef.current.innerText !== propValue) {
        elementRef.current.innerText = propValue || '';
      }
    } else {
      const savedContent = getContent(id, children || defaultValue);
      // Only update if content has changed to prevent loops
      if (savedContent !== content) {
        setContent(savedContent);
        if (elementRef.current && elementRef.current.innerText !== savedContent) {
          elementRef.current.innerText = savedContent;
        }
      }
    }
  }, [id, children, defaultValue, getContent, propValue, isControlled]);

  const handleBlur = (e) => {
    const newContent = e.target.innerText;
    if (newContent !== content) {
      if (isControlled) {
        onChange(newContent);
      } else {
        updateContent(id, newContent);
      }
      setContent(newContent);
    }
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  if (isEditMode) {
    return (
      <Component
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none border border-transparent hover:border-clay/50 hover:bg-clay/5 focus:border-clay focus:bg-white/10 rounded transition-all px-1 -mx-1 cursor-text min-w-[20px] inline-block empty:before:content-[attr(placeholder)] empty:before:text-gray-400`}
        placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Component className={className}>
      {content || children || defaultValue}
    </Component>
  );
};

export default EditableText;

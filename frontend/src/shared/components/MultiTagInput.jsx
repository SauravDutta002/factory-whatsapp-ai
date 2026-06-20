import React, { useState } from 'react';

export default function MultiTagInput({ value, onChange, name, list, options, placeholder, style }) {
  const [inputValue, setInputValue] = useState('');

  const tags = value ? value.split(',').map(t => t.trim()).filter(Boolean) : [];

  const addTag = (newTag) => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      onChange({ target: { name, value: newTags.join(', ') } });
    }
    setInputValue('');
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, idx) => idx !== indexToRemove);
    onChange({ target: { name, value: newTags.join(', ') } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', ...style }}>
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {tags.map((tag, idx) => (
            <span key={idx} style={{ 
              backgroundColor: 'var(--accent-blue-bg)', 
              color: 'var(--accent-blue-text)', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '6px', 
              fontSize: '0.75rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.3rem',
              border: '1px solid #bfdbfe',
              fontWeight: 600
            }}>
              {tag}
              <span 
                style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', lineHeight: 0.8, opacity: 0.7 }} 
                onClick={() => removeTag(idx)}
                title="Remove"
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.7}
              >
                ×
              </span>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <input
          type="text"
          list={list}
          placeholder={placeholder || "Type and press Enter or Add"}
          className="card-input filter-select"
          style={{ flexGrow: 1, padding: '0.4rem 0.75rem', width: '100%', boxSizing: 'border-box' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(inputValue);
            }
          }}
        />
        <button 
          type="button" 
          onClick={() => addTag(inputValue)}
          style={{
            backgroundColor: '#f1f5f9',
            border: '1px solid var(--border-medium)',
            borderRadius: '6px',
            padding: '0 0.75rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.75rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#e2e8f0'}
          onMouseLeave={e => e.target.style.backgroundColor = '#f1f5f9'}
        >
          Add
        </button>
      </div>
      {options && (
        <datalist id={list}>
          {options.map(opt => <option key={opt} value={opt} />)}
        </datalist>
      )}
    </div>
  );
}

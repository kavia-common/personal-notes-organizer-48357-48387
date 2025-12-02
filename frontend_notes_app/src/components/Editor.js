import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function Editor({ note, onChange, onUpdateTags, onTogglePin }) {
  /**
   * Main editor area for a selected note
   */
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tagsInput, setTagsInput] = useState(note?.tags?.join(', ') || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setTagsInput(note?.tags?.join(', ') || '');
  }, [note?.id]); // Reset inputs when switching note

  if (!note) {
    return (
      <section className="editor empty">
        <p>Select or create a note to begin.</p>
      </section>
    );
    }

  const handleBlur = () => {
    if (title !== note.title || content !== note.content) {
      onChange({ ...note, title, content });
    }
  };

  const handleTagsBlur = () => {
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onUpdateTags(tags);
  };

  return (
    <section className="editor">
      <div className="editor-toolbar">
        <button
          className={`icon-btn ${note.pinned ? 'pin-active' : ''}`}
          onClick={() => onTogglePin(!note.pinned)}
          title={note.pinned ? 'Unpin note' : 'Pin note'}
          aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
        >
          📌
        </button>
      </div>
      <input
        className="title-input"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
      />
      <textarea
        className="content-input"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
      />
      <div className="tags-editor">
        <label className="label" htmlFor="tags">Tags</label>
        <input
          id="tags"
          className="input"
          placeholder="e.g., work, ideas, personal"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onBlur={handleTagsBlur}
        />
        <p className="hint">Separate tags with commas.</p>
      </div>
    </section>
  );
}

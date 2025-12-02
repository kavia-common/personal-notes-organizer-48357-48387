import React, { useMemo } from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
  search,
  onSearchChange,
  tags,
  activeTag,
  onTagChange,
}) {
  /**
   * Sidebar with search, tag filters, and note list
   */
  const allTags = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => n.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [notes]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return notes
      .filter((n) =>
        !s
          ? true
          : n.title.toLowerCase().includes(s) ||
            n.content.toLowerCase().includes(s) ||
            (n.tags || []).some((t) => t.toLowerCase().includes(s))
      )
      .filter((n) => (!activeTag ? true : (n.tags || []).includes(activeTag)))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
  }, [notes, search, activeTag]);

  return (
    <aside className="sidebar">
      <div className="sidebar-actions">
        <button className="btn primary" onClick={onCreate} aria-label="Create new note">
          ＋ New Note
        </button>
        <div className="search-wrap">
          <input
            className="input"
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search notes"
          />
        </div>
        <div className="tags-wrap">
          <button
            className={`tag-pill ${!activeTag ? 'active' : ''}`}
            onClick={() => onTagChange(null)}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              className={`tag-pill ${activeTag === t ? 'active' : ''}`}
              onClick={() => onTagChange(t)}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      <nav className="notes-list" aria-label="Notes list">
        {filtered.length === 0 && (
          <div className="empty-hint">No notes found. Try creating a new one.</div>
        )}
        {filtered.map((n) => (
          <button
            key={n.id}
            className={`note-item ${selectedId === n.id ? 'selected' : ''}`}
            onClick={() => onSelect(n.id)}
            title={n.title}
          >
            <div className="note-item-top">
              <span className="note-title">
                {n.pinned ? '📌 ' : ''}
                {n.title || 'Untitled'}
              </span>
              <button
                className="icon-btn danger"
                title="Delete note"
                aria-label="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(n.id);
                }}
              >
                🗑
              </button>
            </div>
            <div className="note-meta">
              <span className="updated">
                {new Date(n.updatedAt).toLocaleString()}
              </span>
              <div className="tag-list" aria-hidden="true">
                {(n.tags || []).slice(0, 3).map((t) => (
                  <span key={t} className="tag-mini">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}

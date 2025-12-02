import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import {
  loadNotes,
  saveNotes,
  loadTheme,
  saveTheme,
  loadLastSelectedId,
  saveLastSelectedId,
} from './utils/storage';

// PUBLIC_INTERFACE
function App() {
  /** Ocean Notes main application */
  const [theme, setTheme] = useState(loadTheme());
  const [notes, setNotes] = useState(() => loadNotes());
  const [selectedId, setSelectedId] = useState(() => loadLastSelectedId());
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Maintain last selected note id
  useEffect(() => {
    if (selectedId) saveLastSelectedId(selectedId);
  }, [selectedId]);

  // Ensure selected note exists; if not, pick latest
  useEffect(() => {
    if (!notes.length) {
      setSelectedId(null);
      saveLastSelectedId(null);
      return;
    }
    const hasSelected = notes.some((n) => n.id === selectedId);
    if (!hasSelected) {
      const latest = [...notes].sort((a, b) => b.updatedAt - a.updatedAt)[0];
      setSelectedId(latest?.id || null);
    }
  }, [notes, selectedId]);

  // Persist notes whenever they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const envInfo = useMemo(() => {
    const nodeEnv = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development';
    // Only show minimal info; do not require backend
    return nodeEnv;
  }, []);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleCreate = () => {
    const id = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    const now = Date.now();
    const newNote = {
      id,
      title: 'Untitled',
      content: '',
      tags: [],
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    const next = [newNote, ...notes];
    setNotes(next);
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    if (selectedId === id) {
      setSelectedId(next[0]?.id || null);
    }
  };

  // PUBLIC_INTERFACE
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleUpdate = (updated) => {
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? { ...updated, updatedAt: now } : n))
    );
  };

  // PUBLIC_INTERFACE
  const handleUpdateTags = (tags) => {
    if (!selectedNote) return;
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNote.id ? { ...n, tags, updatedAt: now } : n))
    );
  };

  // PUBLIC_INTERFACE
  const handleTogglePin = (pinned) => {
    if (!selectedNote) return;
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNote.id ? { ...n, pinned, updatedAt: now } : n))
    );
  };

  const allTags = useMemo(() => {
    const s = new Set();
    notes.forEach((n) => n.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [notes]);

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} envInfo={envInfo} />
      <Sidebar
        notes={notes}
        selectedId={selectedId}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onDelete={handleDelete}
        search={search}
        onSearchChange={setSearch}
        tags={allTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
      />
      <main className="main">
        <Editor
          note={selectedNote}
          onChange={handleUpdate}
          onUpdateTags={handleUpdateTags}
          onTogglePin={handleTogglePin}
        />
      </main>
    </div>
  );
}

export default App;

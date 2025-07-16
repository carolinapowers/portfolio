import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Plus, X } from 'lucide-react';
import { GET_STICKY_NOTES, CREATE_STICKY_NOTE, UPDATE_STICKY_NOTE, DELETE_STICKY_NOTE } from '../../apollo/queries';
import styles from './BrainstormingSpace.module.css';

interface StickyNote {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  createdAt: string;
}

const NOTE_COLORS = ['yellow', 'pink', 'green', 'blue', 'purple', 'orange'];

export const BrainstormingSpace: React.FC = () => {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    noteId: string | null;
    offset: { x: number; y: number };
  }>({
    isDragging: false,
    noteId: null,
    offset: { x: 0, y: 0 },
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('yellow');
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, refetch } = useQuery(GET_STICKY_NOTES);
  const [createNote] = useMutation(CREATE_STICKY_NOTE);
  const [updateNote] = useMutation(UPDATE_STICKY_NOTE);
  const [deleteNote] = useMutation(DELETE_STICKY_NOTE);

  const stickyNotes: StickyNote[] = useMemo(() => data?.stickyNotes || [], [data?.stickyNotes]);

  const handleContainerClick = useCallback(async (e: React.MouseEvent) => {
    if (dragState.isDragging) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - 80; // Center the note
    const y = e.clientY - rect.top - 60;

    try {
      await createNote({
        variables: {
          text: 'New idea...',
          color: selectedColor,
          x,
          y,
        },
      });
      refetch();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  }, [createNote, selectedColor, dragState.isDragging, refetch]);

  const handleMouseDown = useCallback((e: React.MouseEvent, noteId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const note = stickyNotes.find(n => n.id === noteId);
    if (!note) return;

    setDragState({
      isDragging: true,
      noteId,
      offset: {
        x: e.clientX - rect.left - note.x,
        y: e.clientY - rect.top - note.y,
      },
    });
  }, [stickyNotes]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.noteId) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - dragState.offset.x;
    const y = e.clientY - rect.top - dragState.offset.y;

    // Update note position immediately for smooth dragging
    const note = stickyNotes.find(n => n.id === dragState.noteId);
    if (note) {
      note.x = Math.max(0, Math.min(x, rect.width - 160));
      note.y = Math.max(0, Math.min(y, rect.height - 120));
    }
  }, [dragState, stickyNotes]);

  const handleMouseUp = useCallback(async () => {
    if (!dragState.isDragging || !dragState.noteId) return;

    const note = stickyNotes.find(n => n.id === dragState.noteId);
    if (note) {
      try {
        await updateNote({
          variables: {
            id: note.id,
            text: note.text,
            x: note.x,
            y: note.y,
          },
        });
        refetch();
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }

    setDragState({
      isDragging: false,
      noteId: null,
      offset: { x: 0, y: 0 },
    });
  }, [dragState, stickyNotes, updateNote, refetch]);

  const handleTextChange = useCallback(async (noteId: string, newText: string) => {
    const note = stickyNotes.find(n => n.id === noteId);
    if (note) {
      try {
        await updateNote({
          variables: {
            id: noteId,
            text: newText,
            x: note.x,
            y: note.y,
          },
        });
        refetch();
      } catch (error) {
        console.error('Error updating note text:', error);
      }
    }
  }, [stickyNotes, updateNote, refetch]);

  const handleDelete = useCallback(async (noteId: string) => {
    try {
      await deleteNote({
        variables: { id: noteId },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }, [deleteNote, refetch]);

  const handleAddNoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowColorPicker(!showColorPicker);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  return (
    <div
      ref={containerRef}
      className={styles.brainstormContainer}
      onClick={handleContainerClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{ position: 'relative' }}>
        <button
          className={styles.addButton}
          onClick={handleAddNoteClick}
        >
          <Plus size={16} />
          Add Note
        </button>
        {showColorPicker && (
          <div className={styles.colorPicker}>
            {NOTE_COLORS.map(color => (
              <div
                key={color}
                className={`${styles.colorOption} ${styles[color]} ${selectedColor === color ? styles.selected : ''}`}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        )}
      </div>

      {stickyNotes.length === 0 && (
        <div className={styles.emptyState}>
          <p>Click anywhere to add a sticky note</p>
        </div>
      )}

      {stickyNotes.map(note => (
        <div
          key={note.id}
          className={`${styles.stickyNote} ${styles[note.color]} ${dragState.noteId === note.id ? styles.dragging : ''}`}
          style={{
            left: note.x,
            top: note.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, note.id)}
        >
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(note.id)}
          >
            <X size={12} />
          </button>
          <textarea
            value={note.text}
            onChange={(e) => handleTextChange(note.id, e.target.value)}
            className={styles.stickyNote}
            style={{
              position: 'static',
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
              padding: 0,
              cursor: dragState.isDragging ? 'grabbing' : 'text',
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      ))}
    </div>
  );
};
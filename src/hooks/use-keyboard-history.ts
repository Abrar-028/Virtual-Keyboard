import { useState, useCallback } from 'react';

export function useKeyboardHistory() {
  const [textHistory, setTextHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback((newText: string) => {
    setTextHistory(prev => [...prev.slice(0, historyIndex + 1), newText]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      return textHistory[historyIndex - 1];
    }
    return null;
  }, [historyIndex, textHistory]);

  const redo = useCallback(() => {
    if (historyIndex < textHistory.length - 1) {
      setHistoryIndex(prev => prev + 1);
      return textHistory[historyIndex + 1];
    }
    return null;
  }, [historyIndex, textHistory]);

  return {
    addToHistory,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < textHistory.length - 1
  };
}
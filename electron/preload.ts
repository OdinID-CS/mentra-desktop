import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  generateFlashcards: (notes: string) => ipcRenderer.invoke('ai:generate-flashcards', notes),
  explainAssignment: (assignment: string) => ipcRenderer.invoke('ai:explain-assignment', assignment),
});

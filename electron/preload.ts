import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getSystemInfo: () => ipcRenderer.invoke('system:get-info'),
  generateFlashcards: (notes: string) => ipcRenderer.invoke('ai:generate-flashcards', notes),
  explainAssignment: (assignment: string) => ipcRenderer.invoke('ai:explain-assignment', assignment),
  onUpdateAvailable: (callback: () => void) => ipcRenderer.on('update-available', callback),
});

import create from 'zustand';

const useContext = create((set) => ({
  svg: null,
  viewpoints: null,
  monument: null,
  messages: [],
  setSVG(svg) {
    set((state) => ({
      svg
    }));
  },
  setViewpoints(viewpoints) {
    set((state) => ({
      viewpoints
    }));
  },
  setMonument(monument) {
    set((state) => ({
      monument
    }));
  },
  logMessages(message) {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  }
}));

export default useContext;
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const context = (set) => ({
  connectedDisplays: null,
  screenConfig: null,
  setConnectedDisplays(connectedDisplays) {
    set((state) => ({
      connectedDisplays,
    }));
  },
  setScreenConfig(screenConfig){
    set((state) => ({
      screenConfig
    }))
  }
});

const useMainContext = create(subscribeWithSelector(context));

export default useMainContext;

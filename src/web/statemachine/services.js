import { interpret } from "xstate"
import appMachine from "./app-machine"
import { inspect } from '@xstate/inspect';

// if (process /* && process.env.MODE === 'development' */) {
  inspect({ url: 'https://statecharts.io/inspect', iframe: false });
  // inspect({ iframe: false, url: 'https://stately.ai/viz?inspect' });
// }

const options = {
  appService: { devTools: true }
}

export const appService = interpret(appMachine, options.appService)
  .onTransition((state, send) => {
    if (state.changed) {
      // do stuff...
    }
  })
  .start();
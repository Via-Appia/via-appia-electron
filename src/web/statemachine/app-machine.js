import { createMachine, assign } from 'xstate';
import useContext from '../hooks/useContext';
import monuments from '../data/monuments';
// import { appService } from './services';

const initialContext = {
  error: null,
  loading: true,
  view: 0,
  language: 'nl',
  slug: null
};

const appMachine = createMachine({
  id: 'appMachine',
  context: initialContext,
  initial: 'selectMonument',
  states: {
    selectMonument: {
      on: {
        SELECT: {
          target: 'startup',
          actions: assign({slug: (context, event) => event.payload.alias})
        }
      }
    },
    startup: {
      invoke: {
        id: 'initApp',
        src: (context) => initApp(context),
        onDone: {
          target: 'mapView',
          actions: [assign({ loading: false })],
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (context, event) => event }),
        },
      },
    },
    failure: {},
    mapView: {
      on: {
        NEXT: {
          target: 'details',
          actions: assign({ view: (context) => context.view + 1 }),
        },
        PREVIOUS: {
          target: 'details',
          actions: assign({ view: (context) => context.view - 1 }),
        },
        SELECTVIEW: {
          target: 'details',
          actions: assign((context, { payload }) => ({ view: payload })),
        },
        RECONSTRUCTION: {
          target: 'reconstruction',
        },
        LANGUAGE: {
          target: 'language',
        },
      },
    },
    details: {
      on: {
        CLOSE: {
          target: 'mapView',
        },
        GO: {
          target: 'playing',
          actions: wsSend
        },
        LANGUAGE: {
          target: 'language',
        },
      },
    },
    playing: {
      on: {
        END: {
          target: 'mapView',
        },
      },
    },
    language: {
      on: {
        CLOSE: {
          target: 'mapView',
        },
        SELECT: {
          target: 'mapView',
          actions: assign({ language: (context, { payload }) => payload }),
        },
      },
    },
    reconstruction: {},
  },
});

async function initApp(context) {
  const { setSVG, setViewpoints, setMonument } = useContext.getState();

  const selectedMonument = monuments.find((monument) => monument.alias === context.slug)
  const monumentJSONPath = `./json/${selectedMonument.id}.json`;
  const monumentSVJPath = `./svg/${selectedMonument.id}.svg`;

  try {
    const json = await fetch(monumentJSONPath).then((json) => json.json());
    const svg = await fetch(monumentSVJPath).then((svg) => svg.text())
    setViewpoints(json);
    setSVG(svg);
    setMonument(selectedMonument)
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

function wsSend(context, event) {
  const { logMessages } = useContext.getState();
  logMessages(event)
}

export default appMachine;

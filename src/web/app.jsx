import React, { useMemo, useRef, useState } from 'react';
import './style/main.scss';
import Helmet from './components/helmet';
import GeoChart from './components/geochart';
// import data from './data/custom.geo.json'
import data from './data/GeoChart.world.geo.json';

import Header from './components/header';
import ViewsButton from './components/views-button';
import ReconstructionButton from './components/reconstruction-button';
import ViewModal from './components/view-modal';
import TimeBar from './components/time-bar';
import LanguageModal from './components/language-modal';
import { useCallback, useEffect } from 'react/cjs/react.development';

import { useActor } from '@xstate/react';
import { appService } from './statemachine/services';

import useContext from './hooks/useContext';
import monuments from './data/monuments';

const App = () => {
  const [property, setProperty] = useState('pop_est');
  const [current, send] = useActor(appService);

  const handleMonumentSelection = useCallback((monument) => {
    send({ type: 'SELECT', payload: monument });
  }, []);

  useEffect(() => {
    const slug = window.location.href.split('#')[1];
    const monument = monuments.find((monument) => monument.alias === slug);
    monument && send({ type: 'SELECT', payload: monument });
  }, []);

  const handleLink = useCallback((input) => {
    const url = window.location.href.split('#')[0]
    window.location.href = `${url}#${input}`
    window.location.reload();
  }, [])

  const messages = useContext((state) => state.messages);

  const ref = useRef(null)
  useEffect(() => {
    const scroll = ref.current
    scroll.scrollTop = scroll.scrollHeight;
  },[messages])

  return (
    <>
      <Helmet title={'Via Appia'} />
      <div className="messages"><div className="container"><div className='scroll' {...{ref}}>
        {messages.map((message, key) => <div key={key}>
        <pre>{key} {JSON.stringify(message)}</pre>
      </div>)}
      </div>
      </div></div>
      <div className="app">
        {current.matches('selectMonument') && current.context.slug === null && (
          <div className="no-monument-selection">
            <div className="title">REVISITED: Via Appia, tablet-app</div>
            <div className="help">Maak een keuze:</div>
            <div className="comment">
              of vul de huidige url aan met: {monuments.map(({id, alias}) => <span key={id}><span className='link' onClick={() => handleLink(alias)}>{`/#${alias}`}</span>, </span>)} refresh dan de pagina (toets: F5)
            </div>
            <div className="monuments">
              {monuments.map((monument) => (
                <div key={monument.id} className="monument" style={{ '--color': monument.color }} onClick={() => handleMonumentSelection(monument)}>
                  {monument.title}
                </div>
              ))}
            </div>
          </div>
        )}
        <Header />
        <GeoChart {...{ data, property }} />
        <div className="buttons-section">
          <ViewsButton />
          <ReconstructionButton />
        </div>
        {current.matches('details') && <ViewModal />}
        {/* <TimeBar /> */}
        {current.matches('language') && <LanguageModal />}
      </div>
    </>
  );
};

export default App;

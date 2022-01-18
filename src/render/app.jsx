import React, {useMemo, useCallback, useState} from 'react';
import { useEffect } from 'react/cjs/react.development';
import AppBar from './components/app-bar';
import Socket from './hooks/websocket';

const App = () => {
  const [URL, setURL] = useState(null);
  const websocket = useMemo(() => new Socket('testing-id'), [])
  const handleSend = useCallback((message) => {
    // websocket.send(message)
    websocket.startView(5)
    // websocket.send(JSON.stringify({test: 'test'}))
  },[])

  useEffect(() => {
    const metaTag = 'data-monument';
    const monument = document.querySelector(`[${metaTag}]`)?.getAttribute(metaTag);
    setURL(monument)
  },[])

  return (
    <>
      <AppBar />
      <div className="app">
        <div className="message-box">
          <button onClick={() => handleSend({type: 'TEST', payload: "Hello World!"})}>Send message</button>
        </div>
        <div className="container">
          {URL && <iframe src={URL} scrolling="no"></iframe>}
        </div>
      </div>
    </>
  );
};

export default App;

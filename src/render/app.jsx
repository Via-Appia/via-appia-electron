import React, {useMemo, useCallback} from 'react';
import AppBar from './components/app-bar';
import Socket from './hooks/websocket';

const App = () => {
  const websocket = useMemo(() => new Socket('testing-id'), [])

  const handleSend = useCallback((message) => {
    // websocket.send(message)
    websocket.startView(5)
    // websocket.send(JSON.stringify({test: 'test'}))
  },[])

  return (
    <>
      <AppBar />
      <div className="app">
        <div className="message-box">
          <button onClick={() => handleSend({type: 'TEST', payload: "Hello World!"})}>Send message</button>
        </div>
      {/* <iframe src="http://localhost:3000/"></iframe> */}
      </div>
    </>
  );
};

export default App;

import React, {useCallback, useMemo} from 'react';
import { useEffect } from 'react/cjs/react.development';
import Socket from './hooks/websocket';

const ScreenManager = () => {
  const websocket = useMemo(() => new Socket('screenmanager'), [])
 
  const handleSend = useCallback(() => {
    websocket.send({type: "TEST"})
  }, [])

  const handleGetDisplayData = useCallback(() => {
    websocket.send({type: "GET_DISPLAY_DATA"})
    websocket.send({type: "GET_SCREEN_CONFIG"})
  }, [])

  useEffect(() => {
    websocket.onmessage = event => { 
      const {type, payload} = JSON.parse(event.data)
      switch (type) {
        case 'RESPONSE_DISPLAY_DATA':
          
          break;
        case 'RESPONSE_SCREEN_CONFIG':
          console.log('screenconfig', payload)
          break;

        default:
          break;
      }
    }

    websocket.onopen = event => {
      websocket.send({ type: 'CONNECT', payload: { id: 'screenmanager' } })
      websocket.send({type: "GET_DISPLAY_DATA"})
      websocket.send({type: "GET_SCREEN_CONFIG"})
    }
  },[websocket])

  return <div className='screenmanager'>
    <div>
      <h1>Configuration</h1>

    </div>
    <button onClick={handleSend}>Send Message</button>
    <button onClick={handleGetDisplayData}>Update DisplayData</button>
  </div>
}

export default ScreenManager
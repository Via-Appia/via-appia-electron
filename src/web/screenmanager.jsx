import React, {useCallback, useMemo, useState} from 'react';
import { useEffect } from 'react/cjs/react.development';
import Socket from './hooks/websocket';
import style from './screenmanager.module.scss'

const ScreenManager = () => { 
  const [displayData, setDisplayData] = useState(null);

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
      // console.log(event.data);
    
      switch (type) {
        case 'RESPONSE_SCREEN_CONFIG':
          console.log('screenconfig', payload)
          break;
          
          case 'RESPONSE_DISPLAY_DATA':
          setDisplayData(payload)
          console.log('displays', payload)
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
      {
        displayData && displayData.map((display, key) => 
          <div key={key} className={style['display']}>
            <div>display.id: {display.id}</div>
            <div>{JSON.stringify(display.bounds)}</div>
          </div>
        )
      }
    </div>
    <button onClick={handleSend}>Send Message</button>
    <button onClick={handleGetDisplayData}>Update DisplayData</button>
  </div>
}

export default ScreenManager
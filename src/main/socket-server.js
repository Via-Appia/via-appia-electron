import WebSocket from 'ws';
import useMainContext from './useMainContext'

function socketSetup() {
  const port = 8001
  const socketServer = new WebSocket.Server({ port })
  const clients = {}

  socketServer.on('connection', (w, req) => {



    
    
    w.on('message', (input) => {
      // console.log('connected', Object.keys(clients))
      // console.log('clients', socketServer.clients)
      // console.log('INPUT', input)
      // eerst het binnenhalen van de ID van het window, met dat id word de lijst samengesteld van clients.
      const {type, payload} = JSON.parse(input)
      let message
      let clientToSendTo
      let clientToConfirm

      const { connectedDisplays, setConnectedDisplays, screenConfig } = useMainContext.getState()

      console.log('received:', input)

      switch (type) {
        case "CONNECT":
          clients[payload.id] = w
          console.log(`${payload.id} is connected`)
          break;
        case "START":
          clientToSendTo = clients[payload.nis]
          clientToConfirm = clients[payload.id]
          // const confirm = {
          //   payload: true
          // }
          message = {
            item: payload.item
          }
          // als clientToSendTo online is dan het bericht daarnaartoe zenden
          if(clientToSendTo){

            // clientToConfirm.send(JSON.stringify(confirm))
            clientToSendTo.send(JSON.stringify(message))
          } else {
            console.error(`A message was send to ${payload.nis}, but it is offline!`)
          }

          break;
        case "SET_TIME":
          // als een touchscreen een Start opdracht heeft verzonden, dan stuurt het beteffende Window een message terug met te tijd die het duurt om van het huidige standpunt naar het nieuw standpunt te verhuizen.
          // deze tijd moet worden ingevoerd in bij de timing van de tijdbalk op het touchscreen.
          const { item, id, time } = payload
          message = {
            type,
            payload: {
              item,
              time
            }
          }
          // beetje krom.. maar dit werkt:
          const sendTo = `touch${id.slice(6)}`
          clientToSendTo = clients[sendTo]
          clientToSendTo.send(JSON.stringify(message))
          break;
        case "START-VIEW":
          // console.log('clients:', clients)
          break;
        case "TEST": 
          console.log(input)
          console.log(clients['screenmanager'])
          break;

        case "GET_DISPLAY_DATA":
          clients['screenmanager'].send(JSON.stringify({type: 'RESPONSE_DISPLAY_DATA', payload: connectedDisplays}));
          break;

        case "GET_SCREEN_CONFIG":
          console.log(screenConfig)
          clients['screenmanager'].send(JSON.stringify({type: 'RESPONSE_SCREEN_CONFIG', payload: screenConfig}))
          break;
        default:
          break;
      }

      // Zend alle messegas door naar iedere client
      // clients.forEach(client => client.send(data))

      })
    w.on('close', () => {
      console.log('Closed')      
    })
    // bij de begin van connenctie zou je iets kunnen verzenden, alleen de clients zijn wel ingeteld op alleen ontvangen van JSON
    // w.send("Dit is van de Main Process")
  })

    return {socketServer, clients}
}

export default socketSetup

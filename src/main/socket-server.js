import WebSocket from 'ws';

function socketSetup() {
  const port = 8001
  const socketServer = new WebSocket.Server({ port })
  const clients = {}

  socketServer.on('connection', (w, req) => {

    w.on('message', (input) => {
      console.log('INPUT', input)
      // eerst het binnenhalen van de ID van het window, met dat id word de lijst samengesteld van clients.
      const {type, payload} = JSON.parse(input)
      let message
      let clientToSendTo
      let clientToConfirm
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

    return socketServer
}

export default socketSetup

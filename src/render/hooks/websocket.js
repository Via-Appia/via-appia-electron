class Socket extends WebSocket {
  constructor(id) {
    const host = require('os').hostname().toLowerCase();
    const port = 8001;
    const url = `ws://${host}:${port}`;
    super(url);
    this.onopen = (event) => this.send({ type: 'CONNECT', payload: { id } });
  }

  send(obj) {
    super.send(JSON.stringify(obj));
  }

  startView(view) {
    this.send({type: 'START-VIEW', payload: view})
  }

  endView(view) {

  }


}

export default Socket;

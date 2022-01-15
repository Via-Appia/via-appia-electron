import express from 'express'

function httpServer() {

  const app = express();

  const port = 8005; // Zou een ENV variable moeten worden..
  const server = app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
  });
  app.use(express.static(`${__dirname}/web`));

  return server;
}

export default httpServer;
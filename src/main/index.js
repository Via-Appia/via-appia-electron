import { app, BrowserWindow, ipcMain } from 'electron';
// import { hostname } from 'os';
import httpServer from './http-server'
import socketServer from './socket-server'
import createWindows from './create-windows'
// import settings from './setting.json'

httpServer()
socketServer()

let win = null

// function createWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     minWidth: 400,
//     minHeight: 300,
//     backgroundColor: '#ffffff',
//     icon: `${__dirname}/assets/productbuilder-magenta.ico`,
//     show: false, // Dit zet de Browserwindow uit, gevolgd door later een event dat zodra de render ready is op true wordt gezet; Dit voorkomt het showen van een leeg window.
//     frame: false,
//     transparent: false,
//     webPreferences: {
//       nodeIntegration: true,
//       enableRemoteModule: true
//     },
//   });
//   console.log('NODE_ENV', process.env.NODE_ENV)

//   // ####  Production Mode: dan wordt de index.html van het file-system geladen in het window
//   if (process.env.NODE_ENV === 'production') {
//     win.loadURL(`file://${__dirname}/index.html`);
    
//     // ####  Development Mode: Dan moet er een Webpack devServer meedraaien, en wordt de index.html van die locatie afgehaald
//     // #### Als de Express server in deze app dezelfde port gebruikt, dan conflicteerd dat!
//   } else {
//     // const HOST = hostname().toLowerCase();
//     // const PORT = 8080;
//     // win.loadURL(`http://${HOST}:${PORT}/`);
//     win.loadURL(`file://${__dirname}/index.html`);
//     win.webContents.openDevTools();
//   }

//   win.once('ready-to-show', () => {
//     (win).show();
//   });

//   win.on('closed', () => {
//     win = null;
//   });
// }

app.on('ready', () => {
  createWindows(win, app);
  // createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindows(win, app);
    // createWindow();
  }
});

ipcMain.on('APP_TITLE_REQUEST', (event, arg) => {
  event.returnValue = {
    name: app.getName(),
    version: app.getVersion(),
  };
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

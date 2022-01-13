import { app, BrowserWindow, ipcMain, screen } from 'electron';
import fs from 'fs'
import settings from './setting.json'

async function createWindows (win, app) {
  const displays = screen.getAllDisplays()
  
  // try {
    
  // } catch (error) {
    
  // }

  // getScreenSettings(app)


  const windows = settings.windows.map((windowSetting) => {
    createWindow(windowSetting, displays)
  })
  



  

}

function createWindow (windowSetting) {
  const {id, urlSlug, hasDevtools, isVisible} = windowSetting;
  let win = null;
  let devtools = null;

  
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    backgroundColor: '#ffffff',
    icon: `${__dirname}/assets/productbuilder-magenta.ico`,
    show: false, // Dit zet de Browserwindow uit, gevolgd door later een event dat zodra de render ready is op true wordt gezet; Dit voorkomt het showen van een leeg window.
    frame: false,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });
  console.log('NODE_ENV', process.env.NODE_ENV)

  // ####  Production Mode: dan wordt de index.html van het file-system geladen in het window
  if (process.env.NODE_ENV === 'production') {
    win.loadURL(`file://${__dirname}/index.html`);
    
    // ####  Development Mode: Dan moet er een Webpack devServer meedraaien, en wordt de index.html van die locatie afgehaald
    // #### Als de Express server in deze app dezelfde port gebruikt, dan conflicteerd dat!
  } else {
    // const HOST = hostname().toLowerCase();
    // const PORT = 8080;
    // win.loadURL(`http://${HOST}:${PORT}/`);
    win.loadURL(`file://${__dirname}/index.html`);
    devtools = new BrowserWindow()
    win.webContents.setDevToolsWebContents(devtools.webContents)
    win.webContents.openDevTools({ mode: 'detach' });
  }

  win.once('ready-to-show', () => {
    (win).show();
  });

  win.on('closed', () => {
    win = null;
  });
  return win
}

async function getScreenSettings (app) {
  const path = app.getPath('userData')
  const data = fs.writeFileSync(`${path}/screensettings.json`)
  // const displaySettings = JSON.parse(data)
  // console.log(displaySettings)
}


export default createWindows;
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import fs from 'fs'
import settings from './setting.json'

import useMainContext from './useMainContext'
// import { subscribeWithSelector } from 'zustand/middleware'


async function createWindows (win, app) {
  const { connectedDisplays, setConnectedDisplays, setScreenConfig } = useMainContext.getState()
  // try {
    
  // } catch (error) {
    
  // }
  const displays = screen.getAllDisplays()
  setConnectedDisplays(displays)

  console.log(displays)
  
  // example for a subscription to the store....
  // const unsub1 = useMainContext.subscribe((store) => store.connectedDisplays, (newVal,oldVal) => {
  //   console.log('oldVal', oldVal)
  //   console.log('newVal', newVal)
  //   } 
  // )

  const screenConfig = getScreenConfig(app)
  setScreenConfig(screenConfig)
  
  const windows = Object.entries(screenConfig.windows).map(([windowId, config]) => {
    const window = createWindow(config)
    window.config = config
    return window
  }) 
  return windows


  // const windows = settings.windows.map((windowSetting) => {
  //   return createWindow(windowSetting, screenSettings)
  // })
  // return windows
  



  

}




function createWindow (config) {
  const {html, hasDevtools, screen, isVisible} = config;
  // const {windows, displaysConnected}  = screenSettings;
  let win = null;
  let devtools = null;

  if(!isVisible) return null;

  // let displaySettings = displaysConnected.find((display) => display.id === windows[id].screenID)

  // Nog wel iest doen als het display nog niet is ingesteld...

  // console.log('displaySettings', displaySettings)

  // let displayShiftX = displaySettings.bounds.x
  // let displayShiftY = displaySettings.bounds.y
  // let fullscreen = true
  
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
      enableRemoteModule: true,
    },
  });
  console.log('NODE_ENV', process.env.NODE_ENV)

  // ####  Production Mode: dan wordt de index.html van het file-system geladen in het window
  if (process.env.NODE_ENV === 'production') {
    win.loadURL(`file://${__dirname}/${html}`);
    // win.loadURL(`file://${__dirname}/${html}`);
    
    // ####  Development Mode: Dan moet er een Webpack devServer meedraaien, en wordt de index.html van die locatie afgehaald
    // #### Als de Express server in deze app dezelfde port gebruikt, dan conflicteerd dat!
  } else {
    // const HOST = hostname().toLowerCase();
    // const PORT = 8080;
    // win.loadURL(`http://${HOST}:${PORT}/`);
    win.loadURL(`file://${__dirname}/${html}`);
    // win.loadURL(`file://${__dirname}/index.html`);
    devtools = new BrowserWindow({
      x: 0,
      y: 0
    })
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

function getScreenConfig (app) {
  const path = app.getPath('userData')
  let screenConfig = null
  try {
    const dataBuffer = fs.readFileSync(`${path}/screenconfig.json`) //testen als null is
    screenConfig = JSON.parse(dataBuffer)
  } catch (error) {
    screenConfig = createsScreenConfig()
  }
  return screenConfig
}

function createsScreenConfig() {
  const path = app.getPath('userData')
  const fileName = 'screenconfig.json'
  fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(settings, null, 2))
  return settings
}


function storeConnectedScreens(app, displaySettings) {

}


export default createWindows;
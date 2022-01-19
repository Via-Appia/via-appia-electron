import React, { useState } from 'react';
import { remote, ipcRenderer, screen, Rectangle } from 'electron';
import style from './app-bar.module.scss';

import Logo from './logo.svg';
import Close from './close.svg';
import Resize from './resize.svg';
import Minimize from './minimize.svg';
import { useCallback, useEffect } from 'react/cjs/react.development';

let vis = false
const AppBar = () => {
  const { name, version } = ipcRenderer.sendSync('APP_TITLE_REQUEST');
  // const barVisibility = false
  const [visible, setVisible] = useState(false)

  const color = '#222';

  const handleMinimize = () => {
    remote.getCurrentWindow().minimize();
  };

  const handleRestorDown = () => {
    const win = remote.getCurrentWindow();
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  };

  const handleClose = () => {
    remote.app.quit();
  };

  const handleKeyPress = (event) => {
    if(event.key === 'h') {
      if(vis) {
        vis = false
        setVisible(false)
      } else {
        vis = true
        setVisible(true)
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown",  handleKeyPress)
  }, [])


  return (
    <div className={style['container']}>
      <div className={style['click']} style={{top: (visible ? "30px" : "0px") }}>
        <div className={style['text']}>Click here and press h to show/hide app-bar</div>
      </div>
      <div className={style['app-bar']} style={{top: (visible ? "0" : "-30px") }}>
        <Logo className={style['logo']} />
        <div className={style['title']}>
          {name} - {version}
        </div>
        <div className={style['controll']}>
          <div onClick={handleMinimize}>
            <Minimize className={style['minimize']} />
          </div>
          <div onClick={handleRestorDown}>
            <Resize className={style['resize']} />
          </div>
          <div onClick={handleClose}>
            <Close className={style['close']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;

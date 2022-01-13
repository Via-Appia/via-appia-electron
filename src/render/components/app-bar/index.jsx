import React from 'react';
import { remote, ipcRenderer } from 'electron';
import style from './app-bar.module.scss';

import Logo from './logo.svg';
import Close from './close.svg';
import Resize from './resize.svg';
import Minimize from './minimize.svg';


const AppBar = () => {
  const { name, version } = ipcRenderer.sendSync('APP_TITLE_REQUEST');
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

  return (
    <div className={style['app-bar']}>
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
  );
};

export default AppBar;

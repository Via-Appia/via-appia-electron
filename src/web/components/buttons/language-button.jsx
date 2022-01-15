import React, { useCallback } from 'react';
import PlayCircleSVG from '../svg-components/play-circle.svg';
import style from './buttons.module.scss';
import { useActor } from '@xstate/react';
import { appService } from '../../statemachine/services';

const LanguageButton = ({className}) => {
  const [current, send] = useActor(appService);

  const handleLanguage = useCallback(() => {
    send({type: 'LANGUAGE'})
  }, [])

  return (
    <div {...{ className }}>
      <div className={style['button']} onClick={handleLanguage}>
        <span>{current.context.language.toUpperCase()}</span>
        <PlayCircleSVG className={style['language-svg']}/>
      </div>
    </div>
  );
};

export default LanguageButton;

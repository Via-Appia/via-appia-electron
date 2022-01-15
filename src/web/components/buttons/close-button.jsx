import React, { useCallback } from 'react';
import CloseCircleSVG from '../svg-components/close-circle.svg';
import style from './buttons.module.scss';
import { useActor } from '@xstate/react';
import { appService } from '../../statemachine/services';

const CloseButton = ({ className }) => {
  const [, send] = useActor(appService);

  const handleClose = useCallback(() => {
    send({type: "CLOSE"})
  },[])

  return (
    <div {...{ className }}>
      <div className={style['button']} onClick={handleClose}>
        <span>close</span>
        <CloseCircleSVG />
      </div>
    </div>
  );
};

export default CloseButton;

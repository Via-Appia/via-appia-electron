import React, { useCallback } from 'react';
import PlayCircleSVG from './svg-components/play-circle.svg';
import { useActor } from '@xstate/react';
import { appService } from '../statemachine/services';



const ViewsButton = () => {
  const [current, send] = useActor(appService);

  const handleNext = useCallback(() => {
    send({type: 'NEXT'})
  },[])

  return (
      <div className='views-button'>
        <PlayCircleSVG className='backward'/>
        <span className='number'>{current.context.view}</span>
        <div className='forward' onClick={handleNext}>
          <PlayCircleSVG  className='forward'  />
        </div>
      </div>
  );
};

export default ViewsButton;

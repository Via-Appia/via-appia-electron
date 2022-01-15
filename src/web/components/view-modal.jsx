import React, { useMemo } from 'react';
import PlayCircleSVG from './svg-components/play-circle.svg';
import CloseButton from './buttons/close-button';
import { useActor } from '@xstate/react';
import { appService } from '../statemachine/services';
import useContext from '../hooks/useContext';
import { useCallback } from 'react/cjs/react.development';

const ViewModal = () => {
  const [current, send] = useActor(appService);
  const viewpoints = useContext((state) => state.viewpoints);

  const {title, text, gis} = useMemo(() => viewpoints[current.context.view],[current.context.view])

  const handleGo = useCallback(() => {
    send({type: "GO"})
  },[current.context.view])

  return (
    <>
      <div className="background"></div>
      <div className="view-modal">
        <div className="header">
          <CloseButton className='close-button'/>
        </div>
        <div className="title">{title}</div>
        <div className="text">
          <div className="inner">
          {text[current.context.language]}
          </div>
        </div>
        <div className="footer">
          <div className="go-button" onClick={handleGo}>
            <span>GO</span>
            <PlayCircleSVG />
          </div>
          <div className="gps-label">GPS-locatie lat {gis.decimalDegree.x} - lon {gis.decimalDegree.y}</div>
        </div>
      </div>
    </>
  );
};

export default ViewModal;

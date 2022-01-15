import React, { useCallback } from 'react';
import CloseButton from './buttons/close-button';
import { useActor } from '@xstate/react';
import { appService } from '../statemachine/services';

const LanguageModal = () => {
  const [, send] = useActor(appService);

  const handleSelect = useCallback((language) => {
    send({type: 'SELECT', payload: language})
  },[])

  const handleClose = useCallback((event) => {
    send({type: 'CLOSE'})
  }, [])

  return (
    <>
      <div className="background" onClick={handleClose}>
        <div className="language-modal" onClick={(event) => event.stopPropagation()}>
          <CloseButton className='close-button'/>
          <div className="choices">
            <div onClick={() => handleSelect('nl')}>Nederlands</div>
            <div onClick={() => handleSelect('en')}>English</div>
            <div onClick={() => handleSelect('de')}>Deutch</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageModal;

import React from 'react';

const TimeBar = () => {
  const dx = 30
  return (
    <>
      <div className='time-bar'>
        <div className="time" style={{'--dx': dx}} ></div>
      </div>
    </>
  );
};

export default TimeBar;

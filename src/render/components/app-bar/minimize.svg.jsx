import React from 'react';

const Minimize = ({ className, color }) => {
  return (
    <svg
      {...{ className }}
      x="0px"
      y="0px"
      width="46px"
      height="30px"
      viewBox="0 0 46 30"
      preserveAspectRatio="xMidYMid"
    >
      <g fill="none">
        {/* <path d="M0 0H46V30H0z" /> */}
        <path d="M17.37 15.5L29.54 15.5" />
      </g>
    </svg>
  );
};

export default Minimize;

import React from 'react';

const Close = ({ className }) => {
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
        <path d="M18.5 10.5l9 9m0-9l-9 9" />
      </g>
    </svg>
  );
};

export default Close;

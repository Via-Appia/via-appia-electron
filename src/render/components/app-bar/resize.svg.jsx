import React from 'react';

const Resize = ({ className, color }) => {
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
        <path
          d="M26.5 20.5h-8v-8h8zm0-2h2v-8h-8v2"
        />
        {/* <path d="M0 0H46V30H0z" /> */}
      </g>
    </svg>
  );
};

export default Resize;

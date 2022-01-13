import React from 'react';

const Logo = ({ className, color }) => {
  return (
    <svg
      {...{ className }}
      x="0px"
      y="0px"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid"
    >
      <path fill={color || "#e02e76"} d="M30.34 24.69A7.31 7.31 0 0123 32h-3.63v-4.57a2.75 2.75 0 010-5.49v-4.57H23a7.31 7.31 0 017.34 7.32zM13.89 24.69a5.48 5.48 0 002.74 4.75V32H2V17.37h2.56a5.5 5.5 0 009.51 0h2.56v2.56a5.5 5.5 0 00-2.74 4.76zM23.94 7.31a7.31 7.31 0 01-7.31 7.32h-4.57a2.75 2.75 0 01-5.49 0H2V0h14.63a7.31 7.31 0 017.31 7.31z" />
    </svg>
  );
};

export default Logo;

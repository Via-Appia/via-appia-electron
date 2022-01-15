import React from 'react';

const PlayCircleSVG = ({ className, color }) => {
  return (
    <svg {...{ className }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" preserveAspectRatio="xMidYMid">
      <path fill="none" d="M0 0H18V18H0z" />
      <path d="M9 1.5A7.5 7.5 0 1016.5 9 7.522 7.522 0 009 1.5zM9 15a6 6 0 116-6 6.018 6.018 0 01-6 6z" />
      <path d="M7.125 12.375L12.375 9 7.125 5.625 7.125 12.375z" />
    </svg>
  );
};

export default PlayCircleSVG;


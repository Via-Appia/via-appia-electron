import React from 'react';

const CloseCircleSVG = ({ className, color }) => {
  return (
    <svg {...{ className }} x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" preserveAspectRatio="xMidYMid">
      <path fill="none" d="M0 0H18V18H0z" />
      <path d="M10.95 6L9 7.95 7.05 6 6 7.05 7.95 9 6 10.95 7.05 12 9 10.05 10.95 12 12 10.95 10.05 9 12 7.05zM9 1.5A7.5 7.5 0 1016.5 9 7.522 7.522 0 009 1.5zM9 15a6 6 0 116-6 6.018 6.018 0 01-6 6z" />
    </svg>
  );
};

export default CloseCircleSVG;


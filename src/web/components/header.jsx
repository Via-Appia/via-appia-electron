import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import LanguageButton from './buttons/language-button';
import useContext from '../hooks/useContext';

const Header = () => {
  const monument = useContext((state) => state.monument)

  return (
    <div className="_header">
      <div className="title" style={{ '--color': monument?.color }}>{monument?.title.toUpperCase()}</div>
      <LanguageButton />
    </div>
  );
};

export default Header;

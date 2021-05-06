import React, { useState, useEffect, useCallback } from 'react';
import { AyxAppWrapper } from '@alteryx/ui';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

const Wrapper = (props) => {
  const { children } = props;

  // Since there is no hooks forceUpdate...
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    function handleStorageChange() {
      forceUpdate();
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  });

  const themeLocalObject = JSON.parse(localStorage.getItem('themeObject')) || {};
  const paletteTypeLocal = localStorage.getItem('paletteType');
 
  return (
    <RTL>
      <AyxAppWrapper theme={themeLocalObject} paletteType={paletteTypeLocal}>{children}</AyxAppWrapper>
    </RTL>
  );
}

export default Wrapper;

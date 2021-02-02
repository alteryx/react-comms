import React from 'react';

// eslint-disable-next-line prefer-arrow-callback
const Logo = React.forwardRef(function LogoSvg(props, ref) {
  const { color } = props;

  return (
    <svg viewBox="0 0 35.44 37.5" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linear-gradient" x1="-274.73" y1="405.89" x2="-274.43" y2="405.16" gradientTransform="matrix(24.08, 0, 0, -37.5, 6625.34, 15221.94)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1795ea" stopOpacity="0.24"/>
          <stop offset="1" stopColor="#0a71d0" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="linear-gradient-2" x1="-271.19" y1="405.69" x2="-271" y2="404.92" gradientTransform="matrix(18.75, 0, 0, -37.5, 5093.54, 15221.94)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1795ea"/>
          <stop offset="1" stopColor="#0a71d0"/>
        </linearGradient>
        <linearGradient id="linear-gradient-3" x1="-298.17" y1="404.95" x2="-298.17" y2="405.95" gradientTransform="translate(-7310.05 15189.52) rotate(180) scale(24.59 37.42)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0b76d4" stopOpacity="0.21"/>
          <stop offset="1" stopColor="#0c76d4" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="linear-gradient-4" x1="-210.23" y1="375.42" x2="-210.31" y2="376.42" gradientTransform="matrix(3.76, 0, 0, -9.5, 810.3, 3589.69)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a71d0" stopOpacity="0.37"/>
          <stop offset="1" stopColor="#1795ea" stopOpacity="0.37"/>
        </linearGradient>
      </defs>
      <title>corelogo</title>
      <g id="Page-1">
        <g id="Core">
          <g id="Group-9">
            <g id="Group-3">
              <path id="Oval" d="M18.75,37.5c1.93-.06,5.31-6.35,5.33-18.71S20.68,0,18.75,0a18.75,18.75,0,0,0,0,37.5Z" fillRule="evenodd" fill="url(#linear-gradient)"/>
              <g id="Oval-2" opacity="0.75">
                <path id="path-3" d="M18.75,37.5c-3.66-.06-8.41-7.6-8.31-18.61S15.65,0,18.75,0a18.75,18.75,0,0,0,0,37.5Z" fillRule="evenodd" fill="url(#linear-gradient-2)"/>
                <path id="path-3-2"  d="M18.75,37.5c-3.66-.06-8.41-7.6-8.31-18.61S15.65,0,18.75,0a18.75,18.75,0,0,0,0,37.5Z" fill="#319cff" fillRule="evenodd"/>
              </g>
              <g id="Oval-3">
                <image width="25" height="37" transform="translate(10.44 0.04)" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAlCAYAAAC3UUK1AAAACXBIWXMAAAsSAAALEgHS3X78AAAAOklEQVRIS+3NsQkAMAzEQMf77/wZIQjsJuhqgU6S2tavYIITxAniBHGCOEGcIE4QJ4gTxAniBPlncgHGlANH+ZLMZAAAAABJRU5ErkJggg=="/>
                <path id="path-5" d="M10.44,18.73C10.46,6.16,16.5.05,18.37,0,27.5,0,35,8.81,35,18.75S27.5,37.5,18.34,37.46C16,37.5,10.41,31.3,10.44,18.73Z" fillOpacity="0.8" fillRule="evenodd" fill="url(#linear-gradient-3)"/>
              </g>
            </g>
            <path id="Oval-4" d="M18.72,23.19c.56,0,1.87-1.21,1.87-4.64s-1.31-4.86-1.87-4.86-1.89.86-1.89,4.86S18.16,23.19,18.72,23.19Z" fillOpacity="0.6" fillRule="evenodd" fill="url(#linear-gradient-4)"/>
            </g>
          </g>
        </g>
      </svg>
  );
});

export default Logo;

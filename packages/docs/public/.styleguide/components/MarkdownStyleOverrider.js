import React, { useEffect } from "react";
import { useTheme } from "@alteryx/ui";

const STYLEGUIDIST_CLASSES = [
  "rsg--sectionName",
  "rsg--text",
  "rsg--heading",
  "rsg--para",
  "rsg--list",
  "rsg--pre",
  "rsg--li-",
  "rsg--code",
  "rsg--pathline",
  "rsg--th",
  "rsg--td"
];

const StyleguidistStyleOverrider = ({ children }) => {
  const {
    palette
  } = useTheme();
  const paletteType = palette.type;

  const setPre = paletteType => {
    const elements = Array.from(
      document.querySelectorAll("[class^=lang]")
    );
    const setColor = color =>
      elements.forEach(element => {
        element.style.backgroundColor = color;
      });
    const type = {
      dark: () => setColor(palette.background.paper),
      light: () => setColor(palette.grey[800])
    }[paletteType]();
  };

  const setBlockQuotes = paletteType => {
    const blockQuotes = Array.from(
      document.querySelectorAll("[class^=rsg--blockquote]")
    );
    const setColor = color =>
      blockQuotes.forEach(element => {
        element.style.backgroundColor = color;
      });
    const type = {
      dark: () => setColor(palette.background.default),
      light: () => setColor(palette.background.default)
    }[paletteType]();
  };

  const applyOverrides = (paletteType = "light") => {
    const elements = STYLEGUIDIST_CLASSES.map(sgClass =>
      Array.from(document.querySelectorAll(`[class^=${sgClass}]`))
    ).reduce((acc, next) => [...acc, ...next], []);

    elements.forEach(el => {
      el.style.color = palette.text.primary;
      setBlockQuotes(paletteType);
      
    });
    setPre(paletteType)
  };
  
  useEffect(() => {
    applyOverrides(paletteType);
  })

  return <>{children}</>;
};

export default StyleguidistStyleOverrider;

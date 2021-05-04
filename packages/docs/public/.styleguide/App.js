import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import merge from "deepmerge";
import { AyxAppWrapper } from "@alteryx/ui";
import AppRenderer from "./components/AppRenderer";

const LOCAL_STORAGE_KEYS = {
  direction: "paletteDirection",
  paletteType: "paletteType",
  productName: "productName",
  productTheme: "productTheme"
};

const PRODUCT_THEMES = {
  default: {},
  d1: {},
  dx: {},
  aep: {}
};

const simulateStorageChangeEvent = () => {
  var event = document.createEvent("Event");
  event.initEvent("storage", true, true);
  window.dispatchEvent(event);
}

const App = props => {
  // Direction
  const [direction, setDirection] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.direction) || "ltr"
  );

  useEffect(() => {
    document.body.setAttribute("dir", direction);
    localStorage.setItem("productTheme", JSON.stringify(productThemeWithDirection));
    localStorage.setItem(LOCAL_STORAGE_KEYS.direction, direction);
    simulateStorageChangeEvent();
  }, [direction]);

  // Palette Type
  const [paletteType, setPaletteType] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.paletteType) || "light"
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.paletteType, paletteType);
    simulateStorageChangeEvent();
  }, [paletteType]);

  // Product theme
  const [productName, setProductName] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.productName) || "default"
  );

  useEffect(() => {
    // Creating the Alteryx global will simulate running in Designer Desktop
    window.Alteryx = {
      AlteryxLanguageCode: productName === "d1" ? "en" : undefined
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.productTheme, JSON.stringify(productThemeWithDirection));
    localStorage.setItem(LOCAL_STORAGE_KEYS.productName, productName);
    simulateStorageChangeEvent();
  }, [productName]);

  const productThemeWithDirection = merge(PRODUCT_THEMES[productName], {
    direction
  });

  return (
    <AyxAppWrapper theme={productThemeWithDirection} paletteType={paletteType}>
      <AppRenderer
        {...props}
        productThemeName={productName}
        toggleDirection={() =>
          setDirection(direction === "rtl" ? "ltr" : "rtl")
        }
        togglePaletteType={() =>
          setPaletteType(paletteType === "dark" ? "light" : "dark")
        }
        handleProductNameChange={setProductName}
      ></AppRenderer>
    </AyxAppWrapper>
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  version: PropTypes.string,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired
};

export default App;

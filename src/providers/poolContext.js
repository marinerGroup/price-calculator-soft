import React, { useContext, useReducer } from "react";
import { data } from "../data";

const initialState = {
  package: "basic",
  actualVolume: 0,
  calculatedVolume: 0,
  circumferenceMeters: 0,
  baseMeters: 0,
  hatch: "none",
  dimmensions: {
    width: 0,
    length: 0,
    depth: 0,
  },
  addons: {
    salinator: false,
    light: false,
    heatPump: false,
    stream: false,
    asekoCl: false,
    asekoSalt: false,
    UVLamp: false,
  },
};

export const PoolContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const [state, dispatch] = useContext(Context);

  return {
    state,
    dispatch,
    ACTIONS,
  };
};

const Context = React.createContext([
  initialState,
  ({ type, payload }) => {
    // do nohting.
  },
]);

const ACTIONS = {
  UPDATE_DIMMENSIONS: "UPDATE_DIMMENSIONS",
  CALCULATE_VOLUME: "CALCULATE_VOLUME",
  CALCULATE_ACTUAL_VOLUME: "CALCULATE_ACTUAL_VOLUME",
  CALCULATE_CIRCUMFERENCE_METERS: "CALCULATE_CIRCUMFERENCE_METERS",
  UPDATE_HATCH: "UPDATE_HATCH",
  UPDATE_PACKAGE: "UPDATE_PACKAGE",
  UPDATE_ADDONS: "UPDATE_ADDONS",
  CALCULATE_TOTALS: "CALCULATE_TOTALS",
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_DIMMENSIONS":
      return { ...state, dimmensions: payload };

    case "CALCULATE_VOLUME":
      let volume = payload.width * payload.length * payload.depth;
      let calculatedVolume = Math.round(volume * 1.15);
      return { ...state, calculatedVolume: calculatedVolume };

    case "CALCULATE_ACTUAL_VOLUME":
      let volume2 = payload.width * payload.length * payload.depth;
      return { ...state, actualVolume: volume2 };

    case "CALCULATE_CIRCUMFERENCE_METERS":
      let circMeters = (payload.width + payload.length) * 2 * payload.depth;
      let base = payload.width * payload.length;

      let temp3 = { ...state, circumferenceMeters: circMeters };

      return { ...temp3, baseMeters: base };

    case "UPDATE_HATCH":
      return { ...state, hatch: payload };

    case "UPDATE_PACKAGE":
      return { ...state, package: payload };

    case "UPDATE_ADDONS":
      return { ...state, addons: payload };

    default:
      return state;
  }
};

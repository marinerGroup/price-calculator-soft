import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import { useAppContext } from "../providers/poolContext";
import { data } from "../data";
import "../App.css";

export default function Dimmension() {
  const { state, dispatch, ACTIONS } = useAppContext();
  const [error, setError] = useState(true);
  const [dimmensions, setDimmensions] = useState({
    width: 0,
    length: 0,
    depth: 0,
  });

  const validateDimms = () => {
    if (
      data.minVolume >
      dimmensions.width * dimmensions.length * dimmensions.depth
    ) {
      setError(true);
    } else setError(false);
  };

  useEffect(() => {
    dispatch({
      type: ACTIONS.UPDATE_DIMMENSIONS,
      payload: dimmensions,
    });
    dispatch({
      type: ACTIONS.CALCULATE_VOLUME,
      payload: dimmensions,
    });
    dispatch({
      type: ACTIONS.CALCULATE_ACTUAL_VOLUME,
      payload: dimmensions,
    });
    validateDimms();
  }, [dimmensions]);

  return (
    <section className="dimms">
      <small>
        Minimalny objem bezena je 15m³ <br />
        (momentalne{" "}
        <span className={error ? "bad" : "good"}>
          {dimmensions.width * dimmensions.length * dimmensions.depth}m³
        </span>
        )
      </small>
      <div>
        <TextField
          id="length"
          label="Dlzka"
          type="number"
          sx={{ maxWidth: 75 }}
          onChange={(e) => {
            setDimmensions({
              ...dimmensions,
              length: e.target.value,
            });
          }}
          value={state.dimmensions.length}
          error={error}
        />
        <TextField
          id="width"
          label="Sirka"
          type="number"
          sx={{ maxWidth: 75 }}
          onChange={(e) => {
            setDimmensions({
              ...dimmensions,
              width: e.target.value,
            });
          }}
          value={dimmensions.width}
          error={error}
        />
        <TextField
          id="depth"
          label="Hlbka"
          type="number"
          sx={{ maxWidth: 75 }}
          onChange={(e) => {
            setDimmensions({
              ...dimmensions,
              depth: e.target.value,
            });
          }}
          value={dimmensions.depth}
          error={error}
        />
      </div>
    </section>
  );
}

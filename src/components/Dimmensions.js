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
    dispatch({
      type: ACTIONS.CALCULATE_CIRCUMFERENCE_METERS, // actually returnes base circumference and walls basic meters ((width + length) * 2) * width
      payload: dimmensions,
    });
    validateDimms();
  }, [dimmensions]);

  return (
    <section className="dimms">
      <small>
        Minimálny objem bazéna je 15m³ <br />
        (moment8lne{" "}
        <span className={error ? "bad" : "good"}>
          {dimmensions.width * dimmensions.length * dimmensions.depth}m³
        </span>
        )
      </small>
      <div>
        <TextField
          id="length"
          label="Dĺžka"
          type="number"
          sx={{ maxWidth: 75 }}
          onChange={(e) => {
            setDimmensions({
              ...dimmensions,
              length: e.target.valueAsNumber,
            });
          }}
          value={state.dimmensions.length}
          error={error}
        />
        <TextField
          id="width"
          label="Šírka"
          type="number"
          sx={{ maxWidth: 75 }}
          onChange={(e) => {
            setDimmensions({
              ...dimmensions,
              width: e.target.valueAsNumber,
            });
          }}
          value={dimmensions.width}
          error={error}
        />
        <TextField
          id="depth"
          label="Hĺbka"
          type="number"
          sx={{ maxWidth: 75 }}
          onChange={(e) => {
            setDimmensions({
              ...dimmensions,
              depth: e.target.valueAsNumber,
            });
          }}
          value={dimmensions.depth}
          error={error}
        />
      </div>
    </section>
  );
}

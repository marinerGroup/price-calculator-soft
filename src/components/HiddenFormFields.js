import React, { useState, useEffect, useContext } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppContext } from "../providers/poolContext";
import "../App.css";

export default function HiddenFormFields() {
  const { state, dispatch, ACTIONS } = useAppContext();

  return (
    <>
      <input type="hidden" value={state.package} name="package" />
      <input type="hidden" value={state.actualVolume} name="actualVolume" />
      <input
        type="hidden"
        value={state.calculatedVolume}
        name="calculatedVolume"
      />
      <input type="hidden" value={state.hatch} name="hatch" />
      <input type="hidden" value={state.dimmensions.width} name="width" />
      <input type="hidden" value={state.dimmensions.length} name="length" />
      <input type="hidden" value={state.dimmensions.depth} name="depth" />

      <input type="hidden" value={state.addons.salinator} name="salinator" />
      <input type="hidden" value={state.addons.light} name="light" />
      <input type="hidden" value={state.addons.heatPump} name="heatPump" />
      <input type="hidden" value={state.addons.stream} name="stream" />
      <input type="hidden" value={state.addons.asekoCl} name="asekoCl" />
      <input type="hidden" value={state.addons.asekoSalt} name="asekoSalt" />
      <input type="hidden" value={state.addons.UVLamp} name="UVLamp" />
    </>
  );
}

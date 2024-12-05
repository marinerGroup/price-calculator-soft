import React, { useState, useEffect, useContext } from "react";
import { useAppContext } from "../../providers/poolContext";
import Typography from "@mui/material/Typography";
import format from "number-formatter";
import { data } from "../../data";
import "../../App.css";

export const TotalsReceipt = (props) => {
  const innitialState = {
    poolTotal: 0,
    poolTotalVat: 0,
    poolTotalIncludingVAT: 0,
  };
  const { state, dispatch, ACTIONS } = useAppContext();
  const [tots, setTots] = useState(innitialState);

  const calculateTotals = () => {
    let runningTotal = 0;

    console.log(props);
    for (const it in props.tots) {
      runningTotal += props.tots[it];
    }
    setTots((prevTots) => ({
      ...prevTots,
      poolTotal: runningTotal,
    }));
    setTots((prevTots) => ({
      ...prevTots,
      poolTotalVat: runningTotal * 0.2,
    }));
    setTots((prevTots) => ({
      ...prevTots,
      poolTotalIncludingVAT: runningTotal * 1.2,
    }));
  };

  // useEffect(() => {
  //   calculateTotals();
  // }, []);

  return (
    <section className="totals">
      <Typography variant="h6" component="h3">
        Cena spolu:
        <b className="good">
          <small>od </small>
          {format("### ##0,#0", props.poolTotal)}
          <small> €</small>
        </b>
      </Typography>
      <Typography variant="h6" component="h3">
        Cena s Dph:
        <b className="good">
          <small>od </small>
          {format("### ##0,#0", props.poolTotalIncludingVAT)}
          <small> €</small>
        </b>
      </Typography>
    </section>
  );
};

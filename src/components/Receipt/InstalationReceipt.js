import React, { useState, useEffect, useContext } from "react";
import { useAppContext } from "../../providers/poolContext";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import format from "number-formatter";

import { data } from "../../data";
import "../../App.css";

export default function InstalationReceipt() {
  const { state, dispatch, ACTIONS } = useAppContext();

  const printHatch = (hatchType) => {
    if (hatchType === "concrete") {
      return {
        hatchName: "betónová",
        hatchPrice: data.hatch.concrete,
      };
    }
    if (hatchType === "plastic") {
      return {
        hatchName: "plastová",
        hatchPrice: data.hatch.plastic,
      };
    } else
      return {
        hatchName: "bez šachty",
        hatchPrice: data.hatch.none,
      };
  };
  useEffect(() => {}, []);

  return (
    <>
      <section className="receiptSection">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6" component="h3">
              Stavebné práce
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <small>
              Stavebne prace zahrnaju vykop odvoz a bezpecne spracovanie odpadu,
              betonaz zakladov, steny, termoizolaciu stien, shody do bazenu a v
              pripade zvolenia aj sachtu, jej pripravu a zapojenie
            </small>
          </AccordionDetails>
        </Accordion>
        <Typography variant="subtitle2" gutterBottom>
          Výkop:
          <b>
            <small>od </small>
            {format("### ##0,#0", state.calculatedVolume * data.excavation)}
            <small> €</small>
          </b>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Odvoz:
          <b>
            <small>od </small>
            {format("### ##0,#0", state.calculatedVolume * data.extraction)}
            <small> €</small>
          </b>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Betonáž - základy
          <b>
            <small>od </small>
            {format("### ##0,#0", state.actualVolume * data.concrete.base)}
            <small> €</small>
          </b>
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          Betonáž - Steny:
          <b>
            <small>od </small>
            {format("### ##0,#0", state.actualVolume * data.concrete.walls)}
            <small> €</small>
          </b>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Šachta: {printHatch(state.hatch).hatchName}
          <b>
            <small>od </small>{" "}
            {format("### ##0,#0", printHatch(state.hatch).hatchPrice)}{" "}
            <small> €</small>
          </b>
        </Typography>
      </section>
    </>
  );
}

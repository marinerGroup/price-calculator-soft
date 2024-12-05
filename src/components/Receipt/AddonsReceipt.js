import React, { useState, useEffect, useContext } from "react";
import { useAppContext } from "../../providers/poolContext";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from "../../data";
import "../../App.css";

export default function AddonsReceipt() {
  const { state, dispatch, ACTIONS } = useAppContext();

  return (
    <section className="receiptSection">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6" component="h3">
            Prislusenstvo:
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <small>
            V prislusenstve je zahrnuta montaz, testovacie spustenie a
            predvedenie
          </small>
        </AccordionDetails>
      </Accordion>

      {state.addons.salinator && (
        <Typography variant="subtitle2" gutterBottom>
          Salinator:{" "}
          <b>
            <small>od </small>
            {data.addons.salinator.price}
            <small> €</small>
          </b>
        </Typography>
      )}
      {state.addons.light && (
        <Typography variant="subtitle2" gutterBottom>
          Svetlo 1ks:
          <b>
            <small>od </small>
            {data.addons.light.price}
            <small> €</small>
          </b>
        </Typography>
      )}
      {state.addons.heatPump && (
        <Typography variant="subtitle2" gutterBottom>
          Tepelne cerpadlo:
          <b>
            <small>od </small>
            {data.addons.heatPump.price}
            <small> €</small>
          </b>
        </Typography>
      )}
      {state.addons.stream && (
        <Typography variant="subtitle2" gutterBottom>
          Protiprud:
          <b>
            <small>od </small>
            {data.addons.stream.price}
            <small> €</small>
          </b>
        </Typography>
      )}
      {state.addons.asekoCl && (
        <Typography variant="subtitle2" gutterBottom>
          Aseko Chlor:
          <b>
            <small>od </small>
            {data.addons.asekoCl.price}
            <small> €</small>
          </b>
        </Typography>
      )}
      {state.addons.asekoSalt && (
        <Typography variant="subtitle2" gutterBottom>
          Aseko Solne:
          <b>
            <small>od </small>
            {data.addons.asekoSalt.price}
            <small> €</small>
          </b>
        </Typography>
      )}
      {state.addons.UVLamp && (
        <Typography variant="subtitle2" gutterBottom>
          UV Lampa bezchlorova dezinfekcia:{" "}
          <b>
            <small>od </small>
            {data.addons.UVLamp.price}
            <small> €</small>
          </b>
        </Typography>
      )}
    </section>
  );
}

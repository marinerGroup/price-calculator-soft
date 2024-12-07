import React, { useState, useEffect, useContext } from "react";

import { useAppContext } from "../../providers/poolContext";
import AddonsReceipt from "./AddonsReceipt";
import PackageReceipt from "./PackageReceipt";
import InstalationReceipt from "./InstalationReceipt";
import { TotalsReceipt } from "./TotalsReceipt";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";

import { data } from "../../data";
import "../../App.css";

export default function Receipt() {
  const initialCosts = {
    packageCost: 0,
    packageInstalationCost: 0,

    addonsCost: 0,
    addonsInstalationCost: 0,

    excavationCost: 0,
    extractionCost: 0,

    concreteWalls: 0,
    concreteBase: 0,

    hatchCost: 0,
  };

  const [receiptTotals, setReceiptTotals] = useState(initialCosts);
  const { state, dispatch, ACTIONS } = useAppContext();

  const calucalteAddonTotals = () => {
    const minVolume = data.minVolume;
    if (state.calculatedVolume > minVolume) {
      let runningTotal = 0;
      for (const addon in state.addons) {
        const isAddonSelected = state.addons[addon];
        if (isAddonSelected === true) {
          runningTotal += data.addons[addon].price;
        }
      }

      let addonInstalation = runningTotal * 0.15;

      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        addonsCost: runningTotal,
      }));

      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        addonsInstalationCost: addonInstalation,
      }));
    } else {
      setReceiptTotals((prevTotals) => ({
        ...initialCosts,
      }));
    }
  };

  const calculatePackageTotals = () => {
    const minVolume = data.minVolume;
    if (state.calculatedVolume > minVolume) {
      if (state.package === "basic") {
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageCost: state.calculatedVolume * data.package.basic.material,
        }));
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageInstalationCost: Math.round(
            prevTotals.packageCost * data.package.basic.services
          ),
        }));
      } else {
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageCost: state.calculatedVolume * data.package.premium.material,
        }));
        setReceiptTotals((prevTotals) => ({
          ...prevTotals,
          packageInstalationCost:
            prevTotals.packageCost * data.package.premium.services,
        }));
      }
      calculateInstalationTotals();
    } else {
      setReceiptTotals((prevTotals) => ({
        ...initialCosts,
      }));
    }
  };
  const calculateInstalationTotals = () => {
    const minVolume = data.minVolume;
    const hatchPrice =
      state.hatch === "concrete"
        ? data.hatch.concrete
        : state.hatch === "plastic"
        ? data.hatch.plastic
        : data.hatch.none;

    if (state.calculatedVolume > minVolume) {
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        excavationCost: state.calculatedVolume * data.excavation,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        extractionCost: state.calculatedVolume * data.extraction,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        concreteBase: state.actualVolume * data.concrete.base,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        concreteWalls: state.actualVolume * data.concrete.walls,
      }));
      setReceiptTotals((prevTotals) => ({
        ...prevTotals,
        hatchCost: hatchPrice,
      }));
    }
  };

  const calculateTotals = () => {
    let runningTotal = 0;
    for (const it in receiptTotals) {
      runningTotal += receiptTotals[it];
    }
    let temObj = {
      poolTotal: runningTotal,
      poolTotalVat: runningTotal * 0.2,
      poolTotalIncludingVAT: runningTotal * 1.2,
    };
    runningTotal = 0;
    return temObj;
  };

  useEffect(() => {
    calculatePackageTotals();
    calucalteAddonTotals();
    calculateInstalationTotals(); // including hatch
  }, [state]);

  return (
    <aside>
      <Card sx={{ minWidth: 350, maxWidth: 400 }}>
        <CardContent>
          <Box sx={{ maxWidth: 400 }}>
            <a href="https://www.marinergroup.sk/" alt="Mariner Group logo">
              <img src="./logo.png" width="200px" />
            </a>
            <section className="receiptSection">
              <small>
                Dĺžka: <b>{state.dimmensions.length}m</b> Šírka:{" "}
                <b>{state.dimmensions.width}m</b> Hĺbka:{" "}
                <b>{state.dimmensions.length}m</b>
              </small>
            </section>
            <PackageReceipt />
            {/* <Divider /> */}
            <InstalationReceipt />
            {/* <Divider /> */}
            <AddonsReceipt />
            <Divider />
            <TotalsReceipt
              poolTotal={calculateTotals().poolTotal || ""}
              poolTotalIncludingVAT={
                calculateTotals().poolTotalIncludingVAT || ""
              }
            />
          </Box>
        </CardContent>
      </Card>
    </aside>
  );
}

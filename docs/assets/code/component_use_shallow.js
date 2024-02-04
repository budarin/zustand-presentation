import React from "react";
import { useSomeStore } from "./store";
import { useShallow } from "zustand/react/shallow";

const selector = (state) => Object.keys(state);

function StoreInfo() {
  const entityNames = useSomeStore(useShallow(selector));
  return (
    <div>
      <div>{entityNames.join(", ")}</div>
    </div>
  );
}

export default CountersInfo;

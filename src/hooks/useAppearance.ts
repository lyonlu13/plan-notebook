import { AprcCtx } from "components/logical/StateProvider";
import { useContext, useEffect, useState } from "react";

export default function useAppearance() {
  const { geoTransition, setGeoTransition } = useContext(AprcCtx);

  return { geoTransition, setGeoTransition };
}

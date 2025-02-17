import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Planet } from "../models/types";
import { uniqBy } from "lodash-es";

interface PlanetsState {
  planets: Planet[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanetsState = {
  planets: [],
  loading: false,
  error: null,
};

const planetSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    fetchPlanetsStart(state: PlanetsState) {
      state.loading = true;
      state.error = null;
    },
    fetchPlanetsSuccess(state: PlanetsState, action: PayloadAction<Planet[]>) {
      state.planets = uniqBy([...state.planets, ...action.payload], "url");
      state.loading = false;
      state.error = null;
    },
    fetchPlanetsFailure(state: PlanetsState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlanetsStart,
  fetchPlanetsSuccess,
  fetchPlanetsFailure,
  //   sortCharacters,
} = planetSlice.actions;

export default planetSlice.reducer;

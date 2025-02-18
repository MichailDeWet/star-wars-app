import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Planet, TEntityPromise } from "../models/types";
import { uniqBy } from "lodash-es";

interface PlanetsState {
  planets: Planet[];
  loading: boolean;
  error: string[] | null;
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
    fetchPlanetsSuccess(
      state: PlanetsState,
      action: PayloadAction<TEntityPromise<Planet>>
    ) {
      const { responses, errors } = action.payload;
      state.planets = uniqBy([...state.planets, ...responses], "url");
      state.loading = false;
      state.error = errors;
    },
    fetchPlanetsFailure(state: PlanetsState, action: PayloadAction<string[]>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPlanetsStart, fetchPlanetsSuccess, fetchPlanetsFailure } =
  planetSlice.actions;

export default planetSlice.reducer;

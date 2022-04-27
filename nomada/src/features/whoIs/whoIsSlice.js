import { createSlice } from "@reduxjs/toolkit";

const whoIsSlice = createSlice({
  name: "whoIs",
  initialState: {
    actorDetails: [],
    logRequests: [],
    requesting: false,
  },
  reducers: {
    logRequest(state, action) {
      state.logRequests = [...state.logRequests, action.payload.log]
      state.actorDetails = [action.payload.details]
      state.requesting = false
    },
    startRequest(state) {
      state.requesting = true
    },
  },
});

export const { logRequest, startRequest } = whoIsSlice.actions;
export default whoIsSlice.reducer;

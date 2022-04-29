import { createSlice } from "@reduxjs/toolkit";

const whoIsSlice = createSlice({
  name: "whoIs",
  initialState: {
    actorDetails: [],
    logRequests: [],
    requesting: false,
    historySearch: []
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
    addHistoryItem(state, action) {      
      state.historySearch.push(action.payload)
      state.actorDetails = action.payload.data
    },
    deleteHistoryItem(state, action) {      
      state.historySearch = state.historySearch.filter(i => i.data.id !== action.payload)
    }
  },
});

export const { logRequest, startRequest, addHistoryItem, deleteHistoryItem } = whoIsSlice.actions;
export default whoIsSlice.reducer;

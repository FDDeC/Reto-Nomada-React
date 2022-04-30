import { createSlice } from "@reduxjs/toolkit";

const whoIsSlice = createSlice({
  name: "whoIs",
  initialState: {
    actorDetails: [],    
    historySearch: []
  },
  reducers: {
    addHistoryItem(state, action) {      
      state.historySearch.push(action.payload)
      state.actorDetails = action.payload.data
    },
    deleteHistoryItem(state, action) {      
      state.historySearch = state.historySearch.filter(i => i.data.id !== action.payload)
    },
    setActorDetails(state, action) {
      state.actorDetails = state.historySearch.find(hs=> hs.data.id === action.payload ).data
    }
  },
});

export const { addHistoryItem, deleteHistoryItem, setActorDetails } = whoIsSlice.actions;
export default whoIsSlice.reducer;

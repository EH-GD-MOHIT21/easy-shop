import { createSlice } from "@reduxjs/toolkit";
export const DukaanSlice = createSlice({
  name: "Dukaan",

  initialState: {
    Dukaan: "",
  },

  reducers: {
    handleDukaan: (state, action) => {
      state.user = action.payload;
    },
 
  },
});

export const { handleDukaan} = DukaanSlice.actions;

export const DukaanSelect = (state) => state.Dukaan.Dukaan;

export default DukaanSlice.reducer;
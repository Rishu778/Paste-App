import { createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast"

// Safe localStorage parser
function getStoredPastes() {
  try {
    const stored = localStorage.getItem("pastes");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Invalid JSON in localStorage, resetting pastes");
    localStorage.removeItem("pastes");
    return [];
  }
}

const initialState = {
  pastes: getStoredPastes(),
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); 
      toast("Paste Added Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste; // ✅ fixed (was state.pastes.index)
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;

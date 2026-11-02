import { createSlice } from "@reduxjs/toolkit";
import type IUserDetails from "../../../Interface/DataInterface/IUserDetails";

const initialValue: IUserDetails = {
  isLoggedIn: false,
};

const UserDetailsSlice = createSlice({
  name: "UserDetails",
  initialState: initialValue,
  reducers: {
    setUserDetailsData: (state, action) => {
      action.payload = JSON.parse(JSON.stringify(action.payload));
      if (!action.payload) return;
      state.userName = action.payload.name;
      state.isLoggedIn = true;
      state.userID = action.payload.id.toString();
      state.userEmail = action.payload.email;
    },
  },
});

export default UserDetailsSlice.reducer;
export const { setUserDetailsData } = UserDetailsSlice.actions;

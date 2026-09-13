import { createSlice } from "@reduxjs/toolkit";
import type IUserDetails from "../../../Interface/DataInterface/IUserDetails";

const initialValue: IUserDetails = {
  isLoggedIn: true,
};

const UserDetailsSlice = createSlice({
  name: "UserDetails",
  initialState: initialValue,
  reducers: {
    setUserDetailsData: (state, action) => {
      action.payload = JSON.parse(JSON.stringify(action.payload));
      console.log("Setting user details with payload:", action.payload);
      state.userName = action.payload.userName;
      console.log("Updated state userName to:", state.userName);
    },
  },
});

export default UserDetailsSlice.reducer;
export const { setUserDetailsData } = UserDetailsSlice.actions;

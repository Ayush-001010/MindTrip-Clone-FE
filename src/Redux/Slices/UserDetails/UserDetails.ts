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
      state.userName = action.payload.name;
      state.isLoggedIn = true;
      state.userID = action.payload.id.toString();
      console.log("Setting user details:", action.payload);
      state.userEmail = action.payload.email;
    },
  },
});

export default UserDetailsSlice.reducer;
export const { setUserDetailsData } = UserDetailsSlice.actions;

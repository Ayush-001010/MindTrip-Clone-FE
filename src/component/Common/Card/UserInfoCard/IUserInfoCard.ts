import type IUserProfileDetailsData from "../../../../Interface/DataInterface/IUserProfileDetailsData";

export default interface IUserInfoCard {
  profile: IUserProfileDetailsData | null;
  /** Omit to open automatically; pass with onClose to control the modal. */
  open: boolean;
  onClose: () => void;
}

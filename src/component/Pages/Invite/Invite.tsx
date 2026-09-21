import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import APIService from "../../../Services/APIService";
import useTripAction from "../../../CustomHooks/useTripAction";

type InviteState = "loading" | "valid" | "notFound" | "expired";

const Invite: React.FC = () => {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  const { joinTrip } = useTripAction();
  const [state, setState] = useState<InviteState>("loading");
  const [tripID, setTripID] = useState("");
  const [tripName, setTripName] = useState("");
  const [inviteUserBy, setInviteUserBy] = useState("");

  const handleJoinTrip = async () => {
    if (!tripID) {
      return;
    }

    const response = await joinTrip(tripID);

    if (response.success) {
      navigate(`/chat/${tripID}`);
    }
  };

  useEffect(() => {
    const validateInvite = async () => {
      if (!inviteId) {
        setState("notFound");
        return;
      }

      try {
        const apiServiceInstance = new APIService();
        if (!inviteId || inviteId === "invalid") {
          setState("notFound");
          return;
        }
        const response = await apiServiceInstance.postRequest<{
          tripID: string;
          tripName: string;
          inviteUserBy: string;
        }>("/trip/validateUserInvite", {
          inviteURLID: inviteId,
        });

        if (response.success && response.data) {
          setTripID(response.data.tripID);
          setTripName(response.data.tripName);
          setInviteUserBy(response.data.inviteUserBy);
          setState("valid");
          return;
        }

        if (response.error === "INVITE_EXPIRED") {
          setState("expired");
          return;
        }

        setState("notFound");
      } catch (error) {
        console.error("Error validating invite:", error);
        setState("notFound");
      }
    };

    validateInvite();
  }, [inviteId]);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7fbfa]">
        <p className="text-[#6f7f79]">Validating invitation...</p>
      </div>
    );
  }

  if (state === "notFound") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7fbfa] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-semibold text-[#2f3e46]">
            Page Not Found
          </h1>

          <p className="mt-3 text-[#6f7f79]">
            This trip invitation is invalid or unavailable.
          </p>
        </div>
      </div>
    );
  }

  if (state === "expired") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7fbfa] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-semibold text-[#2f3e46]">
            Invite Expired
          </h1>

          <p className="mt-3 text-[#6f7f79]">
            This trip invitation has expired.
          </p>

          <button
            type="button"
            onClick={() => navigate("/auth/signin")}
            className="mt-6 rounded-full bg-[#335C4D] px-6 py-2 font-medium text-white transition hover:bg-[#294C40]"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7fbfa] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-2xl font-semibold text-[#2f3e46]">
          Trip Invitation
        </h1>
        <p className="mt-4 text-[#6f7f79]">
          <span className="font-semibold text-[#2f3e46]">{inviteUserBy}</span>{" "}
          invited you to join the{" "}
          <span className="font-semibold text-[#335C4D]">{tripName}</span>.
        </p>

        {/* <div className="mt-6 rounded-2xl bg-[#f7fbfa] p-4">
          <p className="text-sm text-[#6f7f79]">Trip ID</p>

          <p className="mt-1 break-all font-semibold text-[#335c4d]">
            {tripID}
          </p>
        </div> */}

        <p className="mt-6 text-[#2f3e46]">Do you want to join this trip?</p>

        <div className="mt-5 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleJoinTrip}
            className="rounded-full bg-[#335C4D] px-6 py-2 font-medium text-white transition hover:bg-[#294C40]"
          >
            Yes
          </button>

          <button
            type="button"
            onClick={() => navigate("/auth/signin")}
            className="rounded-full border border-[#335C4D] px-6 py-2 font-medium text-[#335C4D] transition hover:bg-[#f0f7f4]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invite;

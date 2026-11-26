import React, { useState } from "react";
import type IRoomBox from "./IRoomBox";
import { useGetMemoriesWorkStationContext } from "../../MemoriesWorkStation";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { Tooltip } from "antd";

const RoomBox: React.FC<IRoomBox> = () => {
    const { rooms , setNotifyConfig , setActivtyRoom , activtyRoom , memoriesData } = useGetMemoriesWorkStationContext();
    const [addingRoom, setAddingRoom] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const { handleAddRoom } = useGetMemoriesWorkStationContext();

    const handleAddRoomClick = async () => {
        if(!memoriesData  || !memoriesData.isTripPhotoAndVideoUpload && !memoriesData.isTripAudioUpload) {
            setNotifyConfig({
                type: "error",
                message: "Please upload trip photos, videos, and audio before adding a room.",
                duration: 1000,
                open: true
            });
            return;
        }
        if(rooms.some(room => room === roomName)) {
            setNotifyConfig({
                type: "alert",
                message: "Room name already exists",
                open: true,
                pos: "top-left"
            });
            return;
        }
        console.log("Adding room:", roomName);
        handleAddRoom(roomName);
        setAddingRoom(false);
        setRoomName("");
    };

    return (
        <section className="flex flex-col items-end justify-start gap-2 pt-6">
            {rooms.map((room, index) => (
                <section
                    key={index}
                    onClick={() => setActivtyRoom(room)}
                    className={`flex cursor-pointer min-h-10 w-24 items-center justify-center rounded-l-xl rounded-r-none border border-r-0 border-zinc-700 px-3 py-3 text-center text-xs font-semibold shadow-[-4px_0_12px_rgba(0,0,0,0.15)] ${room === activtyRoom ? "bg-[#b1a7a6] text-[#f8f9fa]" : "bg-[#161a1d] text-zinc-200  hover:bg-[#1e2226]"}`} 
                >
                    {room}
                </section>
            ))}
            {addingRoom && (
                <section className="flex min-h-10 w-24 items-center justify-center rounded-l-xl rounded-r-none border border-r-0 border-zinc-700 bg-[#161a1d] px-3 py-3 text-center text-xs font-semibold text-zinc-200 shadow-[-4px_0_12px_rgba(0,0,0,0.15)]">
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="w-full bg-transparent text-xs text-zinc-200 outline-none"
                        placeholder="Room Name"
                    />
                </section>
            )}
            {!addingRoom && (
                <button onClick={() => setAddingRoom(true)} className="flex cursor-pointer hover:bg-[#1e2226] min-h-10 w-24 items-center justify-center rounded-l-xl rounded-r-none border border-r-0 border-zinc-700 bg-[#161a1d] px-3 py-3 text-center text-xs font-semibold text-[#e9ecef] shadow-[-4px_0_12px_rgba(0,0,0,0.15)]">
                    Add Room
                </button>
            )}
            {addingRoom && (
                <section className="flex gap-2 mr-1">
                    <Tooltip title="Confirm" placement="bottom">
                        <button onClick={handleAddRoomClick} className="flex cursor-pointer hover:bg-[#1e2226] min-h-10 w-10 items-center justify-center rounded-xl  border border-zinc-700 bg-[#161a1d] px-3 py-3 text-center text-xs font-semibold text-[#e9ecef] shadow-[-4px_0_12px_rgba(0,0,0,0.15)]">
                            <FaRegThumbsUp />
                        </button>
                    </Tooltip>
                    <Tooltip title="Cancel" placement="bottom">
                        <button onClick={() => setAddingRoom(false)} className="flex cursor-pointer hover:bg-[#1e2226] min-h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-[#161a1d] px-3 py-3 text-center text-xs font-semibold text-[#e9ecef] shadow-[4px_0_12px_rgba(0,0,0,0.15)]">
                            <FaRegThumbsDown />
                        </button>
                    </Tooltip>
                </section>
            )}
        </section>
    )
}

export default RoomBox;
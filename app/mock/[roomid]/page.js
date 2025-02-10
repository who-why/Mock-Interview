"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Link, Copy } from "lucide-react"; 

export default function RoomPage() {
  const params = useParams();
  const [roomId, setRoomId] = useState(null);
  const videoContainerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("Params from useParams():", params);

    if (params && params.roomid) {
      setRoomId(params.roomid);
    }
  }, [params]);

  useEffect(() => {
    if (!roomId) return;

    const initCall = async () => {
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID, 10);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

      if (!appID || !serverSecret) {
        console.error("Missing ZegoCloud credentials");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Interviewer"
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: videoContainerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
        showScreenSharingButton: true,
        showPreJoinView: true,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showLayoutButton: true,
      });
    };

    initCall();
  }, [roomId]);

  const shareRoomLink = () => {
    if (roomId) {
      const roomLink = `${window.location.origin}/mock/${roomId}`;
      navigator.clipboard.writeText(roomLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center md:flex-row bg-gray-900 text-white">
      {/* Video Call Section */}
      <div className="relative w-full md:w-3/4 h-[75vh] mt-3 flex items-center justify-center shadow-lg rounded-lg overflow-hidden">
        <div ref={videoContainerRef} className="w-full h-full" />
      </div>

      {/* Shareable Link Button */}
      <div className="absolute top-[30%] right-4">
        <button
          onClick={shareRoomLink}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <Link size={18} />
          Share Room
        </button>
        {copied && <p className="text-green-400 mt-2 text-sm">Link copied!</p>}
      </div>
    </div>
  );
}

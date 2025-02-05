"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Interview from "../../public/images/interview.jpg";

export default function MockPage() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId) {
      router.push(`/mock/${roomId}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row relative items-center justify-center  p-6">
      {/* Left Banner Section */}
      <div className="hidden md:flex mt-10 md:w-[50%] items-center justify-center">
        <Image 
          src={Interview} 
          alt="Interview Preparation" 
          className="w-full object-cover rounded-lg shadow-lg bg-transparent border-0 outline-none"
        />
      </div>

      {/* Join Room UI */}
      <div className="w-full md:w-[45%] relative flex items-center justify-center">
        <Card className="w-[70%] shadow-xl bg-transparent shoadow-0">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">
              Join Interview Room
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter a room ID to start or join an interview session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={joinRoom} className="space-y-5">
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                className="p-3 border rounded-md w-full"
              />
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white p-3 rounded-md"
              >
                Join Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

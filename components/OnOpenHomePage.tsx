"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
export default function OnOpenHomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showIntro) return null;

  return (
    <div
      className="fixed z-9999999 bg-(--main-color) inset-0"
    >
      <div className="h-screen flex-col flex justify-center items-center">

        <Avatar className="w-40 h-40 overflow-hidden">
          <AvatarImage
            src="/colorful_todo_list.avif"
            alt="todo_list_photo"
            className="animate-pulse"
          />
          <AvatarFallback>📝</AvatarFallback>
        </Avatar>
        <h1
          className="font-bold text-4xl"
        >
          You Todos Now!
        </h1>
        <h1 className="animate-bounce text-2xl mt-2">
          Adding and Controlling in Your Todos!
        </h1>
      </div>
    </div>
  );
}

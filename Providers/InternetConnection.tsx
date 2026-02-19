"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { toast } from "sonner";

const InternetConnectionServicesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const toastIdRef = useRef<string | number | undefined>(undefined);

  useEffect(() => {
    const handleOnline = () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = undefined;
      }

      toast.success("You're back online!", {
        position: "top-center",
        icon: <Wifi size={20} />,
        duration: 3000,
      });
    };

    const handleOffline = () => {
      toastIdRef.current = toast.error("You're offline", {
        description: "Please check your internet connection to continue",
        position: "top-center",
        icon: <WifiOff size={20} />,
        duration: Infinity,
      });
    };

    if (!navigator.onLine) {
      handleOffline();
    }
    // cleanup
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, []);

  return <>{children}</>;
};

export default InternetConnectionServicesProvider;

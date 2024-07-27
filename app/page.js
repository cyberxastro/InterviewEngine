// import { Button } from "@/components/ui/button";
"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/dashboard");
}, []);

  return (
    <div>
      
    </div>
  );
}

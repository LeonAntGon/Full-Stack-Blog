import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export default function TopLoadingLine() {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0);
  // ref para el ID del interval
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleStart = () => {
      // Reiniciamos la barra
      setLoadingProgress(30);

      // Iniciamos un interval que sube hasta 90 %
      intervalRef.current = window.setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 10, 90));
      }, 300);
    };

    const handleComplete = () => {
      // Limpiamos el interval si existe
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Llevamos la barra al 100 %
      setLoadingProgress(100);

      // Y luego la reseteamos a 0
      setTimeout(() => setLoadingProgress(0), 1000);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Cleanup del useEffect: quitamos listeners y limpiamos interval
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router.events]);

  return (
    <div
      className="topLoadingLine"
      style={{
        width: `${loadingProgress}%`,
        height: "3px",
        backgroundColor: "#4CAF50",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        transition: "width 0.3s ease",
      }}
    />
  );
}

import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function TopLoadingLine(){
    const router = useRouter();
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        const handleStart = () => {
            setLoadingProgress(30);
            const interval = setInterval(() => {
                setLoadingProgress(prev => Math.min(prev + 10, 90));
            }, 300);
            return () => clearInterval(interval);
        }

        const handleComplete = () => {
            setLoadingProgress(100);
            setTimeout(() => {
                setLoadingProgress(0)
            }, 1000)
        }

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    },[router.events])

    return <div className="topLoadingLine" style={{
        width: `${loadingProgress}%`,
        height: '3px',
        backgroundColor: '#4CAF50',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        transition: 'width 0.3s ease'
    }}></div>
}
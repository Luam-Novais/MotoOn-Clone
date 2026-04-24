'use client'
import { useRides } from "@/src/hooks/useRides";
export default function Page(){
      const pendingRides = useRides('pending-rides');
    return(
        <div>
            <h1>Corridas pendentes</h1>
        </div>
    )
}
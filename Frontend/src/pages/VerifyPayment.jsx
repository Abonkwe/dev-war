import { useState } from "react";

 const VerifyPayment = ()=>{
    const [isVerified, setIsVerified] = useState(true)

    return(
        <div className="verify h-screen mx-40 flex gap-10 justify-center flex-col items-center">
            <div className="spin">
                
            </div>
            {   !isVerified ?
            <>
            <img src="loader.svg" alt="" className="w-50 animate-spin" />
                <div className="text rounded-sm *:text-white p-5 bg-slate-600">
                <h2 className="font-black   text-center text-3xl">Please Wait while we verify your payment</h2>
                <p className="text-center font-bold m-3">You will be automatically redireted when payment is verifed</p>
            </div>
        </> :
            <> 
            <img src="tick.svg" alt="" className="w-50" />
            <div className="text rounded-sm *:text-white p-5 bg-[#19995C]">
                <h2 className="font-black   text-center text-3xl">Your Payment has been verified</h2>
                <p className="text-center font-bold m-3">Please wait while we redirect you...</p>
            </div>
            </>
           
 }
        </div>
    )
}


export default VerifyPayment;
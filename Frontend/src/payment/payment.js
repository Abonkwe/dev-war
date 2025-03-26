const BASE_URL = "https://sandbox.fapshi.com";

export const generate_payment_link = async ()=>{
    const API_OPTIONS = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            apikey: "FAK_TEST_6709b07d24bc8e006ae5",
            apiuser: "7f0b62e5-e464-4b98-83bc-7fc6bfa6bc5a", 
        },

        body: JSON.stringify({
            "amount": 1000,
            "email": "testemail@gmail.com",
            "message": "test message",
            "redirectUrl" : "http://127.0.0.1/payment-complete"
        })
    }

    const res = await fetch(`${BASE_URL}/initiate-pay`, API_OPTIONS);
    if (!res.ok){
        console.log(await res.json());
    }else{
        const data = await res.json();
        console.log(data)
    }
}


export const check_transaction_status = async (transId="RK0jgNm4k7")=> {
    const API_OPTIONS = {
        method: 'GET',
        header:{
            "Content-Type": "Application/json",
            apikey: "FAK_TEST_6709b07d24bc8e006ae5",
            apiuser: "7f0b62e5-e464-4b98-83bc-7fc6bfa6bc5a",
        }
    }


    const res = await fetch(`${BASE_URL}/payment-status/${transId}`, API_OPTIONS);
    if (!res.ok){
        console.log(await res.json());
    }else{
        const data = await res.json();
        console.log(data)
    }
}


// "Content-Type: application/json, apikey: FAK_TEST_6709b07d24bc8e006ae5, apiuser: 7f0b62e5-e464-4b98-83bc-7fc6bfa6bc5a" -d '{"amount": 5000,"email": "testemail@gmail.com","message": "test message"}' https://sandbox.fapshi.com/initiate-pay
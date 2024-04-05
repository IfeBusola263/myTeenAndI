import React, {useEffect, useState} from 'react';

function usePut(url, headers, data){

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(""); 
   
    useEffect(() => {

        async function fetchData(){

            try {
                const res = await fetch(url,{
                    method: "PUT",
                    mode: "cors",
                    headers: headers,
                    body: JSON.stringify(data), 
                })

                res.json()
                .then((info) => {
                    if (res.ok) {
                        setUserData(info);
                        setError("");
                    }
                    else
                        setError(info.error);  
                })
                .catch(err => setError(err.message));
                

            } catch (err){
                setError(err.message);
            }
        }

        fetchData();

    }, [userData, error]);


    return [userData, error];
}

export default usePut;
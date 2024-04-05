import React, {useEffect, useState} from 'react';

function usePost(url, headers, data){

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(""); 
   
    useEffect(() => {

        const abortCntrl = new AbortController();
        async function fetchData(){

            try {
                const res = await fetch(url,{
                    signal: abortCntrl.signal,
                    method: "POST",
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
                if (err.name !== 'AbortError')
                    setError(err.message);
            }
        }

        fetchData();

        return () => {
            console.log('firing from Post...');
             abortCntrl.abort();
        };

    }, [url]);


    return [userData, error];
}

export default usePost;
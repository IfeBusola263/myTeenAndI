import React, {useEffect, useState, createContext} from 'react';

export const tokenContext = createContext()
function useGet(url, headers){

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
   
    useEffect(() => {

        const abortCntrl = new AbortController();
        async function fetchData(){

            try {
                const res = await fetch(url,{
                    signal: abortCntrl.signal,
                    method: "GET",
                    mode: 'cors',
                    headers: headers, 
                })

                const data = await res.json();
                if (res.ok){
                    setUserData(data);
                    const sessionToken = res.headers.get('X-Token');

                    if (sessionToken){
                        setToken(sessionToken);
                    }
                    setError("");
                } else {
                    setError(data.error);  
                }

            } catch (err){
                if (err.name !== 'AbortError')
                    setError(err.message);
            }
        }

        fetchData();

        return () => {
            console.log('firing from Get...');
            abortCntrl.abort();
       };

    }, [url]);


    return [userData, error, token];
}

export default useGet;
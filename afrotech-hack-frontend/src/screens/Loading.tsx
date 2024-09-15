import { useState, useEffect } from 'react';

export default function Loading() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            window.location.href = "/results";
        }, 2000);
    }, []);


    return (
        <div>
            <h1>Getting your results...</h1>
        </div>
    )
}
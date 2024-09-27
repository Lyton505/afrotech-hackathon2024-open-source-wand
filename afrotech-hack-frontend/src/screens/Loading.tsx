import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Loading() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const username = searchParams.get('username');

        setTimeout(() => {
            setIsLoading(false);
            navigate(`/results?username=${encodeURIComponent(username || '')}`);
        }, 2000);
    }, [navigate, location]);

    return (
        <div>
            <h1>Getting your results...</h1>
        </div>
    );
}
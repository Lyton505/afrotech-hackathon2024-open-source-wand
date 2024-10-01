import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Loading() {
  const [, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/results?username=${encodeURIComponent(username || "")}`);
    }, 0);
  }, [navigate, location]);

  return (
    <div>
      <h1>Getting your results...</h1>
    </div>
  );
}

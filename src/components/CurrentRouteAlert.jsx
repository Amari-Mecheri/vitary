import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CurrentRouteAlert = () => {
  const location = useLocation();

  useEffect(() => {
    alert(`Current Route: ${location.pathname}`);
  }, [location]);

  return null; // This component doesn't need to render anything
};

export default CurrentRouteAlert;
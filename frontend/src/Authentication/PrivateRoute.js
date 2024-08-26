// // import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? children : <Navigate to="/Login" replace />;
// }

// export default PrivateRoute;

// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

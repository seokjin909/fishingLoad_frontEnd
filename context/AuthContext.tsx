// "use client";

// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }:any) {
//   const [token, setToken] = useState(null);

//   const login = (accessToken:any, refreshToken:any) => {
//     localStorage.setItem('authorization',accessToken);
//     localStorage.setItem('authorization_refresh', refreshToken);
//     setToken(accessToken);
//   };

//   const logout = () => {
//       localStorage.removeItem("authorization");
//       localStorage.removeItem("authorization_refresh");
//       setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

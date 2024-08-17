import { useEffect, useState } from "react"
import Cookies from 'js-cookie';

import { AppRoutes } from "./routes/routes"

export const App = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setAuth(token);
    }
  }, []);

  return <AppRoutes user={user} setUser={setUser} setAuth={setAuth} auth={auth}/>;
};

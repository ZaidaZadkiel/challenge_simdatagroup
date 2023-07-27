import { Button } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const Layout = ({}) => {
  const location = useLocation();
  return (
  <div>
      <Button href="/#/caso2/">Home</Button>
      <Button href="/#/caso2/view">View</Button>
      <Button href="/#/caso2/search">Search</Button>
      {JSON.stringify(location)}
      <Outlet />
  </div>
  );
}

export default Layout;
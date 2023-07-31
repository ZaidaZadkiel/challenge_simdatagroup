import { Button } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDrinks } from "./DrinksContext";

const Layout = ({}) => {
  const location = useLocation();
  const drinks = useDrinks();

  return (
  <div>
      <Button href="/#/caso2/">Home</Button>
      {/* <Button href="/#/caso2/view">View</Button> */}
      <Button href="/#/caso2/search">Search</Button>
      <br/>
      {/* {JSON.stringify(location)}<br/>
      {JSON.stringify(drinks)}<br/> */}
      <Outlet />
  </div>
  );
}


export default Layout;
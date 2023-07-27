import { useEffect, useState } from "react";
import Layout from "./Layout";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { GlassView } from "./GlassView";
import Search from "./Search";
import Main from "./Main";
import { urls } from "./Caso2";
import axios from "axios";


function Caso2({}){
  const navigate = useNavigate();
  const [getstate, setstate] = useState<any>(null);  
  const [recent, hiddensetrecent]  = useState(
    ()=>{
      let recent = localStorage.getItem('recent');
      if(recent) return JSON.parse(recent);
      return [];
    }
  )

  const setrecent=(v)=>{
    let r = recent ? {...recent} : {};
    r[v.idDrink] = v;
    console.log(r);
    localStorage.setItem('recent', JSON.stringify(r));
    return hiddensetrecent(r);
  }

  useEffect(() => {
    if(getstate != null) return;

    axios
      .get(urls.random())
      .then((res) => {
        if(res.status != 200){ throw res.data };
        console.log('res', res.data.drinks);
        setstate(res.data.drinks[0])
        setrecent(res.data.drinks[0])
        if(res.data.drinks[0].idDrink){
          console.log('nav')
          return navigate(`view/${res.data.drinks[0].idDrink}`);
        } 
      })
      .catch(
        (e)=>{
          console.error(e)
        }
      );
  }, []);

  console.log('m', {getstate});

  return (
      
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Main recent={recent} />}/>
        <Route path="search" element={<Search />}/>
        <Route path="view/:id" element={<GlassView glass={getstate && getstate.idDrink && recent[getstate.idDrink]} />}/>
      </Route>
    </Routes>
      
  )
}

export default Caso2;
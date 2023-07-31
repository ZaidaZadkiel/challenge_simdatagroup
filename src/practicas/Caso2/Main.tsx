import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDrinks } from "./DrinksContext";

const Main = ({recent})=>{
  const navigate = useNavigate()
  const [categories, setcategories] = useState();
  const [expanded,   setexpanded]   = useState();
  const api = useDrinks();

  useEffect(
    ()=>{
      api.category.list().then(setcategories)
    },[]
  )

  const expand = (cat)=>{
    api.category.search(cat).then(setexpanded)
  }

  const getDrink = (idDrink)=>{
    api.glasses.search(idDrink).then(
      ()=>navigate(`view/${idDrink}`)
    )
  }

  return (
    <div>
      Lista de categorias de bebidas<br/>
      <div>
        Categorias:<br/>
        <div style={{display:'flex', flexWrap:"wrap"}}>
          {categories && Array.isArray(categories.drinks)  
            ? categories.drinks.map(
              (c, index)=><span 
                key={index} 
                onClick={()=>expand(c.strCategory)} 
                style={{
                  backgroundColor:'#00000020',
                  padding:'4pt',
                  cursor: 'pointer',
                  margin:'2pt'}}
              >{c.strCategory}</span>
            )
            : 'no data'
          }
          {/* {JSON.stringify(expanded)}<br/>
          {JSON.stringify(categories)} */}
        </div>
        <div style={{display:'flex', flexWrap:'wrap'}}>
        {expanded && Array.isArray(expanded.drinks)
          ? expanded.drinks.map(
            (e, index)=>(
              <div 
                key={index} 
                style={{
                  margin:'2pt',
                  backgroundColor: '#00000020',
                  cursor: 'pointer'
                }}
                onClick={()=>getDrink(e.idDrink)}
              >
                {e.strDrink}<br/><img src={`${e.strDrinkThumb}/preview`}/>
              </div>)
          )
          : ''
        }
      </div>
      </div>
      <div>
        Vistos recientemente:
      {recent
        ? Object.values(recent).slice(0,6).map(
          (x, index)=><div key={index}>
            {x.idDrink}: <Link  to={`view/${x.idDrink}`}>{x && x.strDrink}</Link>
          </div>
        )
        : 'Nothing here'
      }
      </div>
    </div>
  )
}

export default Main;
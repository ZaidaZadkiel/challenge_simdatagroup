import { Link } from "react-router-dom";

const Main = ({recent})=>{
  return (
    <div>
      im a div<br/>
      {/* {JSON.stringify(recent)} */}

      <div>
        Recently viewed:
      {recent
        ? Object.values(recent).map(
          (x)=><div>
            {x.idDrink}: <Link to={`view/${x.idDrink}`}>{x && x.strDrink}</Link>
          </div>
        )
        : 'Nothing here'
      }
      </div>
    </div>
  )
}

export default Main;
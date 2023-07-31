import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDrinks } from "./DrinksContext";

const Search = ()=>{
  const api = useDrinks();
  const [names, setnames] = useState([]);

  const handleSearch=(e)=>{
    console.log(e);
  }

  const completeName = (event)=>{
    let search = event.target.value;
    if(search.length>3){
      console.log('search', search);
      api.glasses.search(search).then((res)=>{
        console.log(res)
        if(Array.isArray(res.drinks)){
          setnames(res.drinks.map(x=>x.strDrink))
        }
      })
    }
  }

  return <Grid container direction={'column'}>
    <Grid item>Search</Grid>
    <Grid item>
      Nombre: <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={names}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} onChange={completeName} label="Movie" />}
      />
    </Grid>
    <Grid item>
      Categoria: 
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </Grid>
    <Grid item>
      Nombre: <TextField name="name"/>
    </Grid>
    <Grid item>
      Nombre: <TextField name="name"/>
    </Grid>
    <Grid item>
      <Button onClick={handleSearch}>Buscar</Button>
    </Grid>
    </Grid>;
}

export default Search;
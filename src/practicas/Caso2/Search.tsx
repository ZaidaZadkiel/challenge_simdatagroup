import { Button, Grid, TextField } from "@mui/material";

const Search = ()=>{

  const handleSearch=(e)=>{
    console.log(e);
  }

  return <Grid container direction={'column'}>
    <Grid item>Search</Grid>
    <Grid item>
      Nombre: <TextField name="name"/>
    </Grid>
    <Grid item>
      <Button onClick={handleSearch}>Buscar</Button>
    </Grid>
    </Grid>;
}

export default Search;
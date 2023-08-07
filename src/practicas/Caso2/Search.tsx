import { Autocomplete, Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDrinks } from "./DrinksContext";

const Search = ()=>{

  const marks = [
    {
      value: 0,
      label: 'Sin Alcohol',
      name: 'Non_Alcoholic'
    },
    {
      value: 1,
      label: 'Alcohol opcional',
      name: ''
    },
    {
      value: 2,
      label: 'Alcoholica',
      name: 'Alcoholic'
    }
  ];

  const api = useDrinks();
  const [drinknames,       setdrinknames]       = useState([]);
  const [category,         setcategory]         = useState(['Any']);
  const [ingredients,      setingredients]      = useState([]);
  const [nameselect,       setnameselect]       = useState('');
  const [categoryselect,   setcategoryselect]   = useState('Any');
  const [ingredientselect, setingredientselect] = useState([]);
  const [alcoholic,        setalcoholic]        = useState(marks[1].label);

  const [loading, setloading] = useState(false);
  const [results, setresults] = useState([]);

  const timer = useRef(null)

  useEffect(
    ()=>{
      if(category.length == 1){
        api.category.list().then(
          (res)=>{
            console.log(res)
            setcategory(res.drinks.map((x)=>x.strCategory))
            setloading(true)
          }
        )
      }

      api.ingredients.list().then(
        (res)=>{
          console.log('ingredients', res)
          setingredients(res.drinks.map((x)=>x.strIngredient1))
          setloading(true)
        }
      )
    }, 
    []
  )

  useEffect(
    ()=>{
      if(loading == true){
        console.log('state');
        console.log({
          nameselect,
          categoryselect,
          alcoholic,
          ingredientselect});

        (async ()=>{
            let byalcohol    = null;
            let byname       = null;
            let bycategory   = null;
            let byingredient = null;

            let searchalcohol = marks.find(x=>x.label == alcoholic)?.name
            if(searchalcohol)             byalcohol    = (await api.alcoholic.filter(searchalcohol))?.drinks;
            if(nameselect.length>0)       byname       = (await api.glasses.search(nameselect))?.drinks;
            if(categoryselect!='Any')     bycategory   = (await api.category.search(categoryselect))?.drinks;
            if(ingredientselect.length>0) byingredient = (await api.ingredients.search(ingredientselect))?.drinks;

            console.log({byalcohol,
              byname,
              bycategory,
              byingredient})

            let drinksresult = {};

            if(byalcohol) byalcohol.forEach(
              (drink)=>{
                drinksresult[drink.idDrink] = {matches:[], drink: {...drink, strAlcoholic: searchalcohol} }
              } 
            ) //if (byalcohol)


            if(byingredient){
              byingredient.forEach(
                (drink) => {
                  if(!drinksresult[drink.idDrink]) drinksresult[drink.idDrink] = {matches:[], ingredient: 'yes', drink: {...drink}}
                }
              );
             
            } // byingredient


            if(bycategory) {
              bycategory.forEach(
                (drink)=>{
                  if(!drinksresult[drink.idDrink])       drinksresult[drink.idDrink] = {matches:[], drink: {...drink, strCategory: categoryselect} }
                  if( drinksresult[drink.idDrink].drink) drinksresult[drink.idDrink].drink.strCategory = categoryselect;
                }
              ) 

              //delete irrelevant categories
              let drinksresult2 = {}
              Object.values(drinksresult).forEach(
                (x)=>{
                  let iscategory   = x.drink.strCategory == categoryselect;
                  let isingredient = byingredient 
                      ? byingredient.find(ing=>x.drink.idDrink == ing.idDrink) 
                      : true;
                  console.log(iscategory, isingredient, x.drink)
                  if(iscategory && isingredient) drinksresult2[x.drink.idDrink] = x;
                }
              )
              drinksresult = drinksresult2;
            } // bycategory

            
            if(byname){
              let n = Array.from(nameselect.toLocaleLowerCase());
                    
              if(n.length==0) {
                console.error('bad algorithm, this should not happen');
                //no names to search
                byname.forEach(
                  (drink)=>(drinksresult[drink.idDrink] = {matches:[], drink: drink})); 
              
              } else {

                // match by any letter in the name
                // TODO: sort by match accuracy / order of letters
                byname.forEach(
                  (drink)=>{
                    console.log(drink.strDrink, n)
                    n.forEach(
                      (x)=>{
                        if(drink.strDrink.toLowerCase().includes(x)){
                          console.log(drink.strDrink)
                          let match = drinksresult[drink.idDrink]||{matches:[], drink: drink}
                          match.matches.push(x); // remember which letters are matched
                          drinksresult[drink.idDrink] = match;
                        }
                      }
                    )
                  }
                )
              }
            } // if(byname)
                          
            const alcoholweight    = 2;
            const nameweight       = 10;
            const categoryweight   = 40;
            const ingredientweight = 60;

            setresults(Object.values(drinksresult).sort(
              (a,b)=>(
                  ( 
                      ((b.matches.length||1)*nameweight) 
                    + (b.drink.strAlcoholic == searchalcohol  ? alcoholweight  : 0) 
                    + (b.drink.strCategory  == categoryselect ? categoryweight : 0) 
                    + (b.ingredient ? ingredientweight : 0) 
                  ) 
                - ( 
                      ((a.matches.length||1)*nameweight) 
                    + (a.drink.strAlcoholic == searchalcohol  ? alcoholweight  : 0) 
                    + (a.drink.strCategory  == categoryselect ? categoryweight : 0) 
                    + (a.ingredient ? categoryweight : 0) 
                  ) 
              )
            ));

            console.log(drinksresult)
        })()

        setloading(false);
      }
    },
    [loading]
  )

  function changed(b){
    if(b == false) return;

    //loading is reset to true, restart timer
    clearTimeout(timer.current); 

    timer.current = setTimeout(
      async ()=>{
        setloading(b)
      },
      700
    );
  }

  const handleSearch=(e)=>{
    console.log(e);
  }

  const completeName = (event)=>{
    let search = event.target.value;
    setnameselect(search.trim());
    changed(true)

    if(search.length>=3){
      console.log('name', search);

      /* we dont need to query for *every* string, so we use only the first 3 characters (also aids for not spamming cache queries) */
      api.glasses.search(search.substring(0,3)).then(
        (res)=>{
          console.log(res)
          if(Array.isArray(res.drinks)){
            setdrinknames(res.drinks.map((x)=>x.strDrink))
          }
        }
      );
    }
  }


  function categoryChange(event){
    const {options} = event.target;
    let item = options.item(options.selectedIndex);
    console.log(item);
    setcategoryselect(item.value)
    changed(true)
  }

  

  return (
  <Grid container direction={{xs:'column', sm:'row'}} gap={2}>

    <Grid item xs={1} >
      <Grid container direction={{xs:'column', sm:'column'}} gap={2}>

        <Grid item>
          Nombre de bebida: {nameselect}
          <Autocomplete fullWidth
            disablePortal
            id="combo-box-demo"
            options={drinknames}
            onChange={(e)=>setnameselect(e.target.textContent.trim()) || changed(true)}
            onKeyUp={(e)=>{if(e.key=='Enter') setnameselect(e.target.value.trim()) || changed(true) } }
            renderInput={(params) => <TextField {...params} onChange={completeName} label="Nombre de Bebida" />}
          />
        </Grid>

        <Grid item>
          Categoria:<br/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={categoryselect || category[0]}
              label="Categoria"
              native
              onChange={categoryChange}
            >
              <option value={'Any'}>Any</option>
              {category.map(
                (x)=><option  key={x} value={x}> {x} </option>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          Ingredientes: {ingredientselect}
          <IngredientSelect ingredients={ingredients} onChange={
            (ingredient)=>{
              setingredientselect(ingredient);
              changed(true)
            }
          } />
        </Grid>

        <Grid item>
          Alcohol: {marks.find((x)=>x.label == alcoholic).label}
          <FormControl fullWidth>
            <Slider
              style={{margin: '0 auto', width:'80%'}}
              track={false}
              defaultValue={1}
              getAriaValueText={()=>`xx`}
              step={1}
              max={2}
              min={0}
              valueLabelDisplay="off"
              marks
              onChange={
                (event)=>{
                  setalcoholic( marks.find((x)=>x.value == event.target.value).label );
                  changed(true);
                }
              }
            />
          </FormControl>
        </Grid>
        

        <Grid item>
          <Button onClick={handleSearch}>Buscar</Button>
        </Grid>
      </Grid>
    </Grid>

    <Grid item xs={2} width={{xs:'100%'}} flexGrow={{sm:1}}>
      <Grid item>
        {loading?'Cargando datos':''}
        <ResultList results={results}/>
      </Grid>
    </Grid>
  </Grid>
  );
}

function ResultList({results}){
  if(!Array.isArray(results)) return "No hay resultados";
  console.log(results)
//slice(0,10).
  let data = results.map(
    (r)=>{
      console.log(r)
      let arr = Array.from(r.drink.strDrink.toLowerCase());
      let res = [
        r.drink.idDrink,
        <div>{arr.map(
          (ch)=>(r.matches.includes(ch) 
            ? <b>{ch}</b> 
            : ch)
        )}</div>,
        <img style={{width:'120px', height:'120px'}} src={`${r.drink.strDrinkThumb}/preview`}/>,
        <div>{r.drink.strAlcoholic||' '}</div>,
        r.drink.strCategory || ' '

      ];
      return <div style={{display:'flex', flexDirection:'column', alignItems:"center", wordWrap: "normal", backgroundColor:'#00000020', padding:'4pt', borderRadius:'6pt'}}>{res}</div>
    }
  )

  return (
    <div>
      Pagina 1 de {Math.round(results.length/10)}
      <div style={{display: 'flex', flexWrap:'wrap', gap:'8pt'}}>
        {data}
        <br/>
        ...
        {/*JSON.stringify(results)*/}
      </div>
    </div>
  )
}

function IngredientSelect({ingredients, onChange}){
  return (
    <Autocomplete
      fullWidth
      id="country-select-demo"
      sx={{ width: 300 }}
      options={ingredients}
      autoHighlight
      onChange={(e)=>onChange(e.target.textContent)}
      onKeyUp={(e)=>{if(e.key=='Enter') onChange(e.target.value)} }
      renderOption={(props, option) => (
        <Box
          component="li" 
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }} 
          {...props}
        >
          <img
            loading="lazy"
            width="40"
            src={`https://www.thecocktaildb.com/images/ingredients/${option.toLowerCase()}-Small.png`}
            alt=""
          />
          {String(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}

export default Search;
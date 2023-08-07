
import React, { useContext } from 'react';
import axios from 'axios';

const initialValue = {
  'category':{
    list:   async ()   =>await get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'),
    search: async (str)=>await get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${str}`),
  },
  'glasses':{
    list:   async ()   =>await get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list'),
    search: async (str)=>await get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${str}`),
    lookup: async (id) =>await get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`),
  },
  'ingredients': {
    list:   async ()    =>await get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'),
    search: async (str) =>await get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${str}`),
    lookup: async (iid) =>await get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${iid}`),
  },
  'alcoholic':{
    list:   async ()   =>await get('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list'),
    filter: async (str)=>await get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${str}`),
  },
  'random': async ()   =>await get('https://www.thecocktaildb.com/api/json/v1/1/random.php'),

  /* patreon supporter */
  'randomselection': async ()=>await get('www.thecocktaildb.com/api/json/v1/1/randomselection.php',),
  'popular':         async ()=>await get('www.thecocktaildb.com/api/json/v1/1/popular.php',),
  'latest':          async ()=>await get('www.thecocktaildb.com/api/json/v1/1/latest.php'),
};

async function get(url){
  console.info('fetch', url)
  /* poor man cache through localStorage */
  let cache = localStorage.getItem(url);
  if(cache){
    console.info('cache got')
    return JSON.parse(cache);
  }
  
  /*cache not found, fetch*/
  console.info('no cache')
  let val = (await axios.get(url)).data
  localStorage.setItem(url, JSON.stringify(val));
  return val;
  // if res.status != 200 throw res.data;
  // return res;
}

const DrinksContext = React.createContext(initialValue);

const DrinksProvider = (props) => {
  return (
    <DrinksContext.Provider value={initialValue}>
      {props.children}
    </DrinksContext.Provider>
  );
}


const useDrinks = ()=>{
  return useContext(DrinksContext)
}

export { DrinksContext, DrinksProvider, useDrinks };
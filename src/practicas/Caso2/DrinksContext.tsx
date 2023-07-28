
import React, { useContext } from 'react';

export const apiUrls={
  'category':{
    list:   ()   =>'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    search: (str)=>`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${str}`
  },
  'glasses':{
    list:   ()   =>'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list',
    search: (str)=>`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${str}`
  },
  'ingredients': {
    list:   ()    =>'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    search: (iid) =>`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${iid}`
  },
  'alcoholic':{
    list:   ()   =>'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list',
    filter: (str)=>`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${str}`
  },
  'random': ()   =>'https://www.thecocktaildb.com/api/json/v1/1/random.php',

  /* patreon supporter */
  'randomselection': ()=>'www.thecocktaildb.com/api/json/v1/1/randomselection.php',
  'popular':         ()=>'www.thecocktaildb.com/api/json/v1/1/popular.php',
  'latest':          ()=>'www.thecocktaildb.com/api/json/v1/1/latest.php'
}

const initialValue = {
  test: 'yes'
};

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
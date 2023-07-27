import { useEffect, useState } from "react";
import { glass, urls } from "./Caso2"
import './caso2.css';
import { useLocation, useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import axios from "axios";

const translationList = [
  ['strInstructions',        "English"],
  ['strInstructionsES',      "Español"],
  ['strInstructionsDE',      "Deutsche"],
  ['strInstructionsFR',      "Francais"],
  ['strInstructionsIT',      "Italiano"],
  ['strInstructionsZH-HANS', "简体中文"],
  ['strInstructionsZH-HANT', "繁体中文"],
];

const ingredientList= [
  ["strIngredient1",  "strMeasure1"],
  ["strIngredient2",  "strMeasure2"],
  ["strIngredient3",  "strMeasure3"],
  ["strIngredient4",  "strMeasure4"],
  ["strIngredient5",  "strMeasure5"],
  ["strIngredient6",  "strMeasure6"],
  ["strIngredient7",  "strMeasure7"],
  ["strIngredient8",  "strMeasure8"],
  ["strIngredient9",  "strMeasure9"],
  ["strIngredient10", "strMeasure10"],
  ["strIngredient11", "strMeasure11"],
  ["strIngredient12", "strMeasure12"],
  ["strIngredient13", "strMeasure13"],
  ["strIngredient14", "strMeasure14"],
  ["strIngredient15", "strMeasure15"],
];

export const GlassView = ({glass})=>{
  const params = useParams()
  const data = (glass || {});
  const [translation, setTranslation] = useState<string>('strInstructions')
  console.log('glas', params, {glass}, data?.idDrink)

  //TODO: get fresh copy or cache from idDrink

  if(!data?.idDrink){
    return (
      <div>
        <Skeleton variant="text" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
        x
        {JSON.stringify(data)}
      </div>
    )
  }

  return(
    <div>
      {JSON.stringify(params)}
      <div>id: {data.idDrink}</div>
      <div>name: {data.strDrink} {data.strDrinkAlternate && `(${data.strDrinkAlternate})`}</div>
      <div className="tagcontainer">
        tags: {
          (data.strTags
            ? data.strTags.split(',')
            : ['untagged']
          )
          .map(
            (tag, index)=><span key={index}>[{tag}]</span>
          )
        }
      </div>
      <div>Alcoholic? {data.strAlcoholic}</div>
      <div>Glass Type: {data.strGlass}</div>
      
      <div>
        <img src={`${data.strDrinkThumb}/preview`} />
      </div>
      <div>ingredients:
        <div className="listcontainer">
          {
            ingredientList
            .filter(
              (ing) => data[ing[0]] != null
            )
            .map(
              (ing)=>(
                <div 
                  key={ing[0]}
                  className="ingredient"
                >
                  <img src={`https://www.thecocktaildb.com/images/ingredients/${data[ing[0]].toLocaleLowerCase()}-Small.png`}/>
                  <div>{data[ing[0]]} : {data[ing[1]]}</div>
                </div>
              )
            )
          }
        </div>
      </div>
      <div>Instructions:
        <div className="tagcontainer">
        translations: {
          translationList.filter(
            (arrlang)=>data[arrlang[0]]!=null
          ).map(
            (arrlang)=><span 
              key={arrlang[0]}
              onClick={()=>setTranslation(arrlang[0])}
              style={
                arrlang[0] === translation 
                  ? {backgroundColor: '#f0f01080'}
                  : {}
              }
            >{arrlang[1]}</span>
          )
        }
        </div>
        {data[translation]}
      </div>
      
  </div>
  )
}
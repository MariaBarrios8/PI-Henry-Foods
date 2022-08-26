import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, OrderRecipesByName } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";
import Paginado from "../Pagination/Paginado";
import './home.css'


export default function Home() {
  const dispatch = useDispatch();//A hook to access the redux dispatch function.
  const allRecipes = useSelector((state) => state.recipes); //map state to props
  //viene del reducer

  //paginado
  const [currentPage, setCurrentPage] = useState(1)//empiezo en la página 1
  const [recipesPerPage, setRecipesPerPage] = useState(9) //cantidad de cards por página
  const indexOfLastRecipe = currentPage * recipesPerPage // 9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  
  const [order, setOrder] = useState("")


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const lastPage = allRecipes.length / recipesPerPage 

  const nextPage = () => {
    if(currentPage < lastPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  // paginado // 


  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);


  function handleClick(e) { //reset recipes
    e.preventDefault();
    dispatch(getRecipes()); 
  }


  function handleSort (e) {
    e.preventDefault()
    dispatch(OrderRecipesByName(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value}`)
  }


  return (
    <div>
      <Link to="/recipes">Create recipe</Link>
      <h1>Henry Food Proyect</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all recipes
      </button>
      <div>
        <select className="Orden alfabetico" onChange={e => handleSort(e)}>
        <option hidden="AllTheRecipes">Alphabetical order</option>
          <option value="asc">A - Z order</option>
          <option value="des">Z - A order</option>
        </select>
        <select className="Diets">
          <option value="diet">Diets</option>
        </select>
        <select className="HealtScore">
          <option value="healt">Order by healtScore</option>
        </select>
        <Paginado 
        recipesPerPage={recipesPerPage} 
        allRecipes={allRecipes.length} //necesito un valor numerico
        paginado={paginado}
        prevPage={prevPage}
        nextPage={nextPage}
        />
        <div className="recipeCard">
          {currentRecipes?.map((el) => {
            return (
              <Fragment >
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    type={el.type}
                    healthScore={el.healthScore}
                    key={el.id}
                  />
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
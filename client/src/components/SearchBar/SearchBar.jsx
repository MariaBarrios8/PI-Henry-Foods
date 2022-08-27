import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeNames } from "../../actions";
import './searchBar.css'

/*export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipeNames(name)) 
        // === name ? getDogsName(name) : alert("Your searched dog's breed does not exist!")
        setName('')
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text"
                placeholder = "Find your doggo!"
                value={name}
                onChange={(e) => handleInputChange(e)}
                />
                <div className="searchIcon">
                <button className="button" type="submit" onClick={(e) => handleSubmit(e)}>🔍</button>
                </div>
            </div>
            <div className="dataResult"></div>
        </div>
    )
}*/



//Min 22:16 empeiza a revisar el codigo
export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange (e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit (e) {
        e.preventDefault()
        dispatch(getRecipeNames(name))
    }


    return (
        <div>
            <input 
            type='text'
            placeholder="Search a Recipe"
            onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>🔍</button>
        </div>
    )
}
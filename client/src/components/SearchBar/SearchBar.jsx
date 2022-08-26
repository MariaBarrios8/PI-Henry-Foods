import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeNames } from "../../actions";


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
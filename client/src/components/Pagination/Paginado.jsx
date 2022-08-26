import React from 'react'


export default function Paginado({recipesPerPage, allRecipes, paginado, prevPage, nextPage}) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='paginado'>
                {pageNumbers?.map(number => (
                <button className='number' key={number}
                    onClick={() => paginado(number)}>{number}
                </button>
                ))}
            </ul>
            <button className='backButton' onClick={prevPage}>Back</button>
             <button className='advanceButton' onClick={prevPage}>Next</button>
        </nav>
    )
}
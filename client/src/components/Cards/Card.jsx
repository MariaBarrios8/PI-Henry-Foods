import React from 'react'


export default function Card({name, image, type, healthScore}) {
    return (
        <div>
            <img src={image} alt='image not found' width='250px' height='250px' />
            <h3>{name}</h3>
            <h5>{type}</h5>
            <h5>HealthScore: {healthScore}</h5>
        </div>
    )
}
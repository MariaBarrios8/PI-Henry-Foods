import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {postRecipe, getDiets} from '../../actions'
import { useDispatch, useSelector } from 'react-redux'

export function validate(input) {
    const regNum = new RegExp("^[0-9]+$");
    const regName = new RegExp("^[A-Z]+$");
    let errors = {}
    if (!input.name || regName.test(input.name)) {
        errors.name = "A name is required"
    }
    if (!input.healthScore || input.healthScore > 100 || input.healthScore < 0 || !regNum.test(input.healthScore)) {
        errors.healthScore = "HealthScore needs to be between 0-100"
    }
    if (!input.summary) {
        errors.summary = "A summary is required"
    }
    if (!input.diets) {
        errors.diets = "Diet type is required"
    }
    if (!input.steps) {
        errors.steps = "Steps are required"
    }
    return errors
}


export default function CreateRecipe () {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:'',
        summary: '',
        healthScore: '',
        steps: '',
        diet: [],
        image: ''
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    function handlePost(e) {
        e.preventDefault()
        if(!input.name) return alert("A name is required")
        if(!input.healthScore) return alert("A healthScore number is required")
        if(!input.summary) return alert("A summary is required")
        if(!input.steps) return "A step is required";
        dispatch(postRecipe({
            ...input,
            steps:[{number: "", step: input.steps}]
        }))
        alert(`Recipe ${input.name} created!`);
        setInput({
            name: "",
            image: "",
            healthScore: 0,
            summary: "",
            diets: [],
            steps: "",
        })
        history.push('/home');
    }
    
    function handleDietsChange(e) {
        if (e.target.checked) {
            setInput({...input, diets: [...input.diets, e.target.value]})
        }
        if (!e.target.checked) {
            setInput({
                ...input,
                diets: input.diets.filter((diet) => diet !== e.target.value)
            })
        }
    }

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }


    return(
        <div className='containerCreate'>
            <div className='createCon'>
                <button className='buttonBackCreate' onClick={() => history.goBack()}>Back</button>
                <form>
                    <div className='titulo'>
                        <h1 className='titleCreate'>Create your recipe</h1>
                    </div>
                    <div className='inputBox'>
                        <input 
                        required='required'
                        type='text'
                        name='name'
                        value={input.name}
                        onChange={handleInputChange}
                        />
                    <label>Title</label>
                    {errors.name && <p className='error'>{errors.name}</p>}
                    </div>
                    <div className='inputBox'>
                        <input
                        required='required'
                        type='text'
                        name='image'
                        value={input.image}
                        onChange={handleInputChange} 
                        />
                    <label>Image</label>
                    </div>
                    <div className='inputBox'>
                        <input
                        required='required'
                        type='text'
                        name='healthScore'
                        value={input.healthScore}
                        onChange={handleInputChange} 
                        />
                    <label>healthScore</label>
                    {errors.healthScore && (
                        <p className='error'>{errors.healthScore}</p>
                    )}
                    </div>

                    <div className='inputsDiets'>
                        <label className='nameDiet'>Diets</label>
                        <div className='dietsInput' onChange={handleDietsChange}>
                            {diets.map((diets) => (
                                <div className='dietsCheck' key={diets.name}>
                                    <label>
                                        <input
                                        className='dietas1'
                                        type='checkbox'
                                        name='diets'
                                        value={diets.name} 
                                        />
                                        <span name={diets.name}>{diets.name}</span>
                                    </label>
                                    {errors.diets && <p className='error'>{errors.diets}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='inputBox'>
                        <input
                        required='required'
                        type='text'
                        name='summary'
                        value={input.summary}
                        onChange={handleInputChange}  
                        />
                        <label>Steps</label>
                        {errors.steps && <p className='error'>{errors.steps}</p>}
                    </div>
                    <div>
                        {errors.hasOwnProperty('name') ||
                        errors.hasOwnProperty('healthScore') ||
                        errors.hasOwnProperty('diets') ||
                        errors.hasOwnProperty('summary') ||
                        errors.hasOwnProperty('steps') ? (
                            <button disabled='true' className='buttonCreate' onClick={handlePost}>
                                Create Recipe 
                            </button>
                        ) : (
                            <button className='buttonCreate' onClick={handlePost}>Create Recipe</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )


   {/* return(
        <div>
            <Link to='home' >
                <button>Back to home</button>
            </Link>
            <h1>Create you Recipe</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input 
                    type='text' 
                    value={input.name}
                    name='name'
                    />
                </div>
                <div>
                    <label>Summary:</label>
                    <input 
                    type='text'
                    value={input.summary}
                    name='summary'
                    />
                </div>
                <div>
                    <label>HealthScore</label>
                    <input
                    type='number'
                    min='1'
                    max='100'
                    value={input.healthScore}
                    name='healthScore' 
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                    type='text'
                    value={input.image}
                    name='image'
                    />
                </div>
                <div>
                    <label>Diets:</label>
                    <input 
                    type='checkbox'
                    value={input.summary}
                    name='summary'
                    />
                </div>
            </form>
        </div>
   )*/}
}

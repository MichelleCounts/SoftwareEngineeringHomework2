import React, {useState, useEffect}  from 'react'
import APIService from './APIService'

function Form(props) {
	const [name, setName] = useState('')
	const [points, setPoints] = useState('')
	const [id, setID] = useState('')

	useEffect(() => {
		setName(props.entry.name)
		setPoints(props.entry.points)
		setID(props.entry.id)
	},[props.entry])

	const updateEntry = () => {
		APIService.updateEntry(id, {name, points})
		.then(resp => console.log(resp))
		.then(window.location.reload(false))
		.catch(error => console.log(error))
	}

	const insertEntry = () => {
		APIService.insertEntry({id, name, points})
		.then(resp => console.log(resp))
		.then(window.location.reload(false))
		.catch(error => console.log(error))
	}

	const reset = () => {

		window.location.reload(false)
	}

	return (
		<div>
			{props.entry ? (

					<div className ="mb-3">

						<div>
						{
							props.entry.id === 0 ? <div><label htmlfor="ID" className="form-label">ID</label>
						<input 
							type="text" 
							className="form-control" 
							placeholder="Please enter the ID" 
							value = {id} 
							onChange = {(e) => setID(e.target.value)}/></div> : <div></div>
						}
						</div>
						

						<label htmlfor="name" className="form-label">Name</label>
						<input 
							type="text" 
							className="form-control" 
							placeholder="Please enter the Name" 
							value = {name} 
							onChange = {(e) => setName(e.target.value)}/>

						<label htmlfor="pts" className="form-label">Points</label>
						<input 
							type="text" 
							className="form-control" 
							placeholder="Please enter their points" 
							value = {points}
							onChange = {(e) => setPoints(e.target.value)}/>
						
						{
							props.entry.id === 0 ? <button className="btn btn-success mt-3" onClick={insertEntry}>Insert</button> : <button className="btn btn-success mt-3" onClick={updateEntry}>Update</button>
						}

						
						<button className="btn btn-danger mt-3" onClick={reset}>Cancel</button>
					</div>

				):null}
		</div>
	)
}

export default Form
import React, {useState, useEffect} from 'react'
import APIService from '../components/APIService'

function EntryList(props) {
    const [data, setData] = useState([{}])

    const editEntry = (entry) => {
      props.editEntry(entry)
    }

    const deleteEntry = (entry) => {
      APIService.deleteEntry(entry.id)
      .then(resp => console.log(resp))
      .then(window.location.reload(false))
      .catch(error => console.log(error))
    }

    useEffect(() => {
      fetch('http://127.0.0.1:5000/get', {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setData(resp))
      .catch(error => console.log(error))
    }, [])

    return (
        <div>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Points</td>
              </tr>
            {props.entries && data.map(entry => {
              return (
                <tr key = {entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.name}</td>
                  <td>{entry.points} pts</td>
                  <td><button className = "btn btn-primary" onClick = {() => editEntry(entry)}>Update</button></td>
                  <td><button className = "btn btn-danger" onClick = {() => deleteEntry(entry)}>Delete</button></td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      )
}

export default EntryList
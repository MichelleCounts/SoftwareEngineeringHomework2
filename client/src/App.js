import React, {useState, useEffect} from 'react'
import EntryList from './components/EntryList'
import Form from './components/Form'

function App() {
    const [data, setData] = useState([{}])
    const [editedEntry, setEditedEntry] = useState(null)
    const [entries, setEntries] = useState(null)


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

    const editEntry = (entry) => {
      setEditedEntry(entry)
    }

    

    const openForm = () => {
      setEditedEntry({id:0,name:'',points:0})
    }

    const updatedData = (entry) => {
      const newEntry = entries.map(myEntry => {
        if(myEntry.id === entry.id) {
          return entry
        } else {
          return myEntry
        }
      })
      setEntries(newEntry)
    }

    return (
        
        <div className="App">
          <div className = "row">
            <div className = "col">
              <h1>Students information and Data</h1>
            </div>
          </div>
          <div className = "row">
            <div className = "col">
              <button className = "btn btn-primary" onClick = {openForm}>Add</button>
            </div>
          </div>
          <div className = "row">
            <div className = "col">
              {editedEntry ? <Form entry = {editedEntry} updatedData = {updatedData}/> :null}
              <EntryList entries = {data} editEntry = {editEntry}/>
            </div>
          </div>          
        </div>
      )
}

export default App


export default class APIService {
	static updateEntry(id, body){
		return fetch(`http://127.0.0.1:5000/update/${id}`, {
        'method':'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      })
		.then(resp => resp.json())
	}

	static insertEntry(body){
		return fetch(`http://127.0.0.1:5000/create`, {
        'method':'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      })
		.then(resp => resp.json())
	}

	static deleteEntry(id){
		return fetch(`http://127.0.0.1:5000/delete/${id}`, {
        'method':'DELETE',
        headers: {
          'Content-Type':'application/json'
        }
      })
		.then(resp => resp.json())
	}
}
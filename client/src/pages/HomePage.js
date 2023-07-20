import React,{useState,useEffect,useContext,memo} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  const [notes,setNotes] = useState([])
  const {authTokens} = useContext(AuthContext)

  useEffect(()=>{
    if(authTokens?.access){
      let getNote = async()=>{
        let response = await fetch('http://localhost:8000/api/notes/',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${authTokens?.access}`
          }
        })
        if(response.status === 200 || response.status === 201){
          let data = await response.json()
          setNotes(data)
        }else{
          console.log(`Error: ${authTokens.access}`)
        }
      }
      getNote()
    }
  },[authTokens.access])




  return (
    <div>
      <p>hello Home page </p>
      <ul>
        {notes.map((note,i)=>(
          <li key={i}>{note.body}</li>
        ))}
      </ul>
    </div>
  )
}

export default memo(HomePage)

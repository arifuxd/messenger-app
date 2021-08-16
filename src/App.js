import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './Message';
import {db} from './firebase'
import firebase from 'firebase/app'
function App() {
  const [text, setText] = useState('')
  const [messages, setMessegas] = useState([])
  const [username, setUsername] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('messages').add({
      message : text,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setText('')
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(()=>{
    db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>{
      setMessegas(snapshot.docs.map(doc => ({id : doc.id, data : doc.data()})))
    })
  }, [])


  useEffect(()=>{
    setUsername(prompt('Whats Your Name'))
  }, [])


  console.log(messages)
  return (
    <div className="App">
     <h1>Messenger App</h1>
     <h2>Welcome {username}</h2>
    

    {messages.map(({id, data}) => (
      <Message key={id} username={username} message={data}/>
    ))}
         <div ref={messagesEndRef} />

  <form>
      <FormControl>
        <InputLabel>Enter a message</InputLabel>
      <Input value={text} onChange={(e)=> setText(e.target.value)} type="text" />
      </FormControl>
      <Button disabled={!text} onClick={sendMessage} color="secondary" variant="contained" type="submit">Send Message</Button>

    </form>

    
    </div>
  );
}

export default App;

import { Button, FormControl, Input, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
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

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
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

  <form className="app-form">
      <FormControl className="form-control">
      <Input className="form-input" placeholder="Enter a message...." value={text} onChange={(e)=> setText(e.target.value)} type="text" />
      <Button

      disabled={!text} 
      onClick={sendMessage} 
      type="submit"
        variant="contained"
        color="primary"
        className={`${classes.button} icon-button`}
        endIcon={<SendIcon/>}
      >
        Send
      </Button>
      </FormControl>
     

    </form>

    
    </div>
  );
}

export default App;

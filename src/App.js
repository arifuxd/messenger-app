import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Message from './Message';

function App() {
  const [text, setText] = useState('')
  const [messages, setMessegas] = useState([
    {username : 'Ariful Islam', text : 'Hello Brother'},
    {username : 'Akash Islam', text : 'Are You okay?'}
  ])
  const [username, setUsername] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()
    setMessegas([...messages, {username,text}])
    setText('')
  }

  useEffect(()=>{
    setUsername(prompt('Whats Your Name'))
  }, [])


  console.log(messages)
  return (
    <div className="App">
     <h1>Messenger App</h1>
     <h2>Welcome {username}</h2>
    <form >
      <FormControl>
        <InputLabel>Enter a message</InputLabel>
      <Input value={text} onChange={(e)=> setText(e.target.value)} type="text" />
      </FormControl>
      <Button disabled={!text} onClick={sendMessage} color="secondary" variant="contained" type="submit">Send Message</Button>

    </form>

    {messages.map(message => (
      <Message username={username} message={message}/>
    ))}

    </div>
  );
}

export default App;

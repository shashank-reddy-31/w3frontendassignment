import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';  
import MessageDisplay from './MessageDisplay';  
import TypingIndicator from './TypingIndicator';  

const socket = io('http://localhost:5000');  

const ChatRoom = ({ room }) => {  
 const [messages, setMessages] = useState([]);  
 const [input, setInput] = useState('');  
 const [username, setUsername] = useState('');  
 const [typingUser, setTypingUser] = useState('');  
 const [isUserJoined, setIsUserJoined] = useState(false);  

 const joinChat = () => {  
 if (username) {  
 socket.emit('joinRoom', room);  
 setIsUserJoined(true);  
 } else {  
 alert("Please enter a username!");  
 }  
 };  

 useEffect (() => {  
 socket.on('chatMessage', (msg) => {  
 setMessages(prevMessages => [...prevMessages, msg]);  
 });  

 socket.on('typing', (user) => {  
 setTypingUser(`${user} is typing...`);  
 setTimeout(() => {  
 setTypingUser('');  
 },2000);  
 });  

 return () => {  
 socket.off();  
 };  
 }, []);  

 const sendMessage = () => {  
 if (input.trim()) {  
 const msg = { username, room, message: input.trim() };  
 socket.emit('chatMessage', msg);  
 setInput('');  
 }  
 };  

 const handleTyping = () => {  
 socket.emit('typing', username);  
 };  

 return (  
 <div style={{ padding: '20px' }}>  
 {!isUserJoined ? (  
 <div>  
 <input type="text"  
 placeholder="Enter your username"  
 value={username}  
 onChange={(e) => setUsername(e.target.value)}  
 />  
 <button onClick={joinChat}>Join Chat</button>  
 </div>  
 ) : (  
 <>  
 <div className="messages" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>  
 {messages.map((msg, index) => (  
 <MessageDisplay key={index} username={msg.username} message={msg.message} />  
 ))}  
 <TypingIndicator typingUser={typingUser} />  
 </div>  

 <input type="text"  
 value={input}  
 onChange={(e) => setInput(e.target.value)}  
 onKeyPress={handleTyping}  
 placeholder="Type a message"  
 />  
 <button onClick={sendMessage}>Send</button>  
 </>  
 )}  
 </div>  
 );  
};  

export default ChatRoom;
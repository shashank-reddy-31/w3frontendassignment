
const MessageDisplay = ({ username, message }) => {  
    return (  
    <div style={{ padding: '5px' }}>  
    <strong>{username}</strong>: <span>{message}</span>  
    </div>  
    );  
   };  
   
   export default MessageDisplay;
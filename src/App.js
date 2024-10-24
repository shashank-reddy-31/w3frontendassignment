import ChatRoom from './components/ChatRoom'

function App() {
 return (
 <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
 <h1>Chat Application</h1>
 <ChatRoom room="General" />
 </div>
 );
}

export default App;

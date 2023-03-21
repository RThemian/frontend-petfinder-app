import React from 'react';
import Main from './components/Main';
import { auth } from './firebase.js';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // think of this as an event listener
    auth.onAuthStateChanged(user => setUser(user));
    // the "event" is when a user logs in or logs out with Google firebase
  }, []);

  return (
    <div className="App">
      <Main user={user} />
    </div>
  );
}

export default App;

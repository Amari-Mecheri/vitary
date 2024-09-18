// src/App.js
import './App.css';
import * as Database from './Database';
import Login from './Login';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const db =  Database.get();


  if (!db) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Login db={db} />
    </div>
  );
}

export default App;


// import React from 'react';
// import './App.css';

// import UserList from './user-list/user-list';
// import UserInsert from './user-insert/user-insert';

// const App = () => {
//     return (
//         <div>
//             <h1>RxDB Example - React</h1>
//             <UserList/>
//             <UserInsert/>
//         </div>
//     );
// };

// export default App;

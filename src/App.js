import { Routes, Route } from 'react-router-dom'
import Users from './Users'
import UserDetail from './UserDetail'

export function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/user/:id'  element={<UserDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
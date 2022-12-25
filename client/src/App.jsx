import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' index element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' index element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Route */}
        <Route path='/chat' element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;

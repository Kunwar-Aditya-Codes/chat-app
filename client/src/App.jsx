import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import RequireAuth from './components/RequireAuth';
import PersistChat from './components/PersistChat';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' index element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PersistChat />}>
          <Route element={<RequireAuth />}>
            <Route path='/chat' element={<Chat />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

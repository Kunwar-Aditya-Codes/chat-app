import { Routes, Route } from 'react-router-dom';
import AuthRequire from './components/AuthRequire';
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path='/' element={<Welcome />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route element={<AuthRequire />}>
          <Route path='chat' element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

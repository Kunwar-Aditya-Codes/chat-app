import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path='/' element={<Welcome />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path='/' element={<Welcome />} />
      </Route>
    </Routes>
  );
}

export default App;

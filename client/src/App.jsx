import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

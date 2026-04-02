import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyGarden from './pages/MyGarden';
import PlantDetail from './pages/PlantDetail';
import Encyclopedia from './pages/Encyclopedia';
import ArticleDetail from './pages/ArticleDetail';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-garden" element={<MyGarden />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center flex-wrap gap-4">
        <Link to="/dashboard" className="text-2xl font-bold text-green-700">
          🌱 Gardex Lite
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/dashboard" className="text-gray-700 hover:text-green-600">Главная</Link>
          <Link to="/my-garden" className="text-gray-700 hover:text-green-600">Мой сад</Link>
          <Link to="/encyclopedia" className="text-gray-700 hover:text-green-600">Энциклопедия</Link>
          <Link to="/calendar" className="text-gray-700 hover:text-green-600">Календарь</Link>
          <Link to="/profile" className="text-gray-700 hover:text-green-600">Профиль</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
}
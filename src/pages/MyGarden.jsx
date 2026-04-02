import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function MyGarden() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/login');
      else setUser(user);
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    if (user) fetchPlants();
  }, [user]);

  const fetchPlants = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('plant')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error) setPlants(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить растение? Все данные об уходе будут потеряны.')) {
      const { error } = await supabase.from('plant').delete().eq('id', id);
      if (error) alert('Ошибка удаления');
      else fetchPlants();
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Мой сад</h2>
          <Link
            to="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition"
          >
            + Добавить растение
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">Загрузка...</div>
        ) : plants.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg">У вас пока нет растений. Добавьте первое!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <div key={plant.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-800">{plant.name}</h3>
                {plant.variety && <p className="text-gray-600 text-sm">Сорт: {plant.variety}</p>}
                {plant.planting_date && <p className="text-gray-600 text-sm">📅 Посажено: {plant.planting_date}</p>}
                {plant.notes && <p className="text-gray-500 italic text-sm mt-2">📝 {plant.notes.substring(0, 60)}</p>}
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/plant/${plant.id}`} className="text-green-600 hover:text-green-800 text-sm font-medium">Подробнее →</Link>
                  <button onClick={() => handleDelete(plant.id)} className="text-red-500 hover:text-red-700 text-sm">Удалить</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import { createBitrix24Deal } from '../services/bitrix24';

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tip, setTip] = useState(null);
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPlant, setNewPlant] = useState({ name: '', variety: '', planting_date: '', notes: '' });
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
    if (user) {
      fetchPlants();
      fetchTasks();
      fetchTip();
      fetchRecentNotes();
    }
  }, [user]);

  const fetchPlants = async () => {
    const { data, error } = await supabase
      .from('plant')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error) setPlants(data || []);
    setLoading(false);
  };

  const fetchTasks = async () => {
    // Получаем напоминания, у которых next_occurrence <= сегодня и is_active = true
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('reminder')
      .select('*, plant(name)')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .lte('next_occurrence', today)
      .order('next_occurrence', { ascending: true });
    if (!error) setTasks(data || []);
  };

  const fetchTip = async () => {
    // Получаем случайную статью из энциклопедии (совет дня)
    const { data, error } = await supabase
      .from('encyclopedia_article')
      .select('title, description')
      .limit(1);
    if (!error && data && data.length > 0) setTip(data[0]);
    else setTip({ title: 'Полив', description: 'Не забывайте поливать растения в жаркую погоду.' });
  };

  const fetchRecentNotes = async () => {
    // Последние 3 события ухода с заметками
    const { data, error } = await supabase
      .from('care_event')
      .select('*, plant(name)')
      .eq('plant.user_id', user.id)
      .not('notes', 'is', null)
      .order('event_date', { ascending: false })
      .limit(3);
    if (!error) setRecentNotes(data || []);
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    if (!newPlant.name.trim()) return;

    // 1. Добавляем растение и ЗАПРАШИВАЕМ обратно созданную запись
    const { data: createdPlant, error } = await supabase
      .from('plant')
      .insert([{
        user_id: user.id,
        name: newPlant.name,
        variety: newPlant.variety || null,
        planting_date: newPlant.planting_date || null,
        notes: newPlant.notes || null,
        is_active: true
      }])
      .select(); // <-- ОЧЕНЬ ВАЖНО: эта команда вернет нам добавленную запись

    if (error) {
      console.error(error);
      alert('Ошибка добавления растения');
    } else {
      // 2. Используем полученные данные для отправки в CRM
      if (createdPlant && createdPlant[0]) {
        await createBitrix24Deal(createdPlant[0]); // <-- Теперь переменная определена
      }
      setNewPlant({ name: '', variety: '', planting_date: '', notes: '' });
      setShowForm(false);
      fetchPlants(); // Обновляем список растений
      alert('Растение успешно добавлено!');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {/* Заголовок и кнопка добавления */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Мои растения</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition"
          >
            + Добавить растение
          </button>
        </div>

        {/* Форма добавления (модальное окно) */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Новое растение</h3>
              <form onSubmit={handleAddPlant} className="space-y-4">
                <input
                  type="text"
                  placeholder="Название *"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Сорт (опционально)"
                  value={newPlant.variety}
                  onChange={(e) => setNewPlant({ ...newPlant, variety: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="date"
                  placeholder="Дата посадки"
                  value={newPlant.planting_date}
                  onChange={(e) => setNewPlant({ ...newPlant, planting_date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <textarea
                  placeholder="Заметки"
                  value={newPlant.notes}
                  onChange={(e) => setNewPlant({ ...newPlant, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows="2"
                />
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg">Сохранить</button>
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg">Отмена</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Три колонки: растения, задачи, совет дня */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Список растений */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">🌿 Недавние растения</h3>
            {loading ? (
              <div className="flex justify-center py-12">Загрузка...</div>
            ) : plants.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500">
                У вас пока нет растений. Добавьте первое!
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {plants.slice(0, 4).map((plant) => (
                  <Link to={`/plant/${plant.id}`} key={plant.id}>
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 border-l-4 border-green-500">
                      <h4 className="text-lg font-bold text-gray-800">{plant.name}</h4>
                      {plant.variety && <p className="text-gray-600 text-sm">Сорт: {plant.variety}</p>}
                      {plant.planting_date && <p className="text-gray-500 text-sm">📅 {plant.planting_date}</p>}
                      {plant.notes && <p className="text-gray-500 italic text-sm mt-1">{plant.notes.substring(0, 60)}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {plants.length > 4 && (
              <div className="text-center mt-4">
                <Link to="/my-garden" className="text-green-600 hover:underline">Показать все растения →</Link>
              </div>
            )}
          </div>

          {/* Задачи на сегодня + Совет дня */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">📋 Задачи на сегодня</h3>
              {tasks.length === 0 ? (
                <p className="text-gray-500">Нет задач. Отдыхайте!</p>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li key={task.id} className="flex items-start gap-2 text-gray-700">
                      <input type="checkbox" className="mt-1" /> {/* позже сделаем обновление */}
                      <span>{task.action_type === 'watering' ? '💧 Полив' : task.action_type === 'fertilizing' ? '🌱 Подкормка' : task.action_type} — {task.plant?.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-green-50 rounded-2xl shadow-md p-5">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">💡 Совет дня</h3>
              {tip && (
                <>
                  <p className="font-medium text-green-800">{tip.title}</p>
                  <p className="text-gray-700 text-sm mt-1">{tip.description}</p>
                </>
              )}
              <Link to="/encyclopedia" className="text-green-600 text-sm inline-block mt-3 hover:underline">Подробнее →</Link>
            </div>
          </div>
        </div>

        {/* Последние заметки */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">📝 Последние заметки</h3>
          {recentNotes.length === 0 ? (
            <p className="text-gray-500 bg-white p-4 rounded-xl shadow">Нет заметок. Добавьте первое наблюдение!</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {recentNotes.map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-xl shadow-md">
                  <p className="font-medium">{note.plant?.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{note.notes?.substring(0, 80)}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(note.event_date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
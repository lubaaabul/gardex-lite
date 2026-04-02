import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [careEvents, setCareEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState({ notes: '', eventDate: new Date().toISOString().slice(0, 16) });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/login');
      else setUser(user);
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    if (user && id) fetchPlant();
  }, [user, id]);

  const fetchPlant = async () => {
    setLoading(true);
    const { data: plantData, error: plantError } = await supabase
      .from('plant')
      .select('*')
      .eq('id', id)
      .single();
    if (plantError || plantData.user_id !== user.id) {
      navigate('/my-garden');
      return;
    }
    setPlant(plantData);

    const { data: events, error: eventsError } = await supabase
      .from('care_event')
      .select('*')
      .eq('plant_id', id)
      .order('event_date', { ascending: false });
    if (!eventsError) setCareEvents(events || []);
    setLoading(false);
  };

  const handleAddCareEvent = async (e) => {
    e.preventDefault();
    if (!newNote.notes.trim()) return;
    const { error } = await supabase.from('care_event').insert([{
      plant_id: id,
      action_type: 'observation',
      event_date: newNote.eventDate,
      notes: newNote.notes,
    }]);
    if (error) alert('Ошибка добавления заметки');
    else {
      setNewNote({ notes: '', eventDate: new Date().toISOString().slice(0, 16) });
      fetchPlant();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  if (!plant) return <div className="min-h-screen flex items-center justify-center">Растение не найдено</div>;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{plant.name}</h2>
          <Link to="/my-garden" className="text-green-600 hover:underline">← Назад к саду</Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p><span className="font-semibold">Сорт:</span> {plant.variety || 'не указан'}</p>
              <p><span className="font-semibold">Дата посадки:</span> {plant.planting_date || 'не указана'}</p>
              <p><span className="font-semibold">Заметки:</span> {plant.notes || 'нет'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📸 Фото</h3>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center text-gray-400">(скоро будет галерея)</div>
            </div>
          </div>
        </div>

        {/* Добавление заметки */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">➕ Добавить наблюдение</h3>
          <form onSubmit={handleAddCareEvent} className="space-y-4">
            <textarea
              value={newNote.notes}
              onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
              placeholder="Что нового? (полив, подкормка, появление бутонов...)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="3"
              required
            />
            <input
              type="datetime-local"
              value={newNote.eventDate}
              onChange={(e) => setNewNote({ ...newNote, eventDate: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition">
              Сохранить заметку
            </button>
          </form>
        </div>

        {/* История ухода */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">📋 История ухода</h3>
          {careEvents.length === 0 ? (
            <p className="text-gray-500">Нет записей. Добавьте первую!</p>
          ) : (
            <div className="space-y-3">
              {careEvents.map((event) => (
                <div key={event.id} className="border-b pb-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(event.event_date).toLocaleString()}</span>
                    <span className="capitalize">{event.action_type}</span>
                  </div>
                  <p className="text-gray-700">{event.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
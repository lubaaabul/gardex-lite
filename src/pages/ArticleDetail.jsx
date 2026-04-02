import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('encyclopedia_article')
      .select('*, category(name)')
      .eq('id', id)
      .single();
    if (error) navigate('/encyclopedia');
    else setArticle(data);
    setLoading(false);
  };

  const handleAddToGarden = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Проверяем, есть ли уже такое растение
    const { data: existing } = await supabase
      .from('plant')
      .select('id')
      .eq('user_id', user.id)
      .eq('name', article.title)
      .maybeSingle();
    if (existing) {
      alert('Это растение уже есть в вашем саду');
      return;
    }
    const { error } = await supabase.from('plant').insert([{
      user_id: user.id,
      name: article.title,
      variety: null,
      notes: article.description,
      is_active: true
    }]);
    if (error) alert('Ошибка добавления');
    else {
      alert('Растение добавлено в ваш сад');
      navigate('/my-garden');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  if (!article) return null;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-4">
          <Link to="/encyclopedia" className="text-green-600 hover:underline">← Назад к энциклопедии</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{article.title}</h1>
          <p className="text-gray-500 mb-4">{article.category?.name}</p>
          <p className="text-gray-700 mb-6">{article.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-lg">💧 Полив</h3>
              <p className="text-gray-600">{article.watering_instructions}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">☀️ Освещение</h3>
              <p className="text-gray-600">{article.light_requirements}</p>
            </div>
            {article.fertilizing_instructions && (
              <div>
                <h3 className="font-semibold text-lg">🌱 Подкормка</h3>
                <p className="text-gray-600">{article.fertilizing_instructions}</p>
              </div>
            )}
            {article.wintering_instructions && (
              <div>
                <h3 className="font-semibold text-lg">❄️ Зимовка</h3>
                <p className="text-gray-600">{article.wintering_instructions}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToGarden}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition w-full md:w-auto"
          >
            🌱 Добавить в мой сад
          </button>
        </div>
      </main>
    </>
  );
}
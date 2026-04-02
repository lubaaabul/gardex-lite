import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function Encyclopedia() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: cats } = await supabase.from('category').select('*').order('sort_order', { ascending: true });
    if (cats) setCategories(cats);
    const { data: arts } = await supabase.from('encyclopedia_article').select('*, category(name)');
    if (arts) setArticles(arts);
    setLoading(false);
  };

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🌿 Энциклопедия растений</h2>
        
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-8"
        />

        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(cat => (
            <span key={cat.id} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">{cat.name}</span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Загрузка...</p>
          ) : filteredArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5">
                <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.category?.name}</p>
                <p className="text-gray-600 mt-2 line-clamp-2">{article.description.substring(0, 100)}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
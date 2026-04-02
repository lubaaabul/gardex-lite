import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (!error) setProfile(data);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">👤</div>
            <h2 className="text-3xl font-bold text-gray-800">Ваш профиль</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg text-gray-800">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Имя</label>
              <p className="text-lg text-gray-800">{profile?.name || 'Не указано'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Дата регистрации</label>
              <p className="text-lg text-gray-800">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-gray-400 text-sm">
            Настройки и смена пароля будут добавлены позже.
          </div>
        </div>
      </main>
    </>
  );
}
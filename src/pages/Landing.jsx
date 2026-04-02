import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-green-700">🌱 Gardex Lite</h1>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full transition duration-200 shadow-md"
            >
              Войти
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Ваш сад под контролем — <span className="text-green-600">ничего не забывайте</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Умные напоминания, автоматический дневник ухода и энциклопедия растений для занятых дачников.
        </p>
        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition duration-200 inline-block"
        >
          Начать бесплатно
        </Link>
      </section>

      {/* Блок проблем */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Знакомая ситуация?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-green-50">
              <div className="text-5xl mb-4">💧</div>
              <p className="text-gray-700 text-lg">Забываете поливать? Напоминания не дадут пропустить</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-green-50">
              <div className="text-5xl mb-4">🌿</div>
              <p className="text-gray-700 text-lg">Путаете сорта? Дневник сохранит историю каждого растения</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-green-50">
              <div className="text-5xl mb-4">📱</div>
              <p className="text-gray-700 text-lg">Тонете в интернете? Энциклопедия с простыми инструкциями</p>
            </div>
          </div>
        </div>
      </section>

      {/* Блок возможностей (4 карточки) */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Всё, что нужно для заботы о саде</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">⏰</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Напоминания</h4>
              <p className="text-gray-600">Настраивайте полив, подкормку и обработку. Мы напомним вовремя.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">📸</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Дневник ухода</h4>
              <p className="text-gray-600">Фотографируйте и записывайте наблюдения. История сохраняется автоматически.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">📅</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Календарь</h4>
              <p className="text-gray-600">Планируйте работы на неделю и месяц. Ничего не упустите.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Энциклопедия</h4>
              <p className="text-gray-600">Тысячи растений с краткими и понятными советами по уходу.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Начать просто</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 mx-auto mb-4 shadow">1</div>
              <p className="text-gray-700 text-lg">Добавьте растения в приложение</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 mx-auto mb-4 shadow">2</div>
              <p className="text-gray-700 text-lg">Настройте напоминания</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 mx-auto mb-4 shadow">3</div>
              <p className="text-gray-700 text-lg">Получайте уведомления и отмечайте выполненные задачи</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition inline-block"
            >
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Садоводы рекомендуют</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-xl">👩</div>
                <div>
                  <p className="font-bold text-gray-800">Анна Ивановна</p>
                  <p className="text-sm text-gray-500">опытный садовод</p>
                </div>
              </div>
              <p className="text-gray-600 italic">«Нашла всё в одном месте: и напоминания, и дневник. Очень удобно, больше ничего не забываю!»</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-xl">👨</div>
                <div>
                  <p className="font-bold text-gray-800">Михаил</p>
                  <p className="text-sm text-gray-500">дачник выходного дня</p>
                </div>
              </div>
              <p className="text-gray-600 italic">«Спасибо за предупреждение о заморозках! Спас свою гортензию, приложение реально помогает».</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-xl">👩</div>
                <div>
                  <p className="font-bold text-gray-800">Елена</p>
                  <p className="text-sm text-gray-500">начинающий садовод</p>
                </div>
              </div>
              <p className="text-gray-600 italic">«Энциклопедия — супер! Всё понятно, без воды. Теперь знаю, как ухаживать за розами».</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (призыв к действию) */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Готовы навести порядок в саду?</h3>
          <p className="text-xl mb-8 opacity-90">Присоединяйтесь к Gardex Lite прямо сейчас</p>
          <Link
            to="/login"
            className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transition inline-block"
          >
            Начать бесплатно
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">© 2025 Gardex Lite — Ваш зелёный помощник</p>
          <div className="flex justify-center gap-6 text-sm opacity-75">
            <a href="#" className="hover:underline">О нас</a>
            <a href="#" className="hover:underline">Контакты</a>
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
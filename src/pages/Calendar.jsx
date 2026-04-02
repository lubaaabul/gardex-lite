import Navbar from '../components/Navbar';

export default function Calendar() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Календарь задач</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Здесь будут отображаться ваши запланированные напоминания: полив, подкормка, обработка — по дням.
          </p>
          <p className="text-gray-400 text-sm mt-6">Функция в разработке. Скоро появится!</p>
        </div>
      </main>
    </>
  );
}
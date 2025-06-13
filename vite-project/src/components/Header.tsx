export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-yellow-50 text-yellow-500 font-semibold">
      <h1 className="text-2xl font-bold text-gray-900">pedagog.ia</h1>
      <nav className="space-x-6">
        <a href="#" className="hover:underline">Cadastro</a>
        <a href="#" className="hover:underline">Login</a>
      </nav>
    </header>
  );
}
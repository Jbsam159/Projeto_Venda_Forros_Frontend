import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="font-bold text-xl">SS Enxovais</div>
      <div className="flex gap-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/register" className="hover:underline">Cadastro</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}
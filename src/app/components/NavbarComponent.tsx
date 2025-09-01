import Link from "next/link";
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="navbar text-white px-4 py-4 flex justify-between items-center">
      <Image  src="/ss_enxovais.jpg" alt="Logo" width={100} height={0} className="rounded-full"/>
      <div className="flex gap-6">
        <Link href="/" className="link hover:underline text-gray-700 font-bold">Home</Link>
        <Link href="/register" className="link hover:underline text-gray-700 font-bold">Cadastro</Link>
        <Link href="/login" className="link hover:underline text-gray-700 font-bold">Login</Link>
        <Link href="/products" className="link hover:underline text-gray-700 font-bold">Produtos</Link>
        <Link href="/cart" className="link hover:underline text-gray-700 font-bold">Carrinho</Link>
      </div>
    </nav>
  );
}
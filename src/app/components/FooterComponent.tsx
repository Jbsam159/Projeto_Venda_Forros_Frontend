export default function Footer() {
  return (
    <footer className="bg-footer relative bottom-0 left-0 w-full text-gray-700 font-bold py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Nome */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">Minha Loja</h2>
          <p className="mt-2 text-sm">
            Peças automotivas de qualidade com os melhores preços.
          </p>
        </div>

        {/* Links de Navegação */}
        <div>
          <h3 className="text-lg font-semibold text-gray mb-3">Links Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray">Home</a></li>
            <li><a href="/produtos" className="hover:text-gray">Produtos</a></li>
            <li><a href="/sobre" className="hover:text-gray">Sobre</a></li>
            <li><a href="/contato" className="hover:text-gray">Contato</a></li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-lg font-semibold text-gray mb-3">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray">Facebook</a>
            <a href="#" className="hover:text-gray">Instagram</a>
            <a href="#" className="hover:text-gray">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Minha Loja - Todos os direitos reservados.
      </div>
    </footer>
  )
}

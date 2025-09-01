import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="absolute inset-0">          
          <img
            src="/forro1.jpg"
            alt="Forros de cama SS Enxovais"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
            Conforto e Estilo para o Seu Lar
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl">
            Descubra os melhores forros de cama e produtos exclusivos da{" "}
            <span className="font-semibold">SS Enxovais</span>.
          </p>
          <a
            href="/products"
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Ver Produtos
          </a>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Nossos Destaques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card exemplo */}
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/forro2.jpg"
              alt="Jogo de Cama"
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                Jogo de Cama Premium
              </h3>
              <p className="text-gray-600 mt-2">A partir de R$199,90</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/forro3.jpg"
              alt="Edredom Macio"
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                Edredom Macio
              </h3>
              <p className="text-gray-600 mt-2">A partir de R$249,90</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
            <img
              src="/forro4.jpg"
              alt="Travesseiro Confort"
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                Travesseiro Confort
              </h3>
              <p className="text-gray-600 mt-2">A partir de R$79,90</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a marca */}
      <section className="about py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Sobre Nós</h2>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
          A <span className="font-semibold">SS Enxovais</span> nasceu com a
          missão de levar mais conforto, qualidade e estilo para o seu lar.
          Nossos produtos são cuidadosamente selecionados para transformar sua
          casa em um ambiente acolhedor.
        </p>
      </section>

      {/* CTA */}
      <section className="cta py-16 px-6 md:px-20 text-center text-white">
        <h2 className="text-3xl font-bold text-gray-800">Pronto para renovar sua casa?</h2>
        <p className="mt-4 text-lg text-gray-700">
          Confira nossas coleções e aproveite ofertas exclusivas.
        </p>
        <a
          href="/products"
          className="cta-a mt-6 inline-block font-bold text-gray-700 px-6 py-3 rounded-lg shadow-lg"
        >
          Comprar Agora
        </a>
      </section>
    </main>
  );
}

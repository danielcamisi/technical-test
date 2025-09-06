"use client";

import BackBtn from "@/components/backbtn";

export default function AboutPage() {
  const stats = [
    { number: "10K+", label: "Leitores Diários" },
    { number: "500+", label: "Notícias Publicadas" },
    { number: "24/7", label: "Cobertura Contínua" },
    { number: "50+", label: "Jornalistas" },
  ];

  return (
    <main className="min-h-screen pt-8 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-indigo-600 text-center">
            Sobre Nós
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white">📰</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Nova Notícias</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Sua fonte confiável de informação, conectando você aos
              acontecimentos que moldam o mundo com precisão e agilidade.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Nossa História
            </h3>
            <p className="text-gray-700 leading-relaxed">
              A Nova Notícias nasceu da visão de democratizar o acesso à
              informação de qualidade. Fundada em 2020, nossa plataforma combina
              tecnologia de ponta com jornalismo tradicional para entregar
              conteúdo relevante, preciso e oportuno.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Acreditamos que uma sociedade bem informada é a base de uma
              democracia forte. Por isso, trabalhamos incansavelmente para
              trazer as notícias que realmente importam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-indigo-600 mb-3">
                Nossa Missão
              </h4>
              <p className="text-gray-700">
                Democratizar o acesso à informação de qualidade, fornecendo
                notícias precisas e relevantes que empoderam nossos leitores.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-600 mb-3">
                Nossa Visão
              </h4>
              <p className="text-gray-700">
                Ser a principal plataforma de notícias digitais, reconhecida
                pela excelência jornalística e inovação tecnológica.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Nossos Valores
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h5 className="font-medium text-gray-900">Precisão</h5>
                  <p className="text-sm text-gray-600">
                    Comprometidos com a veracidade em cada notícia
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h5 className="font-medium text-gray-900">Agilidade</h5>
                  <p className="text-sm text-gray-600">
                    Notícias importantes no momento certo
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h5 className="font-medium text-gray-900">Transparência</h5>
                  <p className="text-sm text-gray-600">
                    Jornalismo ético e transparente
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h5 className="font-medium text-gray-900">Alcance Global</h5>
                  <p className="text-sm text-gray-600">
                    Cobertura local e internacional
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Fale Conosco
            </h3>
            <p className="text-gray-600 mb-4">
              Tem alguma sugestão ou quer fazer parte da nossa equipe?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:contato@novanoticas.com"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                📧 contato@novanoticas.com
              </a>
              <a
                href="tel:+5511999999999"
                className="inline-flex items-center justify-center px-4 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                📞 (11) 99999-9999
              </a>
            </div>
          </div>
        </div>
        <BackBtn />
      </div>
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4">
            <h4 className="text-lg font-bold">Nova Notícias</h4>
            <p className="text-gray-400 text-sm">
              Sua fonte confiável de informação, 24 horas por dia.
            </p>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-gray-400 text-sm">
                © 2024 Nova Notícias. Todos os direitos reservados.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm mt-2">
                <span className="text-gray-400">Desenvolvido por</span>
                <span className="text-indigo-400 font-semibold">
                  Daniel Camillo
                </span>
                <span className="text-red-500">❤️</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

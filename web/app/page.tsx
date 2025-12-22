'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Calendar, Church, Users, Heart, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      {/* HEADER COMPONENTE */}
      <Header />

      {/* HERO SECTION - Boas Vindas */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-b from-[#fcf8e8] to-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#b8860b] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Seja Bem-vindo à nossa Comunidade
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Vivendo a Fé, Unidos em <span className="text-[#d4af37]">Cristo</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Acompanhe a nossa liturgia, participe dos nossos eventos e fortaleça sua caminhada espiritual com o nosso Portal da Fé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agenda" className="bg-[#1e3a8a] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
              Ver Agenda <Calendar size={18} />
            </Link>
            <Link href="/login" className="border-2 border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-full font-bold hover:bg-[#d4af37] hover:text-white transition-all flex items-center justify-center">
              Acessar Painel
            </Link>
          </div>
        </div>
      </section>

      {/* CARDS DE ACESSO RÁPIDO */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <FeatureCard 
            icon={<Church className="text-[#d4af37]" size={32} />}
            title="Santas Missas"
            description="Confira os horários de celebrações, missas dominicais e preceitos."
          />
          
          <FeatureCard 
            icon={<Calendar className="text-[#d4af37]" size={32} />}
            title="Eventos e Cursos"
            description="Fique por dentro dos retiros, catequese, batismos e eventos da nossa paróquia."
          />

          <FeatureCard 
            icon={<Heart className="text-[#d4af37]" size={32} />}
            title="Pastoral"
            description="Conheça nossas obras sociais e como você pode ajudar a nossa comunidade."
          />

        </div>
      </section>

      {/* SEÇÃO DA AGENDA (Preview) */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
              Acompanhe nossa <span className="text-[#d4af37]">Programação</span>
            </h3>
            <p className="text-gray-600 mb-6">
              Nosso calendário está sempre atualizado com horários de confissões, grupos de oração e adorações ao Santíssimo Sacramento. Não perca nenhum momento de comunhão.
            </p>
            <Link href="/agenda" className="text-[#1e3a8a] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
              Acessar calendário completo <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Ilustração Visual do Calendário */}
          <div className="flex-1 bg-white p-4 rounded-2xl shadow-2xl border-t-4 border-[#d4af37]">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border-b border-gray-100">
                 <div className="w-12 h-12 bg-[#fcf8e8] rounded-lg flex flex-col items-center justify-center text-[#b8860b] font-bold">
                    <span className="text-[10px]">DEZ</span>
                    <span>24</span>
                 </div>
                 <div className="font-bold text-sm text-gray-800">Missa do Galo - 20h00</div>
              </div>
              <div className="flex items-center gap-4 p-3 opacity-50">
                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 font-bold">
                    <span className="text-[10px]">DEZ</span>
                    <span>25</span>
                 </div>
                 <div className="font-bold text-sm text-gray-800">Missa de Natal - 10h00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    <Footer />
    </div>
  );
}

// Subcomponente de Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group flex flex-col items-center text-center">
      <div className="mb-4 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
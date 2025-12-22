'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/calendar'; 
import { Plus, Users } from "lucide-react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ModalEvento from '@/components/ModalEvento';

export default function AgendaPage() {
  // --- ESTADOS ---
  const [eventosDoBanco, setEventosDoBanco] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'common' | 'admin' | null>(null);
  
  // NOVO: Estado para controlar a abertura do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- SEUS EVENTOS FIXOS (PRESERVADOS) ---
  const eventosPadrao = [
    { title: 'Missa - 4º Domingo do Advento', date: '2025-12-21', backgroundColor: '#1e3a8a', textColor: '#ffffff' },
    { title: 'Confissões Comunitárias', date: '2025-12-22', backgroundColor: '#6b21a8', textColor: '#ffffff' },
    { title: 'Terço dos Homens', date: '2025-12-23', backgroundColor: '#991b1b', textColor: '#ffffff' },
    { title: 'Missa do Galo (Vigília de Natal)', date: '2025-12-24', backgroundColor: '#d4af37', textColor: '#1e3a8a' },
    { title: 'Missa de Natal (Nascimento do Senhor)', date: '2025-12-25', backgroundColor: '#d4af37', textColor: '#1e3a8a' },
    { title: 'Celebração da Palavra', date: '2025-12-27', backgroundColor: '#1e40af', textColor: '#ffffff' },
    { title: 'Missa da Sagrada Família', date: '2025-12-28', backgroundColor: '#1e3a8a', textColor: '#ffffff' },
    { title: 'Adoração ao Santíssimo (Ação de Graças)', date: '2025-12-30', backgroundColor: '#d4af37', textColor: '#1e3a8a' },
    { title: 'Missa de Ano Novo (Mãe de Deus)', date: '2025-12-31', backgroundColor: '#d4af37', textColor: '#1e3a8a' }
  ];

  // --- BUSCA DE DADOS ---
  useEffect(() => {
    const roleSalva = localStorage.getItem('userRole') as 'common' | 'admin';
    setUserRole(roleSalva || 'common');
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch('/api/eventos');
      if (response.ok) {
        const data = await response.json();
        setEventosDoBanco(data);
      }
    } catch (error) {
      console.error("Erro ao carregar eventos do banco:", error);
    } finally {
      setLoading(false);
    }
  };

  // const isAdmin = userRole === 'admin';
const isAdmin = true;
  // --- UNIÃO DOS EVENTOS (FIXOS + BANCO) ---
  const todosEventos = [...eventosPadrao, ...eventosDoBanco];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* MODAL CONECTADO AO ESTADO */}
      <ModalEvento 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchEventos} 
      />

      <main className="flex flex-1 p-6 gap-6 flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* MENU LATERAL */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            
            {/* BOTÃO ADMIN COM FUNÇÃO DE CLIQUE */}
            {isAdmin && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#1e3a8a] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-all mb-6 shadow-lg shadow-blue-900/20"
              >
                <Plus size={20} /> Novo Evento
              </button>
            )}
            
            <div className="mt-6 space-y-2">
              <h3 className="text-xs font-black text-gray-400 uppercase mb-4 tracking-widest">Filtros</h3>
              <button className="flex items-center gap-2 w-full p-2 rounded-lg bg-blue-50 text-[#1e3a8a] text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" /> Todos
              </button>
              <button className="flex items-center gap-2 w-full p-2 rounded-lg text-gray-500 text-sm hover:bg-gray-50 transition-colors">
                <Users size={16} /> Ministérios
              </button>
            </div>
          </div>
        </aside>

        {/* ÁREA DO CALENDÁRIO */}
        <section className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 gap-4">
              <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
              <p className="font-bold text-sm uppercase tracking-widest">Carregando Agenda Sagrada...</p>
            </div>
          ) : (
            <Calendar eventos={todosEventos} canEdit={isAdmin} />
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
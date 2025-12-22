'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface ModalEventoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalEvento({ isOpen, onClose, onSuccess }: ModalEventoProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    backgroundColor: '#1e3a8a',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', date: '', backgroundColor: '#1e3a8a', description: '' });
        onSuccess(); // Recarrega a lista
        onClose();   // Fecha o modal
      }
    } catch (error) {
      alert("Erro ao salvar no banco!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-[#1e3a8a] p-4 text-white flex justify-between items-center">
          <h2 className="font-black uppercase tracking-tighter">Novo Evento Sagrado</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Título do Evento</label>
            <input 
              required
              className="w-full border-2 border-gray-100 rounded-lg p-3 outline-none focus:border-[#d4af37] transition-all"
              type="text" 
              placeholder="Ex: Missa de Natal"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Data</label>
            <input 
              required
              className="w-full border-2 border-gray-100 rounded-lg p-3 outline-none focus:border-[#d4af37]"
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Cor Litúrgica</label>
            <select 
              className="w-full border-2 border-gray-100 rounded-lg p-3 outline-none focus:border-[#d4af37]"
              value={formData.backgroundColor}
              onChange={(e) => setFormData({...formData, backgroundColor: e.target.value})}
            >
              <option value="#1e3a8a">Azul (Comum/Mariano)</option>
              <option value="#d4af37">Dourado (Solenidade)</option>
              <option value="#6b21a8">Roxo (Advento/Penitência)</option>
              <option value="#15803d">Verde (Tempo Comum)</option>
              <option value="#b91c1c">Vermelho (Mártires/Festas)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#d4af37] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b8860b] transition-all mt-4"
          >
            <Save size={20} /> GRAVAR NA AGENDA
          </button>
        </form>
      </div>
    </div>
  );
}
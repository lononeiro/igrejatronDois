'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateChurchPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch('/api/igreja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': userEmail || '',
        },
        body: JSON.stringify({ nome, endereco }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erro ao criar igreja');
        setIsLoading(false);
        return;
      }

      router.push('/admin'); // or wherever
    } catch (err) {
      setError('Erro inesperado');
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-6">Criar Igreja</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Endereço</label>
            <input
              type="text"
              required
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            {isLoading ? 'Criando...' : 'Criar Igreja'}
          </button>
        </form>
      </div>
    </main>
  );
}
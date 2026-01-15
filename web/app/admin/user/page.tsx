'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAdminUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch('/api/user/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': userEmail || '',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erro ao criar usuário');
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
        <h1 className="text-xl font-bold mb-6">Criar Usuário Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            {isLoading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </form>
      </div>
    </main>
  );
}
'use client';

import { useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function PerfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            // TEMPORÁRIO
            'x-user-email': 'user@teste.com',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Erro ao carregar perfil');
          setLoading(false);
          return;
        }

        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('Erro inesperado');
        setLoading(false);
      }
    }

    fetchPerfil();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Carregando perfil...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center text-red-600">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-xl font-bold text-gray-800">
          Meu Perfil
        </h1>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>ID:</strong> {user?.id}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Perfil:</strong> {user?.role}</p>
          <p>
            <strong>Criado em:</strong>{' '}
            {new Date(user!.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}

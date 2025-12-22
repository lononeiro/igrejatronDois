'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password, // senha em TEXTO
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Erro ao fazer login');
                setIsLoading(false);
                return;
            }

            // Login OK
            console.log('Usuário logado:', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
            router.push('/');

        } catch (err) {
            console.error(err);
            setError('Erro inesperado. Tente novamente.');
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 md:p-0">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row flex-col">

                {/* LADO IMAGEM */}
                <div className="relative hidden w-1/2 bg-blue-900 md:block">
                    <img
                        src="/pomba.png"
                        alt="Igreja"
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                        <h2 className="mb-2 text-3xl font-bold italic">
                            Tudo posso naquele que me fortalece
                        </h2>
                        <p className="text-sm opacity-80">
                            Bem-vindo de volta à nossa comunidade.
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-gray-800">
                            Acesse sua conta para continuar
                        </h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                E-mail
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-500"
                            />
                        </div>

                        {/* ERRO */}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isLoading ? 'Carregando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <a
                            href="/singin"
                            className="text-sm text-blue-900 hover:underline whitespace-nowrap"
                        >
                            Cadastre-se
                        </a>

                        <span className="text-gray-400">|</span>

                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

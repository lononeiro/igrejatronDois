'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            const loginSucesso = true;

            if (loginSucesso) {
                router.push('/');
            }
            else {
                alert('Falha no login. Verifique suas credenciais e tente novamente.');
                setIsLoading(false);
            }
        }, 1000);
    }

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 md:p-0">
            {/* Container Principal que segura a Imagem e o Form */}
            <div className="flex max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row flex-col">

                {/* LADO 1: Imagem (Escondida no celular ou em cima, visível no lado no PC) */}
                {/* <div className="relative hidden w-1/2 bg-blue-900 md:block">
                    <img
                        src="/pomba.png"
                        alt="Igreja"
                        className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                        <h2 className="mb-2 text-3xl font-bold italic">"Tudo posso naquele que me fortalece"</h2>
                        <p className="text-sm opacity-80">Bem-vindo de volta à nossa comunidade.</p>
                    </div>
                </div> */}

                {/* LADO 2: Formulário de Login */}
                <div className="flex w-full flex-col justify-center p-8  lg:p-12">
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-gray-800">Acesse sua conta para continuar</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">E-mail</label>
                            <input
                                required
                                type="email"
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Senha</label>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700">
                            {isLoading ? 'Carregando...' : 'Cadastrar'}
                        </button>
                    </form>

                    <div className="flex items-center justify-center">
                        <p className="mt-6 text-center text-sm text-gray-500">
                            Já possui uma conta?
                            <a href="/login" className="text-blue-600 hover:underline ml-1">Clique aqui</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
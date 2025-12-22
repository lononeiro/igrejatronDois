'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Church,
  Menu,
  X,
  Users,
  BookOpen,
  Bell,
  Home,
  User,
  LogOut,
} from 'lucide-react';

type MobileLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export default function Header() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ RODA APENAS NO CLIENT
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  }

  // ⛔ evita hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <header className="bg-white text-gray-800 shadow-sm border-b-2 border-[#d4af37] px-6 py-4 md:px-12 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* BOTÃO MOBILE */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={28} />
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#fcf8e8] p-2 rounded-lg border border-[#d4af37]/30">
              <Church className="text-[#d4af37]" size={26} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black uppercase">Portal da Fé</h1>
              <span className="text-[10px] tracking-widest text-[#b8860b]">
                Comunidade Cristã
              </span>
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 text-xs font-bold uppercase text-gray-600">
              <li><Link href="/">Início</Link></li>
              <li><Link href="/agenda">Funcionários</Link></li>
              <li><Link href="/agenda">Catequese</Link></li>
              <li><Link href="/agenda">Avisos</Link></li>
            </ul>

            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="border-2 border-[#d4af37] px-4 py-2 rounded-full text-xs font-bold text-[#d4af37] hover:bg-[#d4af37] hover:text-white"
                >
                  Meu Perfil
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <Link
                      href="/perfil"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm"
                    >
                      <User size={16} /> Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* MENU MOBILE */}
      {/* MENU MOBILE */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={toggleMenu}
          />

          <aside
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-lg transform transition-transform"
          >
            <div className="p-6 flex justify-between items-center border-b">
              <span className="font-bold">Menu</span>
              <button onClick={toggleMenu}>
                <X />
              </button>
            </div>

            <nav className="p-6 flex flex-col gap-2">
              <MobileLink href="/" icon={<Home size={20} />} label="Início" onClick={toggleMenu} />
              <MobileLink href="/agenda" icon={<Users size={20} />} label="Funcionários" onClick={toggleMenu} />
              <MobileLink href="/agenda" icon={<BookOpen size={20} />} label="Catequese" onClick={toggleMenu} />
              <MobileLink href="/agenda" icon={<Bell size={20} />} label="Avisos" onClick={toggleMenu} />

              {isAuthenticated && (
                <>
                  <Link
                    href="/perfil"
                    className="mt-6 flex items-center gap-3 p-4 bg-[#d4af37] text-white rounded-xl"
                  >
                    <User size={20} /> Perfil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-4 text-red-600"
                  >
                    <LogOut size={20} /> Sair
                  </button>
                </>
              )}
            </nav>
          </aside>
        </div>
      )}

    </>
  );
}

function MobileLink({ href, icon, label, onClick }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100"
    >
      {icon}
      {label}
    </Link>
  );
}

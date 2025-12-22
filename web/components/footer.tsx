import Link from 'next/link';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'; // Ícones comuns

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Logo e Sobre */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Paróquia Nossa Senhora da Consolação</h2>
            <p className="text-sm text-slate-400">
              Um lugar de recomeços, fé e comunidade. Venha fazer parte da nossa família.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-500 transition"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-blue-600 transition"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-red-500 transition"><Youtube size={20} /></Link>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:underline">Início</Link></li>
              <li><Link href="/sobre" className="hover:underline">Nossa História</Link></li>
              <li><Link href="/ministerios" className="hover:underline">Ministérios</Link></li>
              <li><Link href="/doacoes" className="hover:underline">Dízimos e Ofertas</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Horários */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Missas</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-white font-medium">Domingo:</span> 10h30 e 19h</li>
              <li><span className="text-white font-medium">Quarta-feira:</span> 20h</li>
              <li><span className="text-white font-medium">Sábados</span> 19h</li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin size={18} className="text-blue-500 shrink-0" />
              <span>Rua da Fé, 123, Bairro Esperança, Cidade/UF</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone size={18} className="text-blue-500" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail size={18} className="text-blue-500" />
              <span>contato@igrejaviva.com.br</span>
            </div>
          </div>

        </div>

        {/* Linha Inferior */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          <p>© {currentYear} Igreja Viva - Todos os direitos reservados.</p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-600">
            Desenvolvido por [Seu Nome/Agência]
          </p>
        </div>
      </div>
    </footer>
  );
}
'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Evento {
  title: string;
  date: string;
  backgroundColor?: string;
  textColor?: string;
}

interface CalendarProps {
  eventos: Evento[];
  canEdit: boolean; // Adicionado para aceitar a permissão do usuário
}

export default function Calendar({ eventos, canEdit }: CalendarProps) {
  return (
    <div className="calendar-container bg-white p-4 rounded-xl">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="pt-br"
        // Habilita ou desabilita interações baseado na permissão canEdit
        editable={canEdit}
        selectable={canEdit}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        events={eventos}
        height="auto"
        buttonText={{
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana'
        }}
        eventClick={(info) => {
          // Se não for admin, você pode apenas mostrar os detalhes sem permitir edição
          if (!canEdit) {
            alert('Visualizando Evento: ' + info.event.title);
          } else {
            alert('Editar Evento (Painel Admin): ' + info.event.title);
          }
        }}
      />

      {/* Estilização focada no Azul e Dourado (Preservada) */}
      <style jsx global>{`
        .fc {
          --fc-border-color: #e5e7eb; 
          --fc-button-bg-color: #1e3a8a; 
          --fc-button-border-color: #1e3a8a;
        }
        
        .fc .fc-toolbar-title {
          color: #1e3a8a; 
          font-weight: 800; 
          text-transform: uppercase; 
          font-size: 1.1rem;
        }
        
        .fc-event {
          border: none !important; 
          cursor: pointer; 
          padding: 2px;
        }
        
        .fc-day-today {
          background-color: #fefce8 !important;
        }
        
        .fc-button-active {
          background-color: #d4af37 !important; 
          border-color: #d4af37 !important; 
        }

        /* Melhora a visibilidade do cursor caso não possa editar */
        .fc-event {
          cursor: ${canEdit ? 'move' : 'pointer'} !important;
        }
      `}</style>
    </div>
  );
}
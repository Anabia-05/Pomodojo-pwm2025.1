// components/BotaoGoogleCalendar.jsx
import React from "react";

export default function BotaoGoogleCalendar({ evento }) {
  const gerarLink = () => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";

    const inicio = new Date(evento.Data.iso);
    const fim = new Date(inicio.getTime() + 60 * 60 * 1000); // +1 hora

    const formatarData = (data) => {
      return data.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const params = new URLSearchParams({
      text: evento.NomeEvt,
      dates: `${formatarData(inicio)}/${formatarData(fim)}`,
      details: evento.Descricao,
      location: evento.Local,
    });

    return `${baseUrl}&${params.toString()}`;
  };

  return (
    <a
      href={gerarLink()}
      target="_blank"
      rel="noopener noreferrer"
    >
      Adicionar ao Google Calendar
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { getEventoById } from "@/app/api";
import EditorEvento from "@/components/EditorEvento";
import "./page.css";

export default function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEvento() {
      const resultado = await getEventoById(id);
      if (resultado) setEvento(resultado);
      setLoading(false);
    }

    if (id) carregarEvento();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <p>Carregando evento...</p>
      </>
    );
  }

  if (!evento) {
    return (
      <>
        <Header />
        <h3>ID: {id}</h3>
        <p>Evento não encontrado.</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <h3 className="h3">Detalhes do Evento</h3>
      <div className="caixaEvento">
        <EditorEvento evento={evento} onEventoAtualizado={setEvento} />
      </div>
    </>
  );
}

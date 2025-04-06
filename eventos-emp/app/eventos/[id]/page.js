'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import { updateEvento, getEventoById } from "@/app/api"; // agora usando a função da api

export default function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    async function carregarEvento() {
      const resultado = await getEventoById(id);
      if (resultado) setEvento(resultado);
      setLoading(false);
    }

    if (id) carregarEvento();
  }, [id]);

  async function alternarStatus() {
    if (!evento) return;

    setAtualizando(true);
    const novoStatus = !evento.Status;

    const atualizado = await updateEvento({ ...evento, Status: novoStatus });

    if (atualizado) {
      setEvento(atualizado);
    }

    setAtualizando(false);
  }

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
      <h3>Detalhes do Evento</h3>
      <ul>
        <li><strong>Nome:</strong> {evento.NomeEvt}</li>
        <li><strong>Descrição:</strong> {evento.Descricao}</li>
        <li><strong>Data:</strong> {new Date(evento.Data.iso).toLocaleDateString()}</li>
        <li><strong>Local:</strong> {evento.Local}</li>
        <li>
          <strong>Status:</strong> {evento.Status ? "Ativo" : "Inativo"}
          <button onClick={alternarStatus} disabled={atualizando}>
            {atualizando ? "Atualizando..." : "Alternar Status"}
          </button>
        </li>
      </ul>
    </>
  );
}

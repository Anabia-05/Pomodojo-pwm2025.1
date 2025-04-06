'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Parse from "parse";
import Header from "@/components/Header";

// Configuração do Parse
Parse.initialize("y252xv9Jnq4yizmwdMoY9zmbrxOOLZVL3GHtEZYZ", "1vBaGqMBudDhIyPk2ttwb64HLuGldk2gjjx5lWdm");
Parse.serverURL = "https://parseapi.back4app.com/";

export default function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEventoPorId(id) {
      const Evento = Parse.Object.extend("Eventos");
      const query = new Parse.Query(Evento);

      try {
        const resultado = await query.get(id);
        setEvento(resultado.toJSON());
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarEventoPorId(id);
  }, [id]);

  async function alternarStatus() {
    try {
      const Evento = Parse.Object.extend("Eventos");
      const query = new Parse.Query(Evento);
      const eventoObj = await query.get(id);

      const novoStatus = !evento.Status;
      eventoObj.set("Status", novoStatus);
      const eventoAtualizado = await eventoObj.save();

      setEvento(eventoAtualizado.toJSON());
      
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
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
        <li><strong>Status:</strong> {evento.Status ? "Ativo" : "Inativo"}</li>
      </ul>
      <button onClick={alternarStatus}>
        Alterar Status
      </button>
    </>
  );
}

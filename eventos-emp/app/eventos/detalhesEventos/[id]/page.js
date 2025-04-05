"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { getEventosPorId } from "@/app/api";

export default function DetalheEvento() {
  const [eventos, setEventos] = useState(null);
  const [loading, setloading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function carregarEventos(id) {
      try {
        const resultado = await getEventosPorId(id);
        setEventos(resultado);
      } catch (err) {
        console.error("Erro ao carregar evento", err);
      } finally {
        setloading(false);
      }
    }

    carregarEventos();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <p>Carregando...</p>
      </>
    );
  }

  if (!evento) {
    return (
      <>
        <header />
        <h3>ID = {id}</h3>
        <p>Evento não econtrado.</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <h3>ID = {id}</h3>
      <ul>
        <li>
          <strong>Nome:</strong> {evento.nomeEvt}
        </li>
        <li>
          <strong>Descricao:</strong> {evento.Descricao}
        </li>
        <li>
          <strong>Data:</strong>{" "}
          {new Date(evento.Data.iso).toLocaleDateString()}
        </li>
        <li>
          <strong>Local:</strong> {evento.Local}
        </li>
        <li>
          <strong>Status</strong> {evento.Status ? "Ativo" : "Inativo"}
        </li>
      </ul>
    </>
  );
}

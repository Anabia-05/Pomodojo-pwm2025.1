"use client";

import { useEffect, useState } from "react";
import { addEvento, getEventos, deleteEvento } from "../api";
import Header from "@/components/Header";
import Eventos from "@/components/Eventos";
import FormularioAdicionar from "@/components/FormularioAdicionar";
import BotaoGoogleCalendar from "@/components/BotaoGoogleCalendar";
import "./page.css";

export default function App() {
  const [eventos, setEventos] = useState([]);
  const [NomeEvt, setNomeEvt] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Data, setData] = useState("");
  const [Local, setLocal] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  async function carregarEventos() {
    const eventosTemp = await getEventos();
    setEventos(eventosTemp);
  }

  async function adicionarEvento() {
    if (!NomeEvt.trim()) {
      alert("Preencha o campo Nome do Evento");
      return;
    }

    const novoEvento = await addEvento({
      NomeEvt,
      Descricao,
      Data: {
        __type: "Date",
        iso: new Date(Data).toISOString(),
      },
      Local,
      Status: true,
    });

    if (novoEvento) {
      setNomeEvt("");
      setDescricao("");
      setData("");
      setLocal("");
      await carregarEventos();
    }
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <>
      <Header />

      <div className="titulo my-4">
        <h3 className="text-xl">Lista de eventos</h3>
      </div>

      <div className="conteiner">
        <div
          className="floating-button"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          +
        </div>

        {mostrarFormulario && (
          <FormularioAdicionar
            NomeEvt={NomeEvt}
            setNomeEvt={setNomeEvt}
            Descricao={Descricao}
            setDescricao={setDescricao}
            Data={Data}
            setData={setData}
            Local={Local}
            setLocal={setLocal}
            adicionarEvento={adicionarEvento}
            onClose={() => setMostrarFormulario(false)}
          />
        )}

      <ul className="lista-eventos">
        {eventos.map((evento) => (
          <li key={evento.objectId} className="border-b pb-2">
            <Eventos
              evento={evento}
              onDeleteClick={async () => {
                const eventoDeletado = await deleteEvento(evento);
                if (eventoDeletado) carregarEventos();
              }}
            />
            <BotaoGoogleCalendar evento={evento} />
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { addEvento, getEventos, deleteEvento } from "../api";
import "./page.css";
import Header from "@/components/Header";
import Eventos from "@/components/Eventos";

export function App() {
  const [eventos, setEventos] = useState([]);
  const [NomeEvt, setNomeEvt] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Data, setData] = useState(""); // Tipo date
  const [Local, setLocal] = useState("");
  const [Status, setStatus] = useState(false);

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
        iso: new Date(Data).toISOString(), // Garante que a data esteja no formato aceito
      },
      Local,
      Status: true,
    });

    if (novoEvento) {
      console.log("Evento adicionado:", novoEvento);
      setNomeEvt("");
      setDescricao("");
      setData("");
      setLocal("");
      setStatus(false);
      await carregarEventos();
    }
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <>
      <Header />
      <div className="conteiner">
        <p>
          <input
            placeholder="Nome do Evento"
            value={NomeEvt}
            onChange={(evt) => setNomeEvt(evt.target.value)}
          />
          <input
            placeholder="Descrição"
            value={Descricao}
            onChange={(evt) => setDescricao(evt.target.value)}
          />
          <input
            type="date"
            placeholder="Data"
            value={Data}
            onChange={(evt) => setData(evt.target.value)}
          />
          <input
            placeholder="Local"
            value={Local}
            onChange={(evt) => setLocal(evt.target.value)}
          />
          <button onClick={adicionarEvento}>Adicionar</button>
        </p>

        <ul className="lista-eventos">
          {eventos.map((evento) => (
            <Eventos
              key={evento.objectId}
              evento={evento}
              onDeleteClick={async () => {
                const eventoDeletado = await deleteEvento(evento);
                console.log("eventoDeletado", eventoDeletado);
                if (eventoDeletado) {
                  carregarEventos();
                }
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

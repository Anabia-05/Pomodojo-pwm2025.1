"use client";

import { useEffect, useState } from "react";
import { addEvento, getEventos, deleteEvento } from "../api";
import "./page.css";
import Header from "@/components/Header";
import Eventos from "@/components/Eventos";
import FormularioAdicionar from "@/components/FormularioAdicionar";

export function App() {
  const [eventos, setEventos] = useState([]);
  const [NomeEvt, setNomeEvt] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Data, setData] = useState("");
  const [Local, setLocal] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
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
        iso: new Date(Data).toISOString(),
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
            onClose={() => setMostrarFormulario(false)} // <- aqui a mágica
          />
        )}

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

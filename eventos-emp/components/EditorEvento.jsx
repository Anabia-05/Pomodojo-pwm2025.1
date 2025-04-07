"use client";

import { useState } from "react";
import { updateEvento } from "@/app/api";

export default function EditorEvento({ evento, onEventoAtualizado }) {
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [novoValor, setNovoValor] = useState("");
  const [atualizando, setAtualizando] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  const iniciarEdicao = (campo) => {
    setEditandoCampo(campo);

    if (campo === "Data") {
      const dataFormatada = evento.Data?.iso?.split("T")[0] || "";
      setNovoValor(dataFormatada);
    } else if (campo === "Status") {
      setNovoValor(evento.Status);
    } else {
      setNovoValor(evento[campo] || "");
    }
  };

  const salvarCampo = async () => {
    const dadosAtualizados = { ...evento };

    if (editandoCampo === "Data") {
      dadosAtualizados.Data = {
        __type: "Date",
        iso: new Date(`${novoValor}T00:00:00`).toISOString(),
      };
    } else if (editandoCampo === "Status") {
      dadosAtualizados.Status = novoValor;
    } else {
      dadosAtualizados[editandoCampo] = novoValor;
    }

    setAtualizando(true);
    const atualizado = await updateEvento(dadosAtualizados);

    if (atualizado) {
      onEventoAtualizado(atualizado);
      setEditandoCampo(null);
      setNovoValor("");
    }

    setAtualizando(false);
  };

  return (
    <>
      <button onClick={() => setModoEdicao(!modoEdicao)}>
        {modoEdicao ? "Cancelar Edição" : "Editar Evento"}
      </button>

      {modoEdicao && (
        <ul style={{ marginTop: "1rem" }}>
          <li>
            <strong>Nome:</strong>{" "}
            {editandoCampo === "NomeEvt" ? (
              <>
                <input
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                />
                <button onClick={salvarCampo} disabled={atualizando}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                {evento.NomeEvt}{" "}
                <button onClick={() => iniciarEdicao("NomeEvt")}>Editar</button>
              </>
            )}
          </li>

          <li>
            <strong>Descrição:</strong>{" "}
            {editandoCampo === "Descricao" ? (
              <>
                <input
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                />
                <button onClick={salvarCampo} disabled={atualizando}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                {evento.Descricao}{" "}
                <button onClick={() => iniciarEdicao("Descricao")}>
                  Editar
                </button>
              </>
            )}
          </li>

          <li>
            <strong>Data:</strong>{" "}
            {editandoCampo === "Data" ? (
              <>
                <input
                  type="date"
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                />
                <button onClick={salvarCampo} disabled={atualizando}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                {new Date(evento.Data.iso).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}{" "}
                <button onClick={() => iniciarEdicao("Data")}>Editar</button>
              </>
            )}
          </li>

          <li>
            <strong>Local:</strong>{" "}
            {editandoCampo === "Local" ? (
              <>
                <input
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                />
                <button onClick={salvarCampo} disabled={atualizando}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                {evento.Local}{" "}
                <button onClick={() => iniciarEdicao("Local")}>Editar</button>
              </>
            )}
          </li>

          <li>
            <strong>Status:</strong>{" "}
            {editandoCampo === "Status" ? (
              <>
                <select
                  value={novoValor ? "ativo" : "inativo"}
                  onChange={(e) => setNovoValor(e.target.value === "ativo")}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
                <button onClick={salvarCampo} disabled={atualizando}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                {evento.Status ? "Ativo" : "Inativo"}{" "}
                <button onClick={() => iniciarEdicao("Status")}>Editar</button>
              </>
            )}
          </li>
        </ul>
      )}
    </>
  );
}

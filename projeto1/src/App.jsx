import { useEffect, useState } from "react";
import { addFilmes, getFilmes,deleteFilme } from "./api";

import Header from "./components/Header";
import { Filmes } from "./components/Filmes";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [NomeFilme, setNomeF] = useState("");
  const [Comentario, setComentario] = useState("");
  const [Avaliacao, setAvaliacao] = useState(0); // Deve ser um número
  const [Assistido, setAssistido] = useState(false); // Adicionado

  async function carregarFilme() {
    const filmesTemp = await getFilmes();
    setFilmes(filmesTemp);
  }

  async function adicionarFilme() {
    if (!NomeFilme.trim()) {
      alert("Preencha o campo Nome Filme");
      return;
    }

    const novoFilme = await addFilmes({ NomeFilme, Comentario, Assistido, Avaliacao });
    if (novoFilme) {
      console.log("Filme adicionado:", novoFilme);
      setNomeF("");
      setComentario("");
      setAvaliacao();
      setAssistido(false);
      await carregarFilme();
    }
  }

  useEffect(() => {
    carregarFilme();
  }, []);

  return (
    <>
      <Header />
      <p>
        <input
          placeholder="Nome do Filme"
          value={NomeFilme}
          onChange={(evt) => setNomeF(evt.target.value)}
        />
        <input
          placeholder="Comentário"
          value={Comentario}
          onChange={(evt) => setComentario(evt.target.value)}
        />
        <input
          type="number"
          placeholder="Avaliação (0-5)"
          value={Avaliacao}
          onChange={(evt) => setAvaliacao(evt.target.valueAsNumber || 0)}
        />
        <label>
          <input
            type="checkbox"
            checked={Assistido}
            onChange={(evt) => setAssistido(evt.target.checked)}
          />
          Assistido
        </label>
        <button onClick={adicionarFilme}>Adicionar</button>
      </p>

      <ul>
        {filmes.map((filme) => (
          <Filmes key={filme.objectId} filme={filme} 
          onDeleteClick={async () => {
            const filmeDeletado = await deleteFilme(filme);
            console.log("filmeDeletado", filmeDeletado);
            if (filmeDeletado) {
              carregarFilme();
            }
          }}/>
        ))}
      </ul>
    </>
  );
}

export default App;

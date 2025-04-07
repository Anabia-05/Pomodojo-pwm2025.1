const FormularioAdicionar = ({
    NomeEvt,
    setNomeEvt,
    Descricao,
    setDescricao,
    Data,
    setData,
    Local,
    setLocal,
    adicionarEvento,
  }) => {
    return (
      <div className="formulario-adicionar">
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
      </div>
    );
  };

export default FormularioAdicionar;
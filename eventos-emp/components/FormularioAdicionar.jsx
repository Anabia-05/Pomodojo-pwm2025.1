import "./FormularioAdicionar.css";

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
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="fechar-modal" onClick={onClose}>
          ×
        </button>
        <h2>Adicionar Evento</h2>
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
          value={Data}
          onChange={(evt) => setData(evt.target.value)}
        />
        <input
          placeholder="Local"
          value={Local}
          onChange={(evt) => setLocal(evt.target.value)}
        />
        <div className="botaoAdicionar">
          <button
            className="adicionar"
            onClick={() => {
              adicionarEvento();
              onClose();
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioAdicionar;

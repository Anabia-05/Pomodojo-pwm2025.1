export function Eventos({ evento, onDeleteClick }) {
    return (
        <li className="evento-item">
            <strong>{evento.NomeEvt}</strong>  
            {evento.Descricao && <> - {evento.Descricao}</>}  
            ({evento.Status ? " Ativo" : " Inativo"})  
            <button className="butao-escluir" onClick={onDeleteClick}>X</button>
        </li>
    );
}
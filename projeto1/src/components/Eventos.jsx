export function Eventos({ evento, onDeleteClick }) {
    return (
        <li>
            <strong>{evento.NomeEvt}</strong>  
            {evento.Descricao && <> - {evento.Descricao}</>}  
            ({evento.Status ? " Ativo" : " Inativo"})  
            <button onClick={onDeleteClick}>X</button>
        </li>
    );
}
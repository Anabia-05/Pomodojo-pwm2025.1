export function Filmes({ filme ,onDeleteClick}) {
    return (
        <li>
            <strong>{filme.NomeFilme}</strong>  
            {filme.Comentario && <> - {filme.Comentario}</>}  
            ({filme.Assistido ? " Assistido" : " A ser assistido"})  
            {filme.Avaliacao !== undefined && <> ⭐ {filme.Avaliacao}/5</>}
            <button onClick={onDeleteClick}>X</button>
        </li>


    );
  }
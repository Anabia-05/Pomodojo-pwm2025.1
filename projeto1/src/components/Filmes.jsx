export function Filmes({ filme }) {
    return (
        <li>
            <strong>{filme.NomeFilme}</strong>  
            {filme.Comentario && <> - {filme.Comentario}</>}  
            ({filme.Assistido ? " Assistido" : " A ser assistido"})  
            {filme.Avaliacao !== undefined && <> ⭐ {filme.Avaliacao}/5</>}
        </li>


    );
  }
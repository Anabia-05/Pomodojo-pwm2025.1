import Link from "next/link";

export default function Eventos({ evento, onDeleteClick }) {
  return (
    <li>
      <div className="eventos">
        <Link href={`/eventos/${evento.objectId}`}>
          <strong>{evento.NomeEvt}</strong>
        </Link>
        <img className="lixeira" src="/lixeira.png" alt="Excluir" onClick={onDeleteClick}/>
      </div>
    </li>
  );
}

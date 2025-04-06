import Link from "next/link";

export default function Eventos({ evento, onDeleteClick }) {
  return (
    <li>
      <Link href={`/eventos/${evento.objectId}`}>
        <strong>{evento.NomeEvt}</strong>
      </Link>
      <button onClick={onDeleteClick}>X</button>
    </li>
  );
}

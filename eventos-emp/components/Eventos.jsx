import Link from "next/link";


export default function Eventos({ evento, onDeleteClick }) {
    return (
        <li>
            <Link href={`/app/${evento.objectID}`}>
              <strong>{evento.NomeEvt}</strong>
            </Link>
        </li>
        
    );
}
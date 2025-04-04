export function Eventos({ evento, onDeleteClick }) {
    return (
        <Link href={`/app/${evento.objectID}`}>
              <strong>{evento.NomeEvt}</strong>
        </Link>
    );
}
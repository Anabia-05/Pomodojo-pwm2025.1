import "./page.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <span className="icone" style={{ "--i": 13 }}></span>
      <span className="icone" style={{ "--i": 29 }}></span>
      <span className="icone" style={{ "--i": 7 }}></span>
      <span className="icone" style={{ "--i": 22 }}></span>
      <span className="icone" style={{ "--i": 41 }}></span>
      <span className="icone" style={{ "--i": 18 }}></span>
      <span className="icone" style={{ "--i": 35 }}></span>
      <span className="icone" style={{ "--i": 50 }}></span>
      <span className="icone" style={{ "--i": 4 }}></span>
      <span className="icone" style={{ "--i": 27 }}></span>
      <span className="icone" style={{ "--i": 63 }}></span>
      <span className="icone" style={{ "--i": 81 }}></span>
      <span className="icone" style={{ "--i": 56 }}></span>
      <span className="icone" style={{ "--i": 12 }}></span>
      <span className="icone" style={{ "--i": 37 }}></span>
      <span className="icone" style={{ "--i": 64 }}></span>
      <span className="icone" style={{ "--i": 20 }}></span>
      <span className="icone" style={{ "--i": 48 }}></span>
      <span className="icone" style={{ "--i": 39 }}></span>
      <span className="icone" style={{ "--i": 55 }}></span>
      <span className="icone" style={{ "--i": 49 }}></span>
      <span className="icone" style={{ "--i": 25 }}></span>
      <span className="icone" style={{ "--i": 31 }}></span>
      <span className="icone" style={{ "--i": 9 }}></span>
      <span className="icone" style={{ "--i": 72 }}></span>

      <div className="conteudo">
        <h2>Bem vindo ao</h2>
        <h1>Gerenciador de Eventos</h1>
        <h2>da sua empresa!</h2>

        <div className="acessar">
          <button>
            <Link href="/eventos">Acessar</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link"

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="mb-4">Dia D Carreiras - COTEMIG</h1>
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title mb-4">Sistema de Check-in</h2>
              <p className="card-text mb-4">
                Bem-vindo ao sistema de check-in do evento Dia D Carreiras. Utilize este sistema para verificar a
                inscrição dos alunos nas palestras.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link href="/checkin" className="btn btn-primary btn-lg">
                  Realizar Check-in
                </Link>
                <Link href="/admin" className="btn btn-outline-secondary btn-lg">
                  Área Administrativa
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3>Informações do Evento</h3>
            <p className="text-muted">
              Dia D Carreiras no Colégio COTEMIG — evento com palestras, oficinas e atividades focadas em carreira,
              mercado de trabalho, processos seletivos e muito mais!
            </p>
            <p className="text-muted">Data: 20 de maio | Local: Unidade Barroca</p>
          </div>
        </div>
      </div>
    </div>
  )
}

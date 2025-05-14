"use client"

import type React from "react"

import { useState } from "react"
import { Alert, Spinner } from "react-bootstrap"
import Link from "next/link"

export default function AdminPage() {
  const [symplaToken, setSymplaToken] = useState("")
  const [symplaEventId, setSymplaEventId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    count?: number
  } | null>(null)

  const handleImportFromSympla = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!symplaToken || !symplaEventId) {
      setResult({
        success: false,
        message: "Token e ID do evento são obrigatórios",
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/sympla/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: symplaToken,
          eventId: symplaEventId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          count: data.importedCount,
        })
      } else {
        setResult({
          success: false,
          message: data.message || "Erro ao importar dados do Sympla",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao conectar com o servidor. Tente novamente.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0 fs-4">Painel Administrativo</h2>
              <Link href="/" className="btn btn-sm btn-light">
                Voltar para Início
              </Link>
            </div>
            <div className="card-body p-4">
              <h3 className="mb-4">Importar Dados do Sympla</h3>

              {result && (
                <Alert variant={result.success ? "success" : "danger"} className="mb-4">
                  {result.message}
                  {result.success && result.count && (
                    <p className="mb-0 mt-2">
                      <strong>{result.count}</strong> inscrições foram importadas com sucesso.
                    </p>
                  )}
                </Alert>
              )}

              <form onSubmit={handleImportFromSympla}>
                <div className="mb-3">
                  <label htmlFor="symplaToken" className="form-label">
                    Token de API do Sympla
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="symplaToken"
                    value={symplaToken}
                    onChange={(e) => setSymplaToken(e.target.value)}
                    placeholder="Seu token de API do Sympla"
                    required
                  />
                  <div className="form-text">
                    Você pode obter seu token de API nas configurações da sua conta Sympla.
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="symplaEventId" className="form-label">
                    ID do Evento no Sympla
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="symplaEventId"
                    value={symplaEventId}
                    onChange={(e) => setSymplaEventId(e.target.value)}
                    placeholder="Ex: 123456"
                    required
                  />
                  <div className="form-text">O ID do evento pode ser encontrado na URL do seu evento no Sympla.</div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Importando dados...
                      </>
                    ) : (
                      "Importar Inscrições do Sympla"
                    )}
                  </button>
                </div>
              </form>

              <hr className="my-4" />

              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Gerenciar Palestras</h5>
                      <p className="card-text">Adicione, edite ou remova palestras do evento.</p>
                      <Link href="/admin/palestras" className="btn btn-outline-primary">
                        Gerenciar Palestras
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Relatórios de Presença</h5>
                      <p className="card-text">Visualize relatórios de presença por palestra.</p>
                      <Link href="/admin/relatorios" className="btn btn-outline-primary">
                        Ver Relatórios
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

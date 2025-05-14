"use client"

import { useState } from "react"
import { palestras } from "@/data/palestras"

interface CheckinResultProps {
  studentName: string
  palestraId: string
}

export default function CheckinResult({ studentName, palestraId }: CheckinResultProps) {
  const [confirmado, setConfirmado] = useState(false)
  const [loading, setLoading] = useState(false)

  const palestra = palestras.find((p) => p.id === palestraId)

  const handleConfirmarPresenca = async () => {
    setLoading(true)

    try {
      // Simular uma chamada de API para confirmar presença
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setConfirmado(true)
    } catch (error) {
      console.error("Erro ao confirmar presença:", error)
    } finally {
      setLoading(false)
    }
  }

  if (confirmado) {
    return (
      <div
        className="mt-4 p-4 border rounded"
        style={{ borderColor: "#40AA0B", backgroundColor: "rgba(64, 170, 11, 0.1)" }}
      >
        <h4 style={{ color: "#40AA0B" }}>Presença Confirmada!</h4>
        <p>
          A presença de <strong>{studentName}</strong> foi confirmada na palestra:
          <br />
          <strong>{palestra?.titulo}</strong>
        </p>
        <p className="mb-0 text-muted">Um registro desta confirmação foi salvo no sistema.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 p-4 border rounded bg-light">
      <h4>Aluno Verificado</h4>
      <p>
        O aluno <strong>{studentName}</strong> está inscrito na palestra:
        <br />
        <strong>{palestra?.titulo}</strong>
      </p>

      <div className="d-grid mt-3">
        <button className="btn btn-success" onClick={handleConfirmarPresenca} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processando...
            </>
          ) : (
            "Confirmar Presença"
          )}
        </button>
      </div>
    </div>
  )
}

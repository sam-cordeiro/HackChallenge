"use client"

import type React from "react"

import { useState } from "react"

interface CheckinFormProps {
  onSubmit: (email: string) => void
  loading: boolean
}

export default function CheckinForm({ onSubmit, loading }: CheckinFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica de email
    if (!email.trim()) {
      setError("Por favor, insira um email.")
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, insira um email válido.")
      return
    }

    setError("")
    onSubmit(email.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold">
          Email do Aluno:
        </label>
        <input
          type="email"
          className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
          id="email"
          placeholder="aluno@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        {error && <div className="invalid-feedback">{error}</div>}
        <div className="form-text">Insira o email utilizado na inscrição do evento.</div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Verificando...
            </>
          ) : (
            "Verificar Inscrição"
          )}
        </button>
      </div>
    </form>
  )
}

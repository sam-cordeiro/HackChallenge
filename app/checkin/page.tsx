"use client"

import { useState } from "react"
import { Alert } from "react-bootstrap"
import PalestraSelector from "@/components/palestra-selector"
import CheckinForm from "@/components/checkin-form"
import CheckinResult from "@/components/checkin-result"

export default function CheckinPage() {
  const [palestaSelecionada, setPalestraSelecionada] = useState("")
  const [resultado, setResultado] = useState<{
    success: boolean
    message: string
    studentName?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePalestraChange = (palestra: string) => {
    setPalestraSelecionada(palestra)
    setResultado(null)
  }

  const handleSubmit = async (email: string) => {
    if (!palestaSelecionada) {
      setResultado({
        success: false,
        message: "Por favor, selecione uma palestra primeiro.",
      })
      return
    }

    setLoading(true)
    setResultado(null)

    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          palestraId: palestaSelecionada,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResultado({
          success: true,
          message: data.message,
          studentName: data.name,
        })
      } else {
        setResultado({
          success: false,
          message: data.message,
        })
      }
    } catch (error) {
      setResultado({
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
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0 fs-4">Check-in de Palestras</h2>
            </div>
            <div className="card-body p-4">
              {resultado && (
                <Alert variant={resultado.success ? "success" : "danger"} className="mb-4">
                  {resultado.message}
                </Alert>
              )}

              <PalestraSelector selectedPalestra={palestaSelecionada} onPalestraChange={handlePalestraChange} />

              {palestaSelecionada && <CheckinForm onSubmit={handleSubmit} loading={loading} />}

              {resultado?.success && resultado.studentName && (
                <CheckinResult studentName={resultado.studentName} palestraId={palestaSelecionada} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

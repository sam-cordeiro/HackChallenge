"use client"

import { palestras } from "@/data/palestras"

interface PalestraSelectorProps {
  selectedPalestra: string
  onPalestraChange: (palestra: string) => void
}

export default function PalestraSelector({ selectedPalestra, onPalestraChange }: PalestraSelectorProps) {
  return (
    <div className="mb-4">
      <label htmlFor="palestra" className="form-label fw-bold">
        Selecione a Palestra para Check-in:
      </label>
      <select
        id="palestra"
        className="form-select form-select-lg"
        value={selectedPalestra}
        onChange={(e) => onPalestraChange(e.target.value)}
      >
        <option value="">-- Selecione uma palestra --</option>
        {palestras.map((palestra) => (
          <option key={palestra.id} value={palestra.id}>
            {palestra.titulo} - {palestra.horario} - {palestra.local}
          </option>
        ))}
      </select>

      {selectedPalestra && (
        <div className="mt-3 p-3 bg-light rounded">
          <h5>Informações da Palestra:</h5>
          {palestras.find((p) => p.id === selectedPalestra) && (
            <>
              <p className="mb-1">
                <strong>Título:</strong> {palestras.find((p) => p.id === selectedPalestra)?.titulo}
              </p>
              <p className="mb-1">
                <strong>Palestrante:</strong> {palestras.find((p) => p.id === selectedPalestra)?.palestrante}
              </p>
              <p className="mb-1">
                <strong>Local:</strong> {palestras.find((p) => p.id === selectedPalestra)?.local}
              </p>
              <p className="mb-0">
                <strong>Horário:</strong> {palestras.find((p) => p.id === selectedPalestra)?.horario}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

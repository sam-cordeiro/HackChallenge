// Simulação de um banco de dados de inscrições
export interface Inscricao {
  id: string
  alunoId: string
  palestraId: string
  dataInscricao: string
  presenca?: boolean
}

export const inscricoes: Inscricao[] = [
  {
    id: "i1",
    alunoId: "a1",
    palestraId: "p1",
    dataInscricao: "2023-05-10T14:30:00Z",
  },
  {
    id: "i2",
    alunoId: "a1",
    palestraId: "p3",
    dataInscricao: "2023-05-10T14:35:00Z",
  },
  {
    id: "i3",
    alunoId: "a2",
    palestraId: "p2",
    dataInscricao: "2023-05-11T09:15:00Z",
  },
  {
    id: "i4",
    alunoId: "a2",
    palestraId: "p4",
    dataInscricao: "2023-05-11T09:20:00Z",
  },
  {
    id: "i5",
    alunoId: "a3",
    palestraId: "p1",
    dataInscricao: "2023-05-12T16:45:00Z",
  },
  {
    id: "i6",
    alunoId: "a3",
    palestraId: "p5",
    dataInscricao: "2023-05-12T16:50:00Z",
  },
  {
    id: "i7",
    alunoId: "a4",
    palestraId: "p3",
    dataInscricao: "2023-05-13T11:20:00Z",
  },
  {
    id: "i8",
    alunoId: "a4",
    palestraId: "p5",
    dataInscricao: "2023-05-13T11:25:00Z",
  },
  {
    id: "i9",
    alunoId: "a5",
    palestraId: "p2",
    dataInscricao: "2023-05-14T14:10:00Z",
  },
  {
    id: "i10",
    alunoId: "a5",
    palestraId: "p4",
    dataInscricao: "2023-05-14T14:15:00Z",
  },
]

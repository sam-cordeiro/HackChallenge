export interface Aluno {
  id: string
  nome: string
  email: string
  turma: string
}

export const alunos: Aluno[] = [
  {
    id: "a1",
    nome: "João Silva",
    email: "joao.silva@aluno.cotemig.com.br",
    turma: "3º Ano - Desenvolvimento",
  },
  {
    id: "a2",
    nome: "Maria Oliveira",
    email: "maria.oliveira@aluno.cotemig.com.br",
    turma: "2º Ano - Redes",
  },
  {
    id: "a3",
    nome: "Pedro Santos",
    email: "pedro.santos@aluno.cotemig.com.br",
    turma: "3º Ano - Desenvolvimento",
  },
  {
    id: "a4",
    nome: "Ana Costa",
    email: "ana.costa@aluno.cotemig.com.br",
    turma: "1º Ano - Desenvolvimento",
  },
  {
    id: "a5",
    nome: "Lucas Ferreira",
    email: "lucas.ferreira@aluno.cotemig.com.br",
    turma: "2º Ano - Desenvolvimento",
  },
  {
    id: "a6",
    nome: "Juliana Martins",
    email: "juliana@teste.com",
    turma: "3º Ano - Redes",
  },
]

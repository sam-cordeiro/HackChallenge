import { type NextRequest, NextResponse } from "next/server"
import { alunos } from "@/data/alunos"
import { inscricoes } from "@/data/inscricoes"
import { palestras } from "@/data/palestras"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, palestraId } = body

    if (!email || !palestraId) {
      return NextResponse.json({ message: "Email e ID da palestra são obrigatórios" }, { status: 400 })
    }

    // Verificar se a palestra existe
    const palestra = palestras.find((p) => p.id === palestraId)
    if (!palestra) {
      return NextResponse.json({ message: "Palestra não encontrada" }, { status: 404 })
    }

    // Buscar aluno pelo email
    const aluno = alunos.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!aluno) {
      return NextResponse.json({ message: "Aluno não encontrado. Verifique se o email está correto." }, { status: 404 })
    }

    // Verificar se o aluno está inscrito na palestra
    const inscricao = inscricoes.find((i) => i.alunoId === aluno.id && i.palestraId === palestraId)

    if (!inscricao) {
      return NextResponse.json(
        {
          message: `${aluno.nome} não está inscrito nesta palestra. Por favor, verifique se selecionou a palestra correta.`,
        },
        { status: 404 },
      )
    }

    // Se chegou até aqui, o aluno está inscrito na palestra
    return NextResponse.json({
      message: `Inscrição verificada com sucesso!`,
      name: aluno.nome,
      turma: aluno.turma,
      inscricaoId: inscricao.id,
    })
  } catch (error) {
    console.error("Erro ao processar check-in:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

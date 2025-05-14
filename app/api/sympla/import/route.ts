import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { alunos } from "@/data/alunos"
import { inscricoes } from "@/data/inscricoes"
import { palestras } from "@/data/palestras"

// Interface para os dados recebidos da API do Sympla
interface SymplaParticipant {
  id: string
  first_name: string
  last_name: string
  email: string
  order: {
    id: string
    status: string
  }
  ticket: {
    id: string
    name: string // Podemos usar isso para mapear para a palestra
  }
}

// Mapeamento de nomes de ingressos do Sympla para IDs de palestras
const ticketToPalestraMap: Record<string, string> = {
  "Carreira em Desenvolvimento Web": "p1",
  "Inteligência Artificial e o Futuro do Trabalho": "p2",
  "Como se Preparar para Processos Seletivos": "p3",
  "Empreendedorismo Digital": "p4",
  "Soft Skills para o Mercado de Trabalho": "p5",
}

export async function POST(request: NextRequest) {
  try {
    const { token, eventId } = await request.json()

    if (!token || !eventId) {
      return NextResponse.json({ message: "Token e ID do evento são obrigatórios" }, { status: 400 })
    }

    // Em um ambiente real, faríamos uma chamada para a API do Sympla
    // Aqui vamos simular a resposta da API para demonstração
    const symplaParticipants = await fetchSymplaParticipants(token, eventId)

    // Processar os participantes e criar inscrições
    const importedCount = await processSymplaParticipants(symplaParticipants)

    return NextResponse.json({
      message: "Dados importados com sucesso do Sympla!",
      importedCount,
    })
  } catch (error) {
    console.error("Erro ao importar dados do Sympla:", error)
    return NextResponse.json({ message: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

// Função que simula a chamada à API do Sympla
// Em um ambiente real, esta função faria uma requisição HTTP para a API do Sympla
async function fetchSymplaParticipants(token: string, eventId: string): Promise<SymplaParticipant[]> {
  // Simulação de dados da API do Sympla
  // Em produção, você faria algo como:
  // const response = await fetch(`https://api.sympla.com.br/public/v3/events/${eventId}/participants`, {
  //   headers: {
  //     'S_TOKEN': token
  //   }
  // });
  // return await response.json();

  // Dados simulados para demonstração
  return [
    {
      id: "sym1",
      first_name: "Rafael",
      last_name: "Gomes",
      email: "rafael.gomes@aluno.cotemig.com.br",
      order: {
        id: "ord1",
        status: "approved",
      },
      ticket: {
        id: "tick1",
        name: "Carreira em Desenvolvimento Web",
      },
    },
    {
      id: "sym2",
      first_name: "Rafael",
      last_name: "Gomes",
      email: "rafael.gomes@aluno.cotemig.com.br",
      order: {
        id: "ord2",
        status: "approved",
      },
      ticket: {
        id: "tick2",
        name: "Empreendedorismo Digital",
      },
    },
    {
      id: "sym3",
      first_name: "Camila",
      last_name: "Ferreira",
      email: "camila.ferreira@aluno.cotemig.com.br",
      order: {
        id: "ord3",
        status: "approved",
      },
      ticket: {
        id: "tick3",
        name: "Inteligência Artificial e o Futuro do Trabalho",
      },
    },
    {
      id: "sym4",
      first_name: "Camila",
      last_name: "Ferreira",
      email: "camila.ferreira@aluno.cotemig.com.br",
      order: {
        id: "ord4",
        status: "approved",
      },
      ticket: {
        id: "tick4",
        name: "Soft Skills para o Mercado de Trabalho",
      },
    },
  ]
}

// Função para processar os participantes do Sympla e criar inscrições
async function processSymplaParticipants(participants: SymplaParticipant[]): Promise<number> {
  let importedCount = 0

  for (const participant of participants) {
    // Verificar se o ingresso corresponde a uma palestra
    const palestraId = ticketToPalestraMap[participant.ticket.name]
    if (!palestraId) continue

    // Verificar se a palestra existe
    const palestraExists = palestras.some((p) => p.id === palestraId)
    if (!palestraExists) continue

    // Verificar se o aluno já existe, caso contrário, criar
    let aluno = alunos.find((a) => a.email.toLowerCase() === participant.email.toLowerCase())

    if (!aluno) {
      // Criar novo aluno
      const novoAluno = {
        id: `a${alunos.length + 1}`,
        nome: `${participant.first_name} ${participant.last_name}`,
        email: participant.email,
        turma: "Importado do Sympla", // Informação padrão para alunos importados
      }

      alunos.push(novoAluno)
      aluno = novoAluno
    }

    // Verificar se a inscrição já existe
    const inscricaoExiste = inscricoes.some((i) => i.alunoId === aluno!.id && i.palestraId === palestraId)

    if (!inscricaoExiste) {
      // Criar nova inscrição
      const novaInscricao = {
        id: `i${inscricoes.length + 1}`,
        alunoId: aluno.id,
        palestraId: palestraId,
        dataInscricao: new Date().toISOString(),
      }

      inscricoes.push(novaInscricao)
      importedCount++
    }
  }

  return importedCount
}

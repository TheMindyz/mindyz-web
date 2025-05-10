'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas'>('inicio')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)
  const [nome, setNome] = useState<string>('')

  const handleChange = (index: number, value: number) => {
    const novasRespostas = [...respostas]
    novasRespostas[index] = value
    setRespostas(novasRespostas)
  }

  const calcularPerfil = () => {
    const soma = respostas.reduce((a, b) => a + b, 0)
    if (soma < 12) return 'Empático'
    if (soma < 20) return 'Guardião'
    if (soma < 28) return 'Estratégico'
    return 'Pioneiro'
  }

  const getDescricaoPerfil = (perfil: string) => {
    const descricoes: Record<string, string> = {
      'Empático': 'Você tem uma grande sensibilidade emocional, valoriza conexões humanas e está sempre pronto para apoiar quem precisa. Seu poder está na escuta e no acolhimento.',
      'Guardião': 'Você é leal, confiável e organizado. Gosta de proteger o que é importante e se dedica com responsabilidade às suas tarefas. Um verdadeiro pilar para qualquer equipe.',
      'Estratégico': 'Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência. Seu raciocínio lógico e visão tática te destacam.',
      'Pioneiro': 'Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade. Seu espírito criativo e ousado inspira mudanças.'
    }
    return descricoes[perfil] || ''
  }

  const handleFinalizar = () => {
    const resultado = calcularPerfil()
    setPerfil(resultado)
    setStep('resultado')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {/* Etapa 1: Início */}
      {step === 'inicio' && (
        <section className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-zinc-300">Descubra seu perfil e desbloqueie seu potencial.</p>
          <button
            onClick={() => setStep('cadastro')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Começar
          </button>
        </section>
      )}

      {/* Etapa 2: Cadastro */}
      {step === 'cadastro' && (
        <section className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Cadastro</h2>
          <input
            type="text"
            placeholder="Digite seu nome"
            className="p-2 w-full rounded text-black"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button
            onClick={() => setStep('autoconhecimento')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Avançar
          </button>
        </section>
      )}

      {/* Etapa 3: Autoconhecimento */}
      {step === 'autoconhecimento' && (
        <section className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Autoconhecimento</h2>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2 text-zinc-300">Pergunta {index + 1}</p>
              <input
                type="range"
                min="0"
                max="5"
                value={respostas[index]}
                onChange={(e) => handleChange(index, parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-zinc-400">Valor: {respostas[index]}</p>
            </div>
          ))}
          <button
            onClick={handleFinalizar}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Ver resultado
          </button>
        </section>
      )}

      {/* Etapa 4: Resultado */}
      {step === 'resultado' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold text-green-400">Seu perfil é: {perfil}</h2>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <button
            onClick={() => setStep('boasVindas')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Acessar Funções Especiais
          </button>
        </section>
      )}

      {/* Etapa 5: Boas-vindas */}
      {step === 'boasVindas' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Boas-vindas, {nome || perfil}!</h2>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <div className="space-y-4 text-left text-zinc-300">
            <h3 className="text-green-400 font-semibold text-xl">Funções Disponíveis:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Acessar trilhas de autodesenvolvimento</li>
              <li>Marcar sessões com psicólogos parceiros</li>
              <li>Receber mensagens motivacionais diárias</li>
              <li>Entrar na comunidade exclusiva Jovify</li>
              <li>Receber conteúdos personalizados pelo seu perfil</li>
            </ul>
          </div>
          <button
            onClick={() => alert('Você será redirecionado para a tela inicial do app com todas as funções ativas!')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Ir para a Página Inicial
          </button>
        </section>
      )}
    </main>
  )
}

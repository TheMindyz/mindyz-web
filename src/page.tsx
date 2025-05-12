'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<
    'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhes' | 'psicologo'
  >('inicio')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [senha, setSenha] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)

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
    switch (perfil) {
      case 'Empático':
        return 'Você tem uma grande sensibilidade emocional, valoriza conexões humanas e está sempre pronto para apoiar quem precisa. Seu poder está na escuta e no acolhimento.'
      case 'Guardião':
        return 'Você é leal, confiável e organizado. Gosta de proteger o que é importante e se dedica com responsabilidade às suas tarefas. Um verdadeiro pilar para qualquer equipe.'
      case 'Estratégico':
        return 'Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência. Seu raciocínio lógico e visão tática te destacam.'
      case 'Pioneiro':
        return 'Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade. Seu espírito criativo e ousado inspira mudanças.'
      default:
        return ''
    }
  }

  const perguntas = [
    'Você se considera uma pessoa comunicativa?',
    'Costuma planejar com antecedência suas tarefas?',
    'Consegue entender facilmente os sentimentos dos outros?',
    'Gosta de assumir a liderança em projetos?',
    'Você prefere estabilidade ou mudanças constantes?',
    'Tem facilidade em resolver problemas de forma lógica?',
    'Valoriza relações profundas e sinceras?',
    'Sente-se motivado por desafios e inovação?'
  ]

  const enviarRespostas = () => {
    const perfilCalculado = calcularPerfil()
    setPerfil(perfilCalculado)
    setStep('resultado')
  }

  const BotaoVoltar = ({ voltarPara }: { voltarPara: typeof step }) => (
    <button
      onClick={() => setStep(voltarPara)}
      className="bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-4 rounded transition mb-4"
    >
      ← Voltar
    </button>
  )

  const Dica = ({ titulo, conteudo }: { titulo: string, conteudo: string }) => (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
      <h4 className="text-green-400 font-semibold text-lg">{titulo}</h4>
      <p className="text-zinc-300">{conteudo}</p>
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Mindzy</h1>
          <p className="text-zinc-300 text-xl font-medium">Onde cada geração encontra seu propósito.</p>
          <button onClick={() => setStep('cadastro')} className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-6 rounded transition">
  Entrar com convite / Pedir acesso
</button>
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
            <a href="https://www.instagram.com/themindyz/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Instagram</a>
            <a href="https://youtube.com/@thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">YouTube</a>
            <a href="mailto:sacjovify@gmail.com" className="hover:text-green-400">Email</a>
            <a href="https://tiktok.com/@thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">TikTok</a>
          </div>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="w-full max-w-md space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <BotaoVoltar voltarPara="inicio" />
          <h2 className="text-2xl font-bold text-green-400 text-center">Cadastro</h2>
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="password" placeholder="Crie uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <button onClick={() => nome.trim() !== '' && setStep('autoconhecimento')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Avançar
          </button>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <BotaoVoltar voltarPara="cadastro" />
          <h2 className="text-2xl font-bold text-green-400 text-center">Perguntas de Autoconhecimento</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-2">
              <p className="text-zinc-300">{index + 1}. {pergunta}</p>
              <input type="range" min={0} max={5} value={respostas[index]} onChange={(e) => handleChange(index, Number(e.target.value))} className="w-full accent-green-500" />
            </div>
          ))}
          <button onClick={enviarRespostas} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Ver meu perfil
          </button>
        </section>
      )}

      {step === 'resultado' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
          <BotaoVoltar voltarPara="autoconhecimento" />
          <h2 className="text-3xl font-bold text-green-400">Olá, {nome}!</h2>
          <p className="text-xl text-white">Seu perfil é: <span className="text-green-400 font-semibold">{perfil}</span></p>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <button onClick={() => setStep('boasVindas')} className="mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Acessar Funções Especiais
          </button>
        </section>
      )}

      {step === 'boasVindas' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
          <BotaoVoltar voltarPara="resultado" />
          <h2 className="text-3xl font-bold text-green-400">Seja bem-vindo(a), {nome}!</h2>
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
          <button onClick={() => setStep('home')} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition">
            Ir para a Página Inicial
          </button>
        </section>
      )}

      {step === 'home' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <BotaoVoltar voltarPara="boasVindas" />
          <h2 className="text-3xl font-bold text-green-400 text-center">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div onClick={() => setStep('trilhas')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Trilhas de Autodesenvolvimento</h3>
              <p>Acesse conteúdos e desafios personalizados para evoluir continuamente.</p>
            </div>
            <div onClick={() => setStep('psicologo')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Sessões com Psicólogos</h3>
              <p>Agende conversas com nossos especialistas parceiros para cuidar da sua mente.</p>
            </div>
          </div>
        </section>
      )}

      {step === 'trilhas' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-center">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">Trilhas de Autodesenvolvimento</h2>
          <p className="text-zinc-300">Explore conteúdos e dicas personalizados para seu perfil.</p>
          <button onClick={() => setStep('trilhaDetalhes')} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition">
            Ver Dicas Personalizadas
          </button>
        </section>
      )}

      {step === 'trilhaDetalhes' && perfil && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <BotaoVoltar voltarPara="trilhas" />
          <h2 className="text-3xl font-bold text-green-400 text-center">Dicas para o perfil: {perfil}</h2>
          <p className="text-zinc-300 text-center">Inspire-se com recomendações feitas sob medida para seu estilo único.</p>

          {/* Dicas específicas para cada perfil aqui */}
          {perfil === 'Empático' && (
            <>
              <Dica titulo="Hobbies Recomendados" conteudo="Escrever um diário, voluntariado, arte-terapia, meditação guiada, yoga." />
              <Dica titulo="Evite Ansiedade" conteudo="Estabeleça limites emocionais e pratique o autocuidado diariamente." />
              <Dica titulo="Gerencie o Cansaço" conteudo="Priorize o descanso e evite absorver os problemas dos outros." />
              <Dica titulo="Lidando com Estresse" conteudo="Use técnicas de respiração e reserve momentos para solitude restauradora." />
            </>
          )}
          {perfil === 'Guardião' && (
            <>
              <Dica titulo="Hobbies Recomendados" conteudo="Jardinagem, quebra-cabeças, leitura tranquila, culinária estruturada." />
              <Dica titulo="Evite Ansiedade" conteudo="Não se sobrecarregue tentando controlar tudo. Confie no processo." />
              <Dica titulo="Gerencie o Cansaço" conteudo="Crie rotinas de sono e momentos de pausa real durante o dia." />
              <Dica titulo="Lidando com Estresse" conteudo="Organize suas tarefas em prioridades e diga não quando necessário." />
            </>
          )}
          {perfil === 'Estratégico' && (
            <>
              <Dica titulo="Hobbies Recomendados" conteudo="Xadrez, leitura de não-ficção, programação, jogos de lógica, planejamento de projetos." />
              <Dica titulo="Evite Ansiedade" conteudo="Aceite que nem tudo pode ser previsto — abrace a adaptabilidade." />
              <Dica titulo="Gerencie o Cansaço" conteudo="Descanse entre metas e foque na qualidade, não só na performance." />
              <Dica titulo="Lidando com Estresse" conteudo="Meditação com foco, journaling de prioridades e pausas programadas ajudam." />
            </>
          )}
          {perfil === 'Pioneiro' && (
            <>
              <Dica titulo="Hobbies Recomendados" conteudo="Startups, marcenaria criativa, inovação em games, aventuras ao ar livre." />
              <Dica titulo="Evite Ansiedade" conteudo="Não assuma todas as responsabilidades ao mesmo tempo. Delegue e compartilhe ideias." />
              <Dica titulo="Gerencie o Cansaço" conteudo="Evite o burnout intercalando momentos de criação com relaxamento." />
              <Dica titulo="Lidando com Estresse" conteudo="Atividades físicas e novos desafios ajudam a canalizar a tensão criativa." />
            </>
          )}
        </section>
      )}

      {step === 'psicologo' && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl text-center space-y-6">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">Sessões com Psicólogos</h2>
          <p className="text-zinc-300">Estamos montando uma rede de psicólogos parceiros da Mindyz.</p>
          <p className="text-zinc-300">Se você é psicólogo(a) e tem interesse em fazer parte, envie um e-mail para:</p>
          <a href="mailto:equipemindyz@gmail.com" className="text-green-400 underline">equipemindyz@gmail.com</a>
        </section>
      )}
    </main>
  )
}
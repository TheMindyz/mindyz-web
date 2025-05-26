'use client';

import React, { useState, useRef } from 'react';


export default function Home() {
  const [step, setStep] = useState<
    'inicio' | 'cadastro' |'login' | 'autoconhecimento' | 'resultado' | 'parabenizacao'|'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhes' | 'psicologo' | 'cvv' | 'mensagens' | 'checkin' | 'sobre a Mindyz' | 'desabafo' | 'mindyz news'  
  >('inicio');

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0));
  const [perfil, setPerfil] = useState<string | null>(null);

const chuvaRef = useRef<HTMLAudioElement>(null);
const marRef = useRef<HTMLAudioElement>(null);
const florestaRef = useRef<HTMLAudioElement>(null);
const fogueiraRef = useRef<HTMLAudioElement>(null);

// Tipagem genérica e segura
const tocarSom = (somRef: React.RefObject<HTMLAudioElement | null>) => {
  [chuvaRef, marRef, florestaRef, fogueiraRef].forEach(ref => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  });
  if (somRef.current) {
    somRef.current.play();
  }
};
const pararTodosOsSons = () => {
  [chuvaRef, marRef, florestaRef, fogueiraRef].forEach(ref => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  });
};


  const handleChange = (index: number, value: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = value;
    setRespostas(novasRespostas);
  };


  const calcularPerfil = () => {
    const soma = respostas.reduce((a, b) => a + b, 0);
    if (soma < 12) return 'Empático';
    if (soma < 20) return 'Guardião';
    if (soma < 28) return 'Estratégico';
    return 'Pioneiro';
  };

  const getDescricaoPerfil = (perfil: string) => {
    switch (perfil) {
      case 'Empático':
        return 'Você tem uma grande sensibilidade emocional, valoriza conexões humanas e está sempre pronto para apoiar quem precisa. Seu poder está na escuta e no acolhimento.';
      case 'Guardião':
        return 'Você é leal, confiável e organizado. Gosta de proteger o que é importante e se dedica com responsabilidade às suas tarefas. Um verdadeiro pilar para qualquer equipe.';
      case 'Estratégico':
        return 'Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência. Seu raciocínio lógico e visão tática te destacam.';
      case 'Pioneiro':
        return 'Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade. Seu espírito criativo e ousado inspira mudanças.';
      default:
        return '';
    }
  };

  const perguntas = [
    'Você se considera uma pessoa comunicativa?',
    'Costuma planejar com antecedência suas tarefas?',
    'Consegue entender facilmente os sentimentos dos outros?',
    'Gosta de assumir a liderança em projetos?',
    'Você prefere estabilidade á mudanças constantes?',
    'Tem facilidade em resolver problemas de forma lógica?',
    'Valoriza relações profundas e sinceras?',
    'Sente-se motivado por desafios e inovação?'
  ];

  const enviarRespostas = () => {
    const perfilCalculado = calcularPerfil();
    setPerfil(perfilCalculado);
    setStep('resultado');
  };

  const BotaoVoltar = ({ voltarPara }: { voltarPara: typeof step }) => (
    <button
      onClick={() => setStep(voltarPara)}
      className="bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-4 rounded transition mb-4"
    >
      ← Voltar
    </button>
  );

  const Dica = ({ titulo, conteudo }: { titulo: string, conteudo: string }) => (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
      <h4 className="text-green-400 font-semibold text-lg">{titulo}</h4>
      <p className="text-zinc-300">{conteudo}</p>
    </div>
  );

  return (
  <main className="relative flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white border-4 border-green-400 shadow-[0_0_20px_4px_rgba(34,197,94,0.7)]">
      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Mindzy</h1>
          <p className="text-zinc-300 text-xl font-medium">Sua S.O.S em Saúde Mental.</p>
          <button
            onClick={() => setStep('cadastro')}
            className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-6 rounded transition"
          >
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
    <p className="text-center text-sm text-zinc-400 mt-4">
      Já tem uma conta?{' '}
      <button
        onClick={() => setStep('login')}
        className="text-green-400 hover:underline font-semibold"
      >
        Entrar
      </button>
    </p>
  </section>
)}

{step === 'login' && (
  <section className="w-full max-w-md space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl">
    <BotaoVoltar voltarPara="cadastro" /> {/* Alterado para voltar para cadastro */}
    <h2 className="text-2xl font-bold text-green-400 text-center">Entrar</h2>
    
    <input
      type="email"
      placeholder="Digite seu email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
    />
    
    <input
      type="password"
      placeholder="Digite sua senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
    />
    
    <button
      onClick={() => {
        if (email.trim() !== '' && senha.trim() !== '') {
          // Aqui você pode implementar a lógica de login real depois
          setStep('autoconhecimento') // Vai para o fluxo principal
        }
      }}
      className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
    >
      Entrar
    </button>

    <p className="text-center text-sm text-zinc-400 mt-4">
      Ainda não tem uma conta?{' '}
      <button
        onClick={() => setStep('cadastro')}
        className="text-green-400 hover:underline font-semibold"
      >
        Cadastre-se
      </button>
    </p>
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
    
    {/* Atualizado para ir para a tela roxa */}
    <button
      onClick={() => setStep('parabenizacao')}
      className="mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
    >
      Acessar Funções Especiais
    </button>
  </section>
)}

{step === 'parabenizacao' && (
  <section className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md mx-auto text-center space-y-8 border border-green-500 shadow-[0_0_30px_#84cc16]">
    
    {/* Botão de Voltar */}
    <div className="flex justify-start">
      <BotaoVoltar voltarPara="resultado" />
    </div>

    {/* Título com ícone */}
    <h2 className="text-3xl font-bold text-green-400 flex items-center justify-center gap-2">
      🎉 Parabéns, {nome}!
    </h2>

    {/* Texto principal */}
    <p className="text-zinc-300 text-lg font-medium">
      Você concluiu sua avaliação emocional com sucesso.
    </p>

    {/* Texto secundário */}
    <p className="text-zinc-400 text-base leading-relaxed">
      Agora que você conhece melhor o seu perfil emocional, explore os recursos que a Mindyz preparou para sua jornada de autoconhecimento.
    </p>

    {/* Botão Centralizado */}
    <div className="flex justify-center">
      <button
        onClick={() => setStep('boasVindas')}
        className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-lg transition shadow-md"
      >
        Continuar
      </button>
    </div>
    
  </section>
)}




  {step === 'boasVindas' && perfil && (
  <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
    <BotaoVoltar voltarPara="parabenizacao" />

    <div className="space-y-4 text-left text-zinc-300">
      <h3 className="text-green-400 font-semibold text-2xl text-center">Funções Disponíveis:</h3>
      <ul className="space-y-2 list-disc list-inside">
        <li>Acessar trilhas de autodesenvolvimento</li>
        <li>Receber mensagens motivacionais diárias</li>
        <li>Cvv</li>
        <li>Fazer check-in emocional</li>
        <li>Conhecer sobre a Mindyz</li>
        <li>Desabafar</li>
        <li>Mindyz News</li>
      </ul>
    </div>

    <button
      onClick={() => setStep('home')}
      className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
    >
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

      <div onClick={() => setStep('cvv')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
        <h3 className="text-green-400 font-semibold text-lg">Precisa conversar?</h3>
        <p>Saiba como receber apoio emocional gratuito com o CVV (188).</p>
      </div>

      <div onClick={() => setStep('mensagens')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
  <h3 className="text-green-400 font-semibold text-lg">Mensagens Motivacionais</h3>
  <p>Leia frases que vão te inspirar e dar um gás no seu dia.</p>
</div>

<div onClick={() => setStep('checkin')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
  <h3 className="text-green-400 font-semibold text-lg">Fazer Check-in Emocional</h3>
  <p>Registre como está se sentindo agora com um simples toque.</p>
</div>

<div onClick={() => setStep('sobre a Mindyz')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
  <h3 className="text-green-400 font-semibold text-lg">Sobre a Mindzy</h3>
  <p>Conheça nossa missão, visão e os valores que guiam o nosso propósito.</p>
</div>

<div onClick={() => setStep('desabafo')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
  <h3 className="text-green-400 font-semibold text-lg">Desabafo</h3>
  <p>Compartilhe o que está sentindo de forma segura e anônima. Estamos aqui para te ouvir.</p>
</div>

<div onClick={() => setStep('mindyz news')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
  <h3 className="text-green-400 font-semibold text-lg">Mindyz News</h3>
  <p>Fique por dentro das últimas novidades e descobertas sobre saúde mental no Brasil e no mundo.</p>
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


    {step === 'cvv' && (
      <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl text-center space-y-6">
        <BotaoVoltar voltarPara="home" />
        <h2 className="text-3xl font-bold text-green-400">Precisa conversar?</h2>
        <p className="text-zinc-300">Se você está passando por um momento difícil, saiba que não está sozinho(a). O CVV (Centro de Valorização da Vida) oferece apoio emocional gratuito e sigiloso.</p>
        <p className="text-2xl text-white font-semibold">Ligue 188</p>
        <p className="text-zinc-300">Ou envie um e-mail para <a href="mailto:cvv@cvv.org.br" className="text-green-400 underline">cvv@cvv.org.br</a></p>
      </section>
    )}

{step === 'mensagens' && (
  <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-2xl text-center space-y-6">
    <BotaoVoltar voltarPara="home" />
    <h2 className="text-3xl font-bold text-green-400">Mensagens Motivacionais</h2>
    <div className="space-y-4 text-left">
      <Dica
        titulo="Acredite em você"
        conteudo="Você é mais capaz do que imagina. Cada passo, por menor que seja, é um avanço na direção certa."
      />
      <Dica
        titulo="Seja constante"
        conteudo="A motivação começa com uma escolha: continuar, mesmo quando for difícil."
      />
      <Dica
        titulo="Você importa"
        conteudo="Seu valor não está no que você faz, mas em quem você é. O mundo precisa do seu brilho."
      />
    </div>
  </section>
)}


{step === 'checkin' && (

  <section className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-xl space-y-6 text-center">
    <BotaoVoltar voltarPara="home" />
    <h2 className="text-3xl font-bold text-green-400">Como você está se sentindo hoje?</h2>
    <div className="grid grid-cols-3 gap-4 text-3xl">
      {[
        { emoji: '😊', label: 'Feliz' },
        { emoji: '😔', label: 'Triste' },
        { emoji: '😡', label: 'Irritado' },
        { emoji: '😰', label: 'Ansioso' },
        { emoji: '😎', label: 'Confiante' },
        { emoji: '😴', label: 'Cansado' },
        { emoji: '😭', label: 'Sobrecarregado' },
        { emoji: '❤', label: 'Grato' },
        { emoji: '🤔', label: 'Pensativo' },
      ].map(({ emoji, label }) => (
        <button
          key={label}
onClick={() => alert(`Check-in registrado: ${label}`)}
          className="flex flex-col items-center bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
        >
          <span>{emoji}</span>
          <span className="text-sm text-zinc-300 mt-1">{label}</span>
        </button>
      ))}
    </div>
  </section>
)}



{step === 'sobre a Mindyz' && (
  <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl overflow-y-auto max-h-screen">
    <BotaoVoltar voltarPara="home" />
    <h2 className="text-3xl font-bold text-green-400 text-center">Como surgiu a Mindzy</h2>
    <p className="text-zinc-300 leading-relaxed">
      A Mindzy nasceu da visão sensível e inovadora de Mariana Tavares, estudante do curso de Gestão da Tecnologia da Informação. Desde o primeiro período da faculdade, Mariana já refletia profundamente sobre a importância de unir a tecnologia ao cuidado com a saúde mental — um tema que sempre considerou essencial, mas ainda pouco explorado no universo digital.
      <br /><br />
      Foi justamente no primeiro período que a ideia da Mindzy surgiu. A partir daquele momento, Mariana começou a planejar e trabalhar com dedicação no projeto, buscando formas de tornar a proposta real e impactante. Paralelamente à formação em tecnologia, ela também passou a estudar Psicologia nas horas vagas, movida por experiências pessoais e familiares com ansiedade e questões emocionais. Essas vivências fortaleceram ainda mais seu compromisso em criar algo verdadeiramente útil, humano e acolhedor.
      <br /><br />
      Mais do que um nome, Mindzy representa um propósito: criar um espaço acessível e sensível para quem busca apoio emocional, usando a tecnologia de forma ética, empática e consciente. Cada detalhe da plataforma foi pensado com carinho, responsabilidade e escuta ativa, para que cada pessoa se sinta genuinamente acolhida.
    </p>

    <div className="space-y-4 mt-6">
      <div>
        <h3 className="text-xl font-semibold text-green-400">🌱 Missão</h3>
        <p className="text-zinc-300">
          Oferecer apoio emocional por meio de soluções tecnológicas acessíveis, empáticas e acolhedoras, promovendo bem-estar e autocuidado na vida das pessoas.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-400">👁 Visão</h3>
        <p className="text-zinc-300">
          Ser referência em tecnologia voltada à saúde mental, criando um espaço seguro e humanizado para quem busca acolhimento, inspiração ou orientação emocional.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-400">💛 Valores</h3>
        <ul className="list-disc list-inside text-zinc-300 space-y-1">
          <li><strong>Empatia:</strong> Ouvir, acolher e compreender sem julgamentos.</li>
          <li><strong>Acessibilidade:</strong> Tornar o cuidado emocional possível para todos.</li>
          <li><strong>Inovação com propósito:</strong> Usar a tecnologia para fazer o bem.</li>
          <li><strong>Cuidado humano:</strong> Desenvolver com sensibilidade, sempre pensando em quem vai usar.</li>
          <li><strong>Respeito e ética:</strong> Tratar cada pessoa com dignidade e responsabilidade.</li>
        </ul>
      </div>
    </div>
  </section>
)}

{step === 'desabafo' && (
  <section className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-2xl text-center space-y-4">
    <BotaoVoltar voltarPara="home" />
    <h2 className="text-2xl font-bold text-green-400">Bloco de Desabafo</h2>
    <textarea
      placeholder="Escreva aqui o que está sentindo..."
      rows={10}
      className="w-full p-4 rounded-lg bg-zinc-800 text-white border border-zinc-700 resize-none"
    />
    <button className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded transition">
      Salvar (em breve)
    </button>
  </section>
)}

{step === 'mindyz news' && (
  <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl overflow-y-auto max-h-screen">
    <BotaoVoltar voltarPara="home" />
    <h2 className="text-3xl font-bold text-green-400 text-center">📰 Mindyz News</h2>
    <p className="text-zinc-300 leading-relaxed text-center">
      Acompanhe as principais notícias e descobertas sobre saúde mental no Brasil e no mundo.
    </p>

    <div className="space-y-4">
      {/* Notícia 1 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Saúde mental dos jovens brasileiros está em colapso?
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Estudo revela dados alarmantes sobre autoestima, isolamento social e conflitos familiares entre jovens de 16 a 24 anos.
        </p>
        <a
          href="https://istoe.com.br/istoegeral/2025/03/04/saude-mental-dos-jovens-brasileiros-esta-em-colapso-estudo-revela-dados-alarmantes/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: IstoÉ
        </a>
      </div>

      {/* Notícia 2 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Ansiedade e depressão fazem o Brasil bater recorde de afastamentos por saúde mental
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Mais de 472 mil licenças médicas foram concedidas em 2024, um aumento de 68% em relação ao ano anterior.
        </p>
        <a
          href="https://www.infomoney.com.br/saude/ansiedade-e-depressao-fazem-o-brasil-bater-recorde-de-afastamento-por-saude-mental/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: InfoMoney
        </a>
      </div>

      {/* Notícia 3 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Falta de psiquiatras agrava epidemia de saúde mental no Brasil
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          País enfrenta escassez de profissionais especializados, com apenas 0,83 psiquiatra por 100 mil habitantes.
        </p>
        <a
          href="https://conexaoto.com.br/2025/01/16/falta-de-psiquiatras-agrava-epidemia-de-saude-mental-no-brasil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: Conexão Tocantins
        </a>
      </div>

      {/* Notícia 4 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Queda de leitos psiquiátricos no SUS agrava crise da saúde mental
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Em uma década, o SUS perdeu 13,1 mil vagas para internação psiquiátrica, dificultando o tratamento de casos graves.
        </p>
        <a
          href="https://www.portaltela.com/saude/saude-publica/2025/04/30/queda-de-leitos-psiquiatricos-no-sus-agrava-crise-da-saude-mental-no-brasil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: Portal Tela
        </a>
      </div>

      {/* Notícia 5 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
  Saúde mental será a &apos;grande causa nacional&apos; da França em 2025
</h3>
<p className="text-zinc-300 text-sm mt-1">
          Governo francês anuncia foco em saúde mental, com campanhas de sensibilização e medidas de prevenção.
        </p>
        <a
          href="https://noticias.uol.com.br/ultimas-noticias/rfi/2024/10/04/por-que-a-saude-mental-sera-a-grande-causa-nacional-da-franca-em-2025.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: UOL Notícias
        </a>
      </div>

      {/* Notícia 6 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Mais de 1 bilhão de jovens enfrentarão problemas de saúde até 2030
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Estudo da The Lancet destaca impacto do clima e digitalização na saúde mental de adolescentes.
        </p>
        <a
          href="https://elpais.com/salud-y-bienestar/2025-05-20/mas-de-1000-millones-de-jovenes-sufriran-problemas-de-salud-en-2030.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: El País
        </a>
      </div>

      {/* Notícia 7 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Demanda por atendimento em saúde mental dispara 30% desde a pandemia
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Em regiões como a Galícia, o aumento na procura por serviços de saúde mental pressiona o sistema público.
        </p>
        <a
          href="https://cadenaser.com/galicia/2025/05/21/la-demanda-de-atencion-en-salud-mental-se-dispara-un-30-desde-la-pandemia-radio-galicia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: Cadena SER
        </a>
      </div>

      {/* Notícia 8 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Senado avalia políticas de saúde mental para profissionais de saúde, crianças e adolescentes
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Projetos de lei buscam regulamentar ações de saúde mental no SUS para grupos vulneráveis.
        </p>
        <a
          href="https://www12.senado.leg.br/noticias/materias/2024/02/02/senado-avalia-politicas-de-saude-mental-para-profissional-de-saude-crianca-e-adolescente"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: Senado Notícias
        </a>
      </div>

      {/* Notícia 9 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Janeiro Branco 2025: Um chamado pela saúde mental no Brasil
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Campanha nacional convida a sociedade a refletir e agir em prol do bem-estar emocional.
        </p>
        <a
          href="https://janeirobranco.org.br/janeiro-branco-2025-um-convite-nacional-para-a-promocao-da-saude-mental/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: Janeiro Branco
        </a>
      </div>

      {/* Notícia 10 */}
      <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition">
        <h3 className="text-green-300 font-semibold text-lg">
          Saúde mental está entre as prioridades das empresas em 2025
        </h3>
        <p className="text-zinc-300 text-sm mt-1">
          Empresas brasileiras reconhecem a importância da saúde mental e buscam implementar práticas de bem-estar.
        </p>
        <a
          href="https://www.em.com.br/colunistas/marcilio-de-moraes/2025/04/7107718-saude-mental-esta-entre-as-prioridades-das-empresas-este-ano.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 mt-2 block"
        >
          Fonte: Estado de Minas
        </a>
      </div>
    </div>
  </section>
)}


  </main>
);
}
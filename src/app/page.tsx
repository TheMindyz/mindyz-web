"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { p } from "framer-motion/client";

// Tipo reutilizável para mensagens
type Mensagem = { texto: string; tipo: "usuario" | "bot" };

export default function Home() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const handlePagamentoSucesso = () => {
    setIsPremium(true);
    setStep("premiumSucesso");
  };

  // Estado do chat
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { texto: "Olá, tudo bem? Pode desabafar à vontade.", tipo: "bot" },
    { texto: "Obrigado! Hoje não estou me sentindo bem...", tipo: "usuario" },
  ]);

  const [novaMensagem, setNovaMensagem] = useState("");

  // Ref para rolar até a última mensagem
  const mensagensEndRef = useRef<HTMLDivElement>(null);

  // Função para gerar respostas personalizadas do bot
  const gerarResposta = (texto: string): string => {
    const msg = texto.toLowerCase();

    if (msg.includes("triste")) {
      return "Sinto muito por você estar se sentindo assim. Quer conversar mais sobre isso?";
    } else if (msg.includes("ansiedade") || msg.includes("ansioso")) {
      return "A ansiedade pode ser sufocante às vezes. Você quer me contar mais sobre isso?";
    } else if (msg.includes("feliz")) {
      return "Fico feliz em saber disso! 😊 Me conta o que te deixou tão alegre!";
    } else if (msg.includes("raiva")) {
      return "Raiva é uma emoção válida. Quer desabafar sobre o que aconteceu?";
    } else if (msg.includes("medo")) {
      return "O medo pode nos paralisar... estou aqui com você, quer me contar mais?";
    } else if (msg.includes("sozinho") || msg.includes("sozinha")) {
      return "Você não está sozinho aqui. Pode contar comigo.";
    } else {
      return "Entendo... quer me contar mais sobre isso?";
    }
  };

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "") return;

    const mensagemUsuario: Mensagem = { texto: novaMensagem, tipo: "usuario" };
    const respostaBot = gerarResposta(novaMensagem);

    setMensagens((prev) => [...prev, mensagemUsuario]);
    setNovaMensagem("");

    setTimeout(() => {
      setMensagens((prev) => [...prev, { texto: respostaBot, tipo: "bot" }]);
    }, 1000);
  };

  // Scroll automático
  useEffect(() => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // Outros estados...
  const [mostrarInfoPremium, setMostrarInfoPremium] = useState(false);
  const [mostrarPlanos, setMostrarPlanos] = useState(false);
  const [desafiosConcluidos, setDesafiosConcluidos] = useState<number[]>([]);
  const [accepted, setAccepted] = useState(false);
  const [descricaoPessoal, setDescricaoPessoal] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [acompanhamento, setAcompanhamento] = useState("");

  const [step, setStep] = useState<
    | "inicio"
    | "cadastro"
    | "aguardandoaprovacao"
    | "login"
    | "termos"
    | "autoconhecimento"
    | "resultado"
    | "parabenizacao"
    | "boasVindas"
    | "home"
    | "trilhas"
    | "trilhaDetalhes"
    | "psicologo"
    | "cvv"
    | "sos"
    | "chatdesabafo"
    | "mensagens"
    | "checkin"
    | "sobre a Mindyz"
    | "desabafo"
    | "mindyz news"
    | "desafiosmotivacionais"
    | "seudiario"
    | "espiritualidade"
    | "premium"
    | "planos"
    | "sobrePremium"
    | "termospolitica"
    | "pagamento"
    | "premiumSucesso"
  >("inicio");

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0));
  const [perfil, setPerfil] = useState<string | null>(null);

  const [termoAceito, setTermoAceito] = useState(false);

  const chuvaRef = useRef<HTMLAudioElement>(null);
  const marRef = useRef<HTMLAudioElement>(null);
  const florestaRef = useRef<HTMLAudioElement>(null);
  const fogueiraRef = useRef<HTMLAudioElement>(null);

  // Tipagem genérica e segura
  const tocarSom = (somRef: React.RefObject<HTMLAudioElement | null>) => {
    [chuvaRef, marRef, florestaRef, fogueiraRef].forEach((ref) => {
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
    [chuvaRef, marRef, florestaRef, fogueiraRef].forEach((ref) => {
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
    if (soma < 12) return "Empático";
    if (soma < 20) return "Guardião";
    if (soma < 28) return "Estratégico";
    return "Pioneiro";
  };

  const getDescricaoPerfil = (perfil: string) => {
    switch (perfil) {
      case "Empático":
        return "Você tem uma grande sensibilidade emocional, valoriza conexões humanas e está sempre pronto para apoiar quem precisa. Seu poder está na escuta e no acolhimento.";
      case "Guardião":
        return "Você é leal, confiável e organizado. Gosta de proteger o que é importante e se dedica com responsabilidade às suas tarefas. Um verdadeiro pilar para qualquer equipe.";
      case "Estratégico":
        return "Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência. Seu raciocínio lógico e visão tática te destacam.";
      case "Pioneiro":
        return "Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade. Seu espírito criativo e ousado inspira mudanças.";
      default:
        return "";
    }
  };

  const perguntas = [
    "Você se considera uma pessoa comunicativa?",
    "Costuma planejar com antecedência suas tarefas?",
    "Consegue entender facilmente os sentimentos dos outros?",
    "Gosta de assumir a liderança em projetos?",
    "Você prefere estabilidade á mudanças constantes?",
    "Tem facilidade em resolver problemas de forma lógica?",
    "Valoriza relações profundas e sinceras?",
    "Sente-se motivado por desafios e inovação?",
  ];

  const enviarRespostas = () => {
    const perfilCalculado = calcularPerfil();
    setPerfil(perfilCalculado);
    setStep("resultado");
  };

  const BotaoVoltar = ({ voltarPara }: { voltarPara: typeof step }) => (
    <button
      onClick={() => setStep(voltarPara)}
      className="bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-4 rounded transition mb-4"
    >
      ← Voltar
    </button>
  );

  const Dica = ({ titulo, conteudo }: { titulo: string; conteudo: string }) => (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
      <h4 className="text-green-400 font-semibold text-lg">{titulo}</h4>
      <p className="text-zinc-300">{conteudo}</p>
    </div>
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white border-4 border-green-400 shadow-[0_0_20px_4px_rgba(34,197,94,0.7)]">
      <div className="absolute inset-0 bg-purple-950 z-[-3]" />
      {step === "inicio" && (
        <section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
          {/* Conteúdo */}
          <div className="z-20 text-center space-y-6">
            <h1 className="text-4xl font-bold text-green-400 animate-pulseGlow">
              Bem-vindo à Mindzy
            </h1>
            <p className="text-zinc-300 text-xl font-medium">
              Sua S.O.S em Saúde Mental.
            </p>
            <button
              onClick={() => setStep("cadastro")}
              className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-6 rounded transition"
            >
              Entrar com convite / Pedir acesso
            </button>
            <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
              <a
                href="https://www.instagram.com/themindyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@TheMindyz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                YouTube
              </a>
              <a
                href="mailto:equipemindyz@gmail.com"
                className="hover:text-green-400"
              >
                Email
              </a>
              <a
                href="https://tiktok.com/@themindyz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                TikTok
              </a>
            </div>
          </div>
        </section>
      )}
      {step === "cadastro" && (
        <section className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-xl space-y-6">
          <BotaoVoltar voltarPara="inicio" />

          <h2 className="text-2xl font-bold text-green-400 text-center">
            Cadastro
          </h2>

          {/* Dados Pessoais */}
          <div className="space-y-3">
            <label className="block text-sm text-zinc-400">Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            />

            <label className="block text-sm text-zinc-400">CPF</label>
            <input
              type="text"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            />

            <label className="block text-sm text-zinc-400">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            />

            <label className="block text-sm text-zinc-400">
              Data de nascimento
            </label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            />
          </div>

          {/* Localização */}
          <div className="space-y-3">
            <label className="block text-sm text-zinc-400">Cidade</label>
            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            />

            <label className="block text-sm text-zinc-400">Estado</label>
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            />
          </div>

          {/* Sobre você */}
          <div className="space-y-3">
            <label className="block text-sm text-zinc-400">Sobre você</label>
            <textarea
              placeholder="Fale brevemente sobre você e por que quer participar da Mindyz"
              value={descricaoPessoal}
              onChange={(e) => setDescricaoPessoal(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 resize-none h-24"
            />

            <label className="block text-sm text-zinc-400">
              Você faz acompanhamento psicológico?
            </label>
            <select
              value={acompanhamento}
              onChange={(e) => setAcompanhamento(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            >
              <option value="">Selecione uma opção</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
              <option value="pretendo">Pretendo buscar</option>
            </select>
          </div>

          <button
            onClick={() =>
              nome.trim() !== "" &&
              email.trim() !== "" &&
              descricaoPessoal.trim() !== "" &&
              cidade.trim() !== "" &&
              estado.trim() !== "" &&
              acompanhamento !== "" &&
              setStep("aguardandoaprovacao")
            }
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded"
          >
            Avançar
          </button>

          <p className="text-center text-sm text-zinc-400 mt-4">
            Já tem uma conta?{" "}
            <button
              onClick={() => setStep("login")}
              className="text-green-400 underline hover:text-green-500"
            >
              Faça login
            </button>
          </p>
        </section>
      )}
      {step === "aguardandoaprovacao" && (
        <section className="w-full max-w-md space-y-6 p-6 rounded-xl border-4 border-green-500 shadow-[0_0_20px_4px_rgba(34,197,94,0.5)] bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold text-green-400">
            Aguardando Aprovação
          </h2>

          <div className="text-white text-base space-y-3">
            <p>
              Obrigado por se cadastrar,{" "}
              <strong className="text-green-300">{nome}</strong>! Seu cadastro
              está em análise.
            </p>
            <p>
              Você receberá um e-mail com sua senha de acesso assim que for
              aprovado.
            </p>
            <p>
              Em até <strong className="text-green-300">24 horas</strong>, você
              poderá fazer parte da nossa comunidade! 💚
            </p>
          </div>

          {/* Mensagem acolhedora + Frase automática */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-green-400 text-sm flex items-center gap-1">
              <span className="animate-pulse">
                Estamos revisando seu cadastro
              </span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </p>

            <p className="text-white text-sm italic">
              {(() => {
                const frases = [
                  "Respire fundo... você está exatamente onde deveria estar.",
                  "Lembre-se: você merece cuidado, amor e acolhimento.",
                  "Seu bem-estar importa. Cuide de você, um passo de cada vez.",
                  "Você é mais forte do que imagina. 💚",
                  "Tudo bem pausar. Você é sua prioridade.",
                ];
                const index = Math.floor(Math.random() * frases.length);
                return `"${frases[index]}"`;
              })()}
            </p>
          </div>

          <button
            onClick={() => setStep("inicio")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-black font-semibold py-2 px-4 rounded"
          >
            Voltar ao início
          </button>
        </section>
      )}
      {step === "login" && (
        <section className="max-w-md p-6 bg-zinc-900 rounded-lg shadow-lg space-y-4">
          <BotaoVoltar voltarPara="inicio" />
          <h2 className="text-2xl font-bold text-green-400 text-center">
            Login
          </h2>
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
              if (email.trim() && senha.trim()) setStep("termos");
            }}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded"
          >
            Entrar
          </button>
          <p className="text-center text-sm text-zinc-400 mt-4">
            Não tem cadastro?{" "}
            <button
              onClick={() => setStep("termos")}
              className="text-green-400 underline hover:text-green-600"
            >
              Cadastre-se
            </button>
          </p>
        </section>
      )}
      {step === "termos" && (
        <section className="w-full max-w-xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl text-sm text-zinc-300">
          <button
            onClick={() => setStep("login")}
            className="text-white text-sm px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded mb-2"
          >
            ← Voltar
          </button>

          <h2 className="text-2xl font-bold text-green-400 text-center">
            Termos de Uso
          </h2>

          <div className="bg-zinc-800 p-5 rounded-lg space-y-5 border border-zinc-700">
            {/* --- Bloco 1 --- */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                1. Responsabilidade e Consentimento
              </h3>
              <p>
                Ao continuar, você declara estar ciente de que este aplicativo
                tem caráter informativo e de suporte leve ao bem-estar
                emocional,
                <strong>
                  {" "}
                  não substituindo acompanhamento psicológico, psiquiátrico ou
                  médico profissional
                </strong>
                . Em situações de crise, procure ajuda especializada ou entre em
                contato com o <strong>CVV</strong> pelo número{" "}
                <strong>188</strong>.
              </p>
              <p>
                Você também{" "}
                <strong>autoriza a coleta e uso dos dados fornecidos</strong>{" "}
                com a finalidade de personalizar sua experiência, enviar
                conteúdos relacionados ao bem-estar emocional e comunicações
                sobre a plataforma.
              </p>
            </div>

            {/* --- Bloco 2 --- */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                2. Privacidade e Dados
              </h3>
              <p>
                Seus dados pessoais (nome, e-mail, CPF, data de nascimento e
                informações emocionais) são armazenados de forma segura. Não
                compartilhamos seus dados com terceiros sem seu consentimento
                prévio.
              </p>
              <p>
                A coleta do <strong>CPF</strong> tem como objetivo ajudar na
                identificação dos usuários, contribuindo para a segurança da
                comunidade. Isso permite que, em casos de{" "}
                <strong>
                  comportamento inadequado, ofensas, práticas abusivas ou
                  violações dos termos
                </strong>
                , a conta seja <strong>banida de forma definitiva</strong>,
                prevenindo o uso indevido da plataforma e protegendo os demais
                usuários.
              </p>
              <p>
                Tratamos seus dados conforme a{" "}
                <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
              </p>
            </div>

            {/* --- Bloco 3 --- */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                3. Uso Indevido
              </h3>
              <p>
                É proibido utilizar esta plataforma para atividades ilícitas,
                ofensivas, preconceituosas ou que infrinjam leis. O uso indevido
                pode resultar no bloqueio ou exclusão da sua conta, a critério
                da equipe da Mindyz.
              </p>
            </div>

            {/* --- Bloco 4 --- */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                4. Atualizações dos Termos
              </h3>
              <p>
                Este termo pode ser alterado e atualizado periodicamente sem
                aviso prévio. Recomendamos que você revise os termos
                regularmente.
              </p>
            </div>

            {/* --- Bloco 5 --- */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                5. Links e Sites Externos
              </h3>
              <p>
                O aplicativo pode conter links para sites externos, como o CVV e
                órgãos públicos. A Mindyz não se responsabiliza pelo conteúdo,
                políticas ou práticas de privacidade desses sites.
              </p>
            </div>

            {/* --- Bloco 6 --- */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                6. Direitos e Deveres do Usuário
              </h3>
              <p>
                Ao utilizar a plataforma Mindyz, você tem o direito de acessar
                conteúdos e ferramentas que promovem seu bem-estar emocional,
                além de garantir a privacidade dos seus dados e a segurança das
                suas informações, conforme nossa política de privacidade.
              </p>
              <p className="mt-2">Como usuário, você também se compromete a:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  Fornecer informações verdadeiras, precisas e atualizadas no
                  seu cadastro.
                </li>
                <li>
                  Manter uma conduta respeitosa, acolhedora e ética na interação
                  com outros usuários, profissionais e conteúdos da plataforma.
                </li>
                <li>
                  Não divulgar, compartilhar ou utilizar informações de outros
                  usuários sem consentimento.
                </li>
                <li>
                  Não praticar atos de assédio, discriminação, preconceito,
                  discurso de ódio ou qualquer comportamento ofensivo.
                </li>
                <li>
                  Respeitar os direitos de propriedade intelectual da Mindyz e
                  de terceiros, não copiando, distribuindo ou reproduzindo
                  conteúdos sem autorização.
                </li>
                <li>
                  Utilizar a plataforma exclusivamente para os fins propostos,
                  sendo proibido qualquer uso comercial, promocional ou que fuja
                  dos objetivos da Mindyz.
                </li>
              </ul>
              <p className="mt-2">
                O descumprimento desses deveres pode acarretar em advertências,
                suspensão ou exclusão definitiva da conta, a critério da equipe
                da Mindyz.
              </p>
            </div>

            {/* --- Links úteis --- */}
            <div className="text-xs text-zinc-400 mt-4 space-y-1">
              <p>
                🔗{" "}
                <a
                  href="https://www.cvv.org.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-400"
                >
                  Saiba mais sobre o CVV
                </a>
              </p>
              <p>
                🔗{" "}
                <a
                  href="https://www.mpf.mp.br/servicos/lgpd/o-que-e-a-lgpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-400"
                >
                  Direitos segundo a LGPD
                </a>
              </p>
              <p>
                🔗{" "}
                <a
                  href="https://www.jusbrasil.com.br/modelos-pecas/termo-de-consentimento-para-tratamento-de-dados-pessoais/2409302451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-400"
                >
                  O que é o consentimento de dados?
                </a>
              </p>
            </div>
          </div>

          {/* Checkbox de aceite */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="accept"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="accept" className="text-sm text-zinc-300">
              Li e concordo com os <strong>Termos de Uso</strong> e a{" "}
              <strong>Política de Privacidade</strong>.
            </label>
          </div>

          {/* Botão continuar */}
          <button
            onClick={() => setStep("autoconhecimento")}
            disabled={!accepted}
            className={`w-full mt-4 py-2 rounded font-bold transition ${
              accepted
                ? "bg-green-600 hover:bg-green-700 text-black"
                : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Concordo e continuar
          </button>
        </section>
      )}
      {step === "autoconhecimento" && (
        <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <BotaoVoltar voltarPara="termos" />
          <h2 className="text-2xl font-bold text-green-400 text-center">
            Perguntas de Autoconhecimento
          </h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-2">
              <p className="text-zinc-300">
                {index + 1}. {pergunta}
              </p>
              <input
                type="range"
                min={0}
                max={5}
                value={respostas[index]}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
          ))}
          <button
            onClick={enviarRespostas}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Ver meu perfil
          </button>
        </section>
      )}
      {step === "resultado" && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
          <BotaoVoltar voltarPara="autoconhecimento" />
          <h2 className="text-3xl font-bold text-green-400">Olá, {nome}!</h2>
          <p className="text-xl text-white">
            Seu perfil é:{" "}
            <span className="text-green-400 font-semibold">{perfil}</span>
          </p>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>

          {/* Atualizado para ir para a tela roxa */}
          <button
            onClick={() => setStep("parabenizacao")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Acessar Funções Especiais
          </button>
        </section>
      )}
      {step === "parabenizacao" && (
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
            Agora que você conhece melhor o seu perfil emocional, explore os
            recursos que a Mindyz preparou para sua jornada de autoconhecimento.
          </p>

          {/* Botão Centralizado */}
          <div className="flex justify-center">
            <button
              onClick={() => setStep("boasVindas")}
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-lg transition shadow-md"
            >
              Continuar
            </button>
          </div>
        </section>
      )}
      {step === "boasVindas" && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
          <BotaoVoltar voltarPara="parabenizacao" />

          <div className="space-y-4 text-left text-zinc-300">
            <h3 className="text-green-400 font-semibold text-2xl text-center">
              Funções Disponíveis:
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Acessar trilhas de autodesenvolvimento</li>
              <li>Receber mensagens motivacionais diárias</li>
              <li>Cvv</li>
              <li>S.O.S emocional</li>
              <li>Chat anônimo de desabafo</li>
              <li>Mensagens motivacionais</li>
              <li>Fazer check-in emocional</li>
              <li>Conhecer sobre a Mindyz</li>
              <li>Desabafar consigo mesmo</li>
              <li>Mindyz News</li>
              <li>Seu Diário</li>
              <li>Desafios Motivacionais</li>
              <li>Espiritualidade e Saúde Mental</li>
              <li>Portal Premium</li>
            </ul>
          </div>

          <button
            onClick={() => setStep("home")}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Ir para a Página Inicial
          </button>
        </section>
      )}
      {step === "home" && (
        <section className="w-full max-w-6xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 mx-auto">
          <BotaoVoltar voltarPara="boasVindas" />

          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-green-400">
              Bem-vindo(a), {nome}!
            </h2>
            <p className="text-lg text-gray-400 mt-2">
              Pronto(a) para mais um passo na sua jornada de
              autodesenvolvimento?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-zinc-300">
            {[
              {
                title: "🧭Trilhas de Autodesenvolvimento",
                desc: "Dê o primeiro passo. As trilhas avançadas te esperam no Premium.",
                step: "trilhas",
              },
              {
                title: "🧑‍⚕️Sessões com Psicólogos",
                desc: "Descubra o poder de conversar com quem entende. Conheça o apoio Premium.",
                step: "psicologo",
              },
              {
                title: "📞Precisa conversar?",
                desc: "Saiba como receber apoio emocional gratuito com o CVV (188).",
                step: "cvv",
              },
              {
                title: "🚑S.O.S Emocional",
                desc: "Encontre apoio imediato em momentos difíceis. Saiba mais sobre o SOS.",
                step: "sos",
              },
              {
                title: "🕊️Chat Anônimo de Desabafo",
                desc: "Converse de forma segura e anônima. No Premium, desbloqueie mensagens ilimitadas.",
                step: "chatdesabafo",
              },
              {
                title: "💬Mensagens Motivacionais",
                desc: "Leia frases que vão te inspirar e dar um gás no seu dia. Uma frase por dia pode mudar tudo. No Premium, você desbloqueia sua jornada.",
                step: "mensagens",
              },
              {
                title: "📝Fazer Check-in Emocional",
                desc: "Registre como está se sentindo agora com um simples toque.",
                step: "checkin",
              },
              {
                title: "🌱Sobre a Mindyz",
                desc: "Conheça nossa missão, visão e os valores que guiam o nosso propósito. No Premium, você vai mais fundo nessa jornada.",
                step: "sobre a Mindyz",
              },
              {
                title: "😔Desabafar consigo mesmo(a)",
                desc: "Um espaço seguro e anônimo para soltar o que está preso no coração.",
                step: "desabafo",
              },
              {
                title: "📰Mindyz News",
                desc: "Fique por dentro das novidades sobre saúde mental, atualizações do app e conteúdos exclusivos.",
                step: "mindyz news",
              },
              {
                title: "📖Seu Diário",
                desc: "Registre seus pensamentos, momentos especiais e conquistas. No Premium, desbloqueie insights poderosos.",
                step: "seudiario",
              },
              {
                title: "🔥Desafios Motivacionais",
                desc: "Topa um desafio diário? Supere seus limites e descubra sua força interior.",
                step: "desafiosmotivacionais",
              },
              {
                title: "🙏Espiritualidade e Saúde Mental",
                desc: "Veja como a fé pode ajudar na saúde emocional, com versículos, estudos e milagres inspiradores.",
                step: "espiritualidade",
              },
              {
                title: "✨ Portal Premium ✨",
                desc: "Entre em um espaço exclusivo com conteúdos premium, recursos especiais e uma jornada mística para o autoconhecimento.",
                step: "premium",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`bg-zinc-800 rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer hover:bg-zinc-700 
            ${
              card.step === "premium"
                ? "border-2 border-green-400 shadow-[0_0_20px_#22c55e]"
                : "border border-green-600"
            }`}
                onClick={() => setStep(card.step as typeof step)}
              >
                <h3 className="text-green-400 font-semibold text-xl mb-2">
                  {card.title}
                </h3>
                <p className="text-zinc-300 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {step === "trilhas" && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-center animate-fade-in border border-green-600">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">
            Trilhas de Autodesenvolvimento
          </h2>
          <p className="text-zinc-300">
            Explore conteúdos e dicas personalizados para seu perfil.
          </p>
          <button
            onClick={() => setStep("trilhaDetalhes")}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Ver Dicas Personalizadas
          </button>
        </section>
      )}
      {step === "trilhaDetalhes" && perfil && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 animate-fade-in">
          <BotaoVoltar voltarPara="trilhas" />
          <h2 className="text-3xl font-bold text-green-400 text-center">
            Dicas para o perfil: {perfil}
          </h2>
          <p className="text-zinc-300 text-center">
            Inspire-se com recomendações feitas sob medida para seu estilo
            único.
          </p>

          {/* Dicas específicas */}
          {perfil === "Empático" && (
            <>
              <Dica
                titulo="🧘 Hobbies Recomendados"
                conteudo="Escrever um diário, voluntariado, arte-terapia, meditação guiada, yoga."
              />
              <Dica
                titulo="🛡️ Evite Ansiedade"
                conteudo="Estabeleça limites emocionais e pratique o autocuidado diariamente."
              />
              <Dica
                titulo="😴 Gerencie o Cansaço"
                conteudo="Priorize o descanso e evite absorver os problemas dos outros."
              />
              <Dica
                titulo="🌿 Lidando com Estresse"
                conteudo="Use técnicas de respiração e reserve momentos para solitude restauradora."
              />
            </>
          )}

          {/* ... outros perfis como antes ... */}

          {/* Card bloqueado Premium */}
          <div className="bg-zinc-800 p-4 rounded-lg border-2 border-zinc-700 text-center opacity-70 hover:opacity-90 cursor-not-allowed relative">
            <h3 className="text-xl font-bold text-gray-400">
              🔒 Dica Premium: Conecte-se sem se esgotar
            </h3>
            <p className="text-zinc-400 mt-2">
              Desbloqueie práticas exclusivas para relacionamentos mais leves.
            </p>
            <div className="absolute top-2 right-2 text-sm text-green-400">
              Premium
            </div>
          </div>

          {/* Rodapé Premium */}
          <div className="border-t border-zinc-700 pt-4 mt-6 text-center">
            <p className="text-zinc-400">
              Você visualizou <strong>4 de 8</strong> dicas. Todas as
              informações sobre como desbloquear o restante estão no{" "}
              <span className="text-green-400 font-semibold">
                Portal Premium
              </span>{" "}
              na tela <strong>Home</strong>.
            </p>
          </div>
        </section>
      )}
      {step === "psicologo" && (
        <section className="w-full max-w-xl mx-auto bg-zinc-900 p-10 rounded-2xl shadow-2xl text-center border border-green-600 space-y-6">
          <BotaoVoltar voltarPara="home" />

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-green-400 flex justify-center items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-green-400"
              >
                <path d="M12 2C9.24 2 6 3.5 6 8c0 2.49 2.5 5.53 6 8.54 3.5-3.01 6-6.05 6-8.54 0-4.5-3.24-6-6-6z" />
              </svg>
              Sessões com Psicólogos
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed">
              A Mindyz está criando uma{" "}
              <strong>rede de psicólogos parceiros</strong> para atender nossa
              comunidade com apoio emocional de qualidade.
            </p>

            <p className="text-zinc-300">
              Se você é psicólogo(a), <strong>quer impactar vidas</strong> e
              crescer conosco, envie seu interesse:
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() =>
                (window.location.href = "mailto:equipemindyz@gmail.com")
              }
              className="bg-green-500 hover:bg-green-600 text-black font-bold text-sm px-6 py-3 rounded-full transition duration-200 shadow-lg"
            >
              Quero ser parceiro(a)
            </button>

            <p className="text-green-400 underline hover:text-green-300 transition duration-200 text-sm">
              equipemindyz@gmail.com
            </p>
          </div>
        </section>
      )}
      {step === "cvv" && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl text-center space-y-6">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">
            Precisa conversar?
          </h2>
          <p className="text-zinc-300">
            Se você está passando por um momento difícil, saiba que não está
            sozinho(a). O CVV (Centro de Valorização da Vida) oferece apoio
            emocional gratuito e sigiloso.
          </p>
          <a
            href="tel:188"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Ligue 188
          </a>
          <p className="text-zinc-300">
            Ou envie um e-mail para{" "}
            <a
              href="mailto:cvv@cvv.org.br"
              className="text-green-400 underline"
            >
              cvv@cvv.org.br
            </a>
          </p>
        </section>
      )}
      {step === "sos" && (
        <section className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-2xl text-center space-y-6">
          <BotaoVoltar voltarPara="home" />

          <h2 className="text-2xl font-bold text-rose-400">🚑 SOS Emocional</h2>

          <p className="text-zinc-300">
            Se você está se sentindo sobrecarregado, ansioso ou em crise, aqui
            estão práticas e orientações para te ajudar agora.
          </p>

          {/* Círculo simulando respiração */}
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full bg-rose-500 opacity-50 animate-ping"></div>
          </div>

          <p className="text-rose-300 font-semibold">
            🌬 Inspire... Segura... Expira... Repete comigo.
          </p>

          {/* Elementos de áudio ocultos */}
          <audio ref={chuvaRef} src="/sons/chuva.mp3" loop />
          <audio ref={marRef} src="/sons/mar.mp3" loop />
          <audio ref={florestaRef} src="/sons/floresta.mp3" loop />
          <audio ref={fogueiraRef} src="/sons/fogueira.mp3" loop />

          {/* Sons Terapêuticos */}
          <div className="space-y-2">
            <h3 className="text-rose-400 font-semibold">
              🌿 Sons Terapêuticos
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => tocarSom(chuvaRef)}
                className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
              >
                🌧 Chuva
              </button>
              <button
                onClick={() => tocarSom(marRef)}
                className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
              >
                🌊 Mar
              </button>
              <button
                onClick={() => tocarSom(florestaRef)}
                className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
              >
                🌳 Floresta
              </button>
              <button
                onClick={() => tocarSom(fogueiraRef)}
                className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl text-zinc-200"
              >
                🔥 Fogueira
              </button>
              <button
                onClick={pararTodosOsSons}
                className="bg-red-800 hover:bg-red-700 p-2 rounded-xl text-white col-span-2"
              >
                ⏹ Parar Sons
              </button>
            </div>
          </div>

          {/* Guia de Primeiros Socorros Psicológicos */}
          <div className="space-y-4">
            <h3 className="text-rose-400 font-semibold text-xl">
              🧠 Primeiros Socorros Psicológicos
            </h3>
            <ul className="space-y-2 text-zinc-300 text-left">
              <li>✔ Reconheça: Está tudo bem não estar bem agora.</li>
              <li>✔ Respire fundo e foque na sua respiração.</li>
              <li>✔ Identifique o que está sentindo, sem se julgar.</li>
              <li>✔ Se puder, fale com alguém de confiança.</li>
              <li>✔ Procure um lugar seguro e confortável.</li>
              <li>✔ Pratique aterramento: perceba seus 5 sentidos.</li>
              <li>✔ Lembre-se: isso vai passar.</li>
            </ul>
          </div>

          <p className="text-center text-sm text-zinc-400">
            Se precisar de apoio imediato, fale com o <b>CVV — 188</b> ou com um
            profissional de saúde mental.
          </p>

          <div className="mt-6 bg-rose-800/20 p-4 rounded-xl text-rose-300 text-sm">
            💎 Quer ir além? No{" "}
            <span className="font-semibold text-rose-200">Mindyz Premium</span>,
            você desbloqueia <b>atendimentos guiados</b>,{" "}
            <b>conteúdos aprofundados</b>, <b>trilhas especiais</b> e{" "}
            <b>acesso direto ao Clube de Apoio</b>.
            <br />
            Transforme seu cuidado emocional em prioridade. 💖
          </div>
        </section>
      )}
      {step === "chatdesabafo" && (
        <section className="w-full max-w-3xl bg-zinc-900 p-6 rounded-xl shadow-xl space-y-4 flex flex-col">
          {/* Botão de voltar */}
          <button
            onClick={() => setStep("home")}
            className="text-sm text-white hover:underline self-start"
          >
            ← Voltar
          </button>

          <h2 className="text-2xl font-bold text-purple-400 text-center">
            🕊️ Chat Anônimo
          </h2>

          {/* Caixa de mensagens */}
          <div className="flex-1 bg-zinc-800 rounded-lg p-4 overflow-y-auto space-y-2 max-h-96">
            {mensagens.map((mensagem, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg w-fit ${
                  mensagem.tipo === "bot"
                    ? "bg-purple-500 text-black self-start"
                    : "bg-zinc-700 text-white self-end"
                }`}
              >
                {mensagem.texto}
              </div>
            ))}
          </div>

          {/* Input e botão */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") enviarMensagem();
              }}
            />
            <button
              onClick={enviarMensagem}
              className="bg-purple-500 hover:bg-purple-600 text-black font-bold px-4 py-2 rounded-lg"
            >
              Enviar
            </button>
          </div>

          {/* Aviso discreto */}
          <p className="text-xs text-zinc-400 text-center mt-2">
            🧠 Este chat é assistido por uma inteligência artificial treinada
            para oferecer apoio emocional. Ele não substitui a ajuda de
            profissionais humanos. Para suporte psicológico urgente,
            recomendamos buscar um profissional ou o CVV (188).
          </p>
        </section>
      )}
      {step === "mensagens" && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-2xl text-center space-y-6">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">
            Mensagens Motivacionais
          </h2>
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
      {step === "checkin" && (
        <section className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-xl space-y-6 text-center">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">
            Como você está se sentindo hoje?
          </h2>
          <div className="grid grid-cols-3 gap-4 text-3xl">
            {[
              { emoji: "😊", label: "Feliz" },
              { emoji: "😔", label: "Triste" },
              { emoji: "😡", label: "Irritado" },
              { emoji: "😰", label: "Ansioso" },
              { emoji: "😎", label: "Confiante" },
              { emoji: "😴", label: "Cansado" },
              { emoji: "😭", label: "Sobrecarregado" },
              { emoji: "❤", label: "Grato" },
              { emoji: "🤔", label: "Pensativo" },
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
      {step === "sobre a Mindyz" && (
        <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl overflow-y-auto max-h-screen">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400 text-center">
            Como surgiu a Mindzy
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            A Mindzy nasceu da visão sensível e inovadora de Mariana Tavares,
            estudante do curso de Gestão da Tecnologia da Informação. Desde o
            primeiro período da faculdade, Mariana já refletia profundamente
            sobre a importância de unir a tecnologia ao cuidado com a saúde
            mental — um tema que sempre considerou essencial, mas ainda pouco
            explorado no universo digital.
            <br />
            <br />
            Foi justamente no primeiro período que a ideia da Mindzy surgiu. A
            partir daquele momento, Mariana começou a planejar e trabalhar com
            dedicação no projeto, buscando formas de tornar a proposta real e
            impactante. Paralelamente à formação em tecnologia, ela também
            passou a estudar Psicologia nas horas vagas, movida por experiências
            pessoais e familiares com ansiedade e questões emocionais. Essas
            vivências fortaleceram ainda mais seu compromisso em criar algo
            verdadeiramente útil, humano e acolhedor.
            <br />
            <br />
            Mais do que um nome, Mindzy representa um propósito: criar um espaço
            acessível e sensível para quem busca apoio emocional, usando a
            tecnologia de forma ética, empática e consciente. Cada detalhe da
            plataforma foi pensado com carinho, responsabilidade e escuta ativa,
            para que cada pessoa se sinta genuinamente acolhida.
          </p>

          <div className="space-y-4 mt-6">
            <div>
              <h3 className="text-xl font-semibold text-green-400">
                🌱 Missão
              </h3>
              <p className="text-zinc-300">
                Oferecer apoio emocional por meio de soluções tecnológicas
                acessíveis, empáticas e acolhedoras, promovendo bem-estar e
                autocuidado na vida das pessoas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-400">👁 Visão</h3>
              <p className="text-zinc-300">
                Ser referência em tecnologia voltada à saúde mental, criando um
                espaço seguro e humanizado para quem busca acolhimento,
                inspiração ou orientação emocional.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-400">
                💛 Valores
              </h3>
              <ul className="list-disc list-inside text-zinc-300 space-y-1">
                <li>
                  <strong>Empatia:</strong> Ouvir, acolher e compreender sem
                  julgamentos.
                </li>
                <li>
                  <strong>Acessibilidade:</strong> Tornar o cuidado emocional
                  possível para todos.
                </li>
                <li>
                  <strong>Inovação com propósito:</strong> Usar a tecnologia
                  para fazer o bem.
                </li>
                <li>
                  <strong>Cuidado humano:</strong> Desenvolver com
                  sensibilidade, sempre pensando em quem vai usar.
                </li>
                <li>
                  <strong>Respeito e ética:</strong> Tratar cada pessoa com
                  dignidade e responsabilidade.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
      {step === "desabafo" && (
        <section className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-2xl text-center space-y-4">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-2xl font-bold text-green-400">
            Bloco de Desabafo
          </h2>
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
      {step === "mindyz news" && (
        <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl overflow-y-auto max-h-screen">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400 text-center">
            📰 Mindyz News
          </h2>
          <p className="text-zinc-300 leading-relaxed text-center">
            Acompanhe as principais notícias e descobertas sobre saúde mental no
            Brasil e no mundo.
          </p>

          <div className="space-y-4">
            {/* Notícia 1 */}
            <a
              href="https://www.bbc.com/portuguese/articles/crg7lg4r6g5o#:~:text=Os%20jovens%20brasileiros%20com%20idades,de%20identidade%20e%20descobertas%20sexuais.%E2%80%9D&text=Barrancos%20aponta%20tamb%C3%A9m%20que%20mais,s%C3%A3o%20impactadas%20pela%20sa%C3%BAde%20mental."
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Autoestima baixa e ansiedade: saúde mental de jovens é pior que
                de outros grupos, aponta estudo
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Jovens brasileiros enfrentam taxas elevadas de autoestima baixa,
                ansiedade e outros desafios emocionais, segundo pesquisa
                recente.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: BBC News Brasil
              </span>
            </a>

            {/* Notícia 2 */}
            <a
              href="https://www.infomoney.com.br/saude/ansiedade-e-depressao-fazem-o-brasil-bater-recorde-de-afastamento-por-saude-mental/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Ansiedade e depressão fazem o Brasil bater recorde de
                afastamentos por saúde mental
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Mais de 472 mil licenças médicas foram concedidas em 2024, um
                aumento de 68% em relação ao ano anterior.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: InfoMoney
              </span>
            </a>

            {/* Notícia 3 */}
            <a
              href="https://conexaoto.com.br/2025/01/16/falta-de-psiquiatras-agrava-epidemia-de-saude-mental-no-brasil"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Falta de psiquiatras agrava epidemia de saúde mental no Brasil
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                País enfrenta escassez de profissionais especializados, com
                apenas 0,83 psiquiatra por 100 mil habitantes.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: Conexão Tocantins
              </span>
            </a>

            {/* Notícia 4 */}
            <a
              href="https://www.portaltela.com/saude/saude-publica/2025/04/30/queda-de-leitos-psiquiatricos-no-sus-agrava-crise-da-saude-mental-no-brasil"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Queda de leitos psiquiátricos no SUS agrava crise da saúde
                mental
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Em uma década, o SUS perdeu 13,1 mil vagas para internação
                psiquiátrica, dificultando o tratamento de casos graves.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: Portal Tela
              </span>
            </a>

            {/* Notícia 5 */}
            <a
              href="https://noticias.uol.com.br/ultimas-noticias/rfi/2024/10/04/por-que-a-saude-mental-sera-a-grande-causa-nacional-da-franca-em-2025.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Saúde mental será a 'grande causa nacional' da França em 2025
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Governo francês anuncia foco em saúde mental, com campanhas de
                sensibilização e medidas de prevenção.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: UOL Notícias
              </span>
            </a>

            {/* Notícia 6 */}
            <a
              href="https://elpais.com/salud-y-bienestar/2025-05-20/mas-de-1000-millones-de-jovenes-sufriran-problemas-de-salud-en-2030.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Mais de 1 bilhão de jovens enfrentarão problemas de saúde até
                2030
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Estudo da The Lancet destaca impacto do clima e digitalização na
                saúde mental de adolescentes.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: El País
              </span>
            </a>

            {/* Notícia 7 */}
            <a
              href="https://cadenaser.com/galicia/2025/05/21/la-demanda-de-atencion-en-salud-mental-se-dispara-un-30-desde-la-pandemia-radio-galicia/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Demanda por atendimento em saúde mental dispara 30% desde a
                pandemia
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Em regiões como a Galícia, o aumento na procura por serviços de
                saúde mental pressiona o sistema público.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: Cadena SER
              </span>
            </a>

            {/* Notícia 8 */}
            <a
              href="https://www12.senado.leg.br/noticias/materias/2024/02/02/senado-avalia-politicas-de-saude-mental-para-profissional-de-saude-crianca-e-adolescente"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Senado avalia políticas de saúde mental para profissionais de
                saúde, crianças e adolescentes
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Projetos de lei buscam regulamentar ações de saúde mental no SUS
                para grupos vulneráveis.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: Senado Notícias
              </span>
            </a>

            {/* Notícia 9 */}
            <a
              href="https://janeirobranco.org.br/janeiro-branco-2025-um-convite-nacional-para-a-promocao-da-saude-mental/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Janeiro Branco 2025: Um chamado pela saúde mental no Brasil
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Campanha nacional convida a sociedade a refletir e agir em prol
                do bem-estar emocional.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: Janeiro Branco
              </span>
            </a>

            {/* Notícia 10 */}
            <a
              href="https://www.em.com.br/colunistas/marcilio-de-moraes/2025/04/7107718-saude-mental-esta-entre-as-prioridades-das-empresas-este-ano.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
            >
              <h3 className="text-green-300 font-semibold text-lg">
                Saúde mental está entre as prioridades das empresas em 2025
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                Empresas brasileiras reconhecem a importância da saúde mental e
                buscam implementar práticas de bem-estar.
              </p>
              <span className="text-xs text-zinc-400 mt-2 block">
                Fonte: Estado de Minas
              </span>
            </a>
          </div>
        </section>
      )}
      {step === "desafiosmotivacionais" && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-center">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">
            Desafios Motivacionais
          </h2>
          <p className="text-zinc-300">
            Escolha um desafio para hoje e fortaleça seu bem-estar emocional com
            atitudes simples.
          </p>

          <ul className="space-y-4 text-left">
            {[
              "Beber 2 copos de água agora",
              "Ficar 10 minutos longe do celular",
              "Agradecer por algo bom que aconteceu hoje",
              "Dizer algo positivo para si mesmo no espelho",
              "Fazer uma pausa consciente de 2 minutos para respirar",
            ].map((desafio, index) => (
              <li
                key={index}
                className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center"
              >
                <span className="text-white">{desafio}</span>
                <button
                  onClick={() => {
                    setDesafiosConcluidos((prev) => [...prev, index]);
                  }}
                  disabled={desafiosConcluidos.includes(index)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    desafiosConcluidos.includes(index)
                      ? "bg-green-700 text-white cursor-default"
                      : "bg-green-500 hover:bg-green-600 text-black"
                  }`}
                >
                  {desafiosConcluidos.includes(index)
                    ? "Concluído"
                    : "Concluir"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {step === "seudiario" && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <BotaoVoltar voltarPara="home" />

          <h2 className="text-3xl font-bold text-green-400 text-center">
            Diário Emocional
          </h2>
          <p className="text-zinc-300 text-center">
            Um espaço para refletir, se expressar e acompanhar sua jornada
            emocional ao longo do tempo.
          </p>

          <div className="space-y-4">
            <textarea
              className="w-full bg-zinc-800 text-white rounded-lg p-4 resize-none h-56 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Escreva livremente sobre o seu dia, sentimentos ou pensamentos..."
            />

            <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded w-full">
              Salvar no Diário
            </button>
          </div>

          <div className="border-t border-zinc-700 pt-6">
            <h3 className="text-green-300 font-semibold text-lg mb-2">
              Histórico da Semana
            </h3>
            <p className="text-zinc-400 text-sm">
              Em breve: acompanhe seus registros em gráficos e perceba padrões
              emocionais.
            </p>
          </div>
        </section>
      )}
      {step === "espiritualidade" && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-center">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">
            Espiritualidade e Saúde Mental
          </h2>
          <p className="text-zinc-300">
            Descubra conteúdos que fortalecem sua fé, espiritualidade e
            bem-estar emocional.
          </p>

          <ul className="space-y-4 text-left">
            {[
              {
                texto: "Versículo do Dia — 1 Pedro 5:7 (Biblia Online)",
                link: "https://www.bibliaonline.com.br/nvi/1pe/5/7",
              },
              {
                texto:
                  "Estudo: A fé pode melhorar sua saúde mental (Dra. Simone Naka)",
                link: "https://drasimonenakaopinheiro.com.br/a-fe-pode-melhorar-sua-saude-mental/",
              },
              {
                texto:
                  "Conheça Santa Dymphna — Padroeira da Saúde Mental (Today's Catholic)",
                link: "https://todayscatholic.org/st-dymphna-patron-saint-of-mental-health/",
              },
              {
                texto: "Devocional Diário Online (DevocionalDiario.com.br)",
                link: "https://www.devocionaldiario.com.br/",
              },
              {
                texto:
                  "Reportagem — O impacto da espiritualidade na saúde mental (Revista Galileu)",
                link: "https://revistagalileu.globo.com/Ciencia/noticia/2020/02/como-a-espiritualidade-pode-impactar-na-saude-mental.html",
              },
              {
                texto:
                  "Artigo — A Ciência da Espiritualidade na Saúde (Scielo)",
                link: "https://www.scielo.br/j/ram/a/9JdZdq8n4zTYdD7rQvHtspP/?lang=pt",
              },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition"
                >
                  <span className="text-green-400 font-medium">
                    {item.texto}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {step === "premium" && (
        <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
          {/* Portas e partículas */}
          <div className="portal-door left-door"></div>
          <div className="portal-door right-door"></div>
          <div className="particles"></div>

          {/* Seção principal */}
          {!mostrarPlanos ? (
            <section className="relative z-10 w-[90%] max-w-4xl min-h-[600px] bg-zinc-900/90 border-[5px] border-green-400 rounded-3xl shadow-[0_0_40px_#22c55eaa] backdrop-blur-md flex flex-col items-center justify-center p-10 space-y-6 text-center">
              <BotaoVoltar voltarPara="home" />

              <h2 className="text-5xl font-extrabold text-green-400 animate-pulse">
                🚀 Portal Premium Mindyz
              </h2>

              <p className="text-zinc-300 text-lg max-w-xl">
                Bem-vindo(a) a um espaço exclusivo. Desbloqueie ferramentas que
                aceleram seu desenvolvimento e autoconhecimento.
              </p>

              <ul className="space-y-4 text-left max-w-xl">
                {[
                  "🔓 Acesso antecipado a recursos exclusivos",
                  "🧠 Conteúdos avançados de autoconhecimento",
                  "📔 Insights do Diário Emocional",
                  "🎯 Desafios de desenvolvimento pessoal",
                  "🎥 Workshops e aulas com especialistas",
                  "🤝 Comunidade premium para evolução",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="relative group bg-zinc-800/80 px-6 py-3 rounded-xl text-green-400 shadow-md hover:bg-zinc-700 transition-all backdrop-blur-sm overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-200 via-emerald-400 to-teal-300 rounded-xl blur-lg opacity-30 group-hover:opacity-40 animate-pulse z-0"></span>

                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <span className="bg-black/80 px-4 py-1 rounded-full text-sm text-white flex items-center gap-2 shadow-lg">
                        🔒 Assinar
                      </span>
                    </span>

                    <span className="relative z-20 opacity-30 group-hover:opacity-40">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-green-300 text-lg italic mt-4">
                ...e muito mais!
              </p>

              <p
                className="text-sm text-green-300 underline cursor-pointer hover:text-green-200 transition"
                onClick={() => setStep("sobrePremium")}
              >
                Saiba mais sobre o Premium
              </p>

              <button
                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white rounded-full shadow-lg group mt-6"
                onClick={() => setMostrarPlanos(true)}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 rounded-full blur-lg opacity-70 group-hover:opacity-90 animate-pulse"></span>
                <span className="relative z-10">🚀 Quero ser Premium</span>
              </button>
            </section>
          ) : (
            <section className="relative z-20 w-[90%] max-w-4xl bg-zinc-900/90 border-[5px] border-green-400 rounded-3xl shadow-[0_0_40px_#22c55eaa] backdrop-blur-md p-10 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-green-400 animate-pulse">
                💎 Torne-se Premium Mindyz
              </h2>

              <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
                A assinatura Premium desbloqueia recursos avançados,
                experiências exclusivas e suporte completo para o seu
                autodesenvolvimento emocional.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
                {/* Plano Mensal */}
                <div className="bg-zinc-800 rounded-2xl p-6 border border-green-500 shadow-lg min-h-[300px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-green-400">
                      Plano Mensal
                    </h3>
                    <p className="text-zinc-200 mt-2">
                      Ideal para quem está começando.
                    </p>
                    <p className="text-3xl font-extrabold text-white mt-4">
                      R$ 7,90
                    </p>
                    <p className="text-sm text-zinc-400">/ mês até dez/2025</p>
                    <ul className="mt-4 space-y-2 text-green-300 text-sm">
                      <li>✔️ Acesso completo a recursos Premium</li>
                      <li>✔️ SOS Emocional completo</li>
                      <li>✔️ Conteúdos semanais exclusivos</li>
                    </ul>
                  </div>
                  <a
                    href="https://mpago.la/2xq1BTu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block bg-green-500 text-black font-bold text-center py-3 rounded-xl shadow hover:bg-green-600 transition"
                  >
                    🚀 Assinar Agora
                  </a>
                </div>

                {/* Plano Trimestral */}
                <div className="bg-zinc-800 rounded-2xl p-6 border border-emerald-500 shadow-lg min-h-[300px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400">
                      Plano Trimestral
                    </h3>
                    <p className="text-zinc-200 mt-2">
                      Mais economia com benefícios extras.
                    </p>
                    <p className="text-3xl font-extrabold text-white mt-4">
                      R$ 19,90
                    </p>
                    <p className="text-sm text-zinc-400">/ a cada 3 meses</p>
                    <ul className="mt-4 space-y-2 text-green-300 text-sm">
                      <li>✔️ Tudo do plano mensal</li>
                      <li>✔️ Acesso a eventos ao vivo</li>
                      <li>✔️ Prioridade no suporte</li>
                    </ul>
                  </div>
                  <a
                    href="https://mpago.la/25NZAwC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block bg-emerald-500 text-black font-bold text-center py-3 rounded-xl shadow hover:bg-emerald-600 transition"
                  >
                    🚀 Assinar Agora
                  </a>
                </div>

                {/* Plano Anual */}
                <div className="bg-zinc-800 rounded-2xl p-6 border border-teal-500 shadow-lg min-h-[300px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-teal-400">
                      Plano Anual
                    </h3>
                    <p className="text-zinc-200 mt-2">
                      Compromisso total com sua jornada.
                    </p>
                    <p className="text-3xl font-extrabold text-white mt-4">
                      R$ 69,90
                    </p>
                    <p className="text-sm text-zinc-400">/ ano</p>
                    <ul className="mt-4 space-y-2 text-green-300 text-sm">
                      <li>✔️ Tudo dos outros planos</li>
                      <li>✔️ Acesso antecipado a novas funcionalidades</li>
                      <li>✔️ Reconhecimento na comunidade Mindyz</li>
                    </ul>
                  </div>
                  <a
                    href="https://mpago.la/1DgcoSA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block bg-teal-500 text-black font-bold text-center py-3 rounded-xl shadow hover:bg-teal-600 transition"
                  >
                    🚀 Assinar Agora
                  </a>
                </div>
              </div>

              <p className="mt-6 text-green-300 italic">
                *Você pode cancelar a qualquer momento.
              </p>

              <button
                onClick={() => setMostrarPlanos(false)}
                className="mt-4 underline text-sm text-zinc-400 hover:text-green-400"
              >
                ← Voltar para o portal
              </button>
            </section>
          )}
        </div>
      )}
      {step === "sobrePremium" && (
        <div className="relative w-full min-h-screen bg-black flex items-center justify-center px-4">
          <section className="relative z-10 w-full max-w-4xl bg-zinc-900/90 border-[5px] border-green-400 rounded-3xl shadow-[0_0_30px_#22c55eaa] backdrop-blur-md p-10 space-y-6 text-center">
            <BotaoVoltar voltarPara="premium" />

            <h2 className="text-4xl font-extrabold text-green-400">
              🛡️ Sobre o Premium e Políticas
            </h2>

            <p className="text-zinc-300 text-lg">
              Ao se tornar Premium no Mindyz, você investe na sua evolução
              emocional com acesso a conteúdos, ferramentas e suporte
              exclusivos.
            </p>

            <div className="text-left text-zinc-200 space-y-6">
              <div>
                <h3 className="text-green-400 font-bold text-lg">
                  🔐 Segurança e Privacidade
                </h3>
                <p>
                  Seus dados são criptografados e armazenados de forma segura.
                  Seguimos rigorosamente a LGPD (Lei Geral de Proteção de
                  Dados). Nenhuma informação sensível é compartilhada com
                  terceiros.
                </p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold text-lg">
                  💳 Pagamentos
                </h3>
                <p>
                  Os pagamentos são processados via plataformas seguras como
                  Stripe ou Mercado Pago. Você pode cancelar a assinatura a
                  qualquer momento, sem fidelidade.
                </p>
              </div>

              <div>
                <h3 className="text-green-400 font-bold text-lg">
                  ✨ O que está incluso
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-green-300">
                  <li>📓 Diário emocional com insights personalizados</li>
                  <li>🎓 Workshops, aulas e trilhas exclusivas</li>
                  <li>🤝 Comunidade de apoio emocional</li>
                  <li>🚨 SOS emocional com desafios guiados</li>
                  <li>
                    💬 Fóruns de conversas globais e privados personalizados
                  </li>
                  <li>📚 Conteúdos semanais sobre autoconhecimento</li>
                  <li>🌟 Reconhecimento na comunidade Mindyz</li>
                  <li>
                    🧠 Indicação de sessões de terapia com profissionais (fora
                    da plataforma)
                  </li>
                  <li>🎫 Convites exclusivos para eventos premium</li>
                  <li>
                    🧍‍♀️ Avatares personalizados para representar seu perfil
                    emocional
                  </li>
                  <li>
                    🎁 Clube de benefícios com descontos em parceiros e serviços
                    de bem-estar
                  </li>
                  <li>
                    💬 Chat de apoio com inteligência artificial e moderação
                    humana para acolhimento inicial
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-green-400 font-bold text-lg">
                  📜 Política Mindyz
                </h3>
                <p>
                  Ao utilizar nossos serviços, você concorda com nossos{" "}
                  <button
                    onClick={() => setStep("termospolitica")}
                    className="underline text-green-300 hover:text-green-200 transition"
                  >
                    termos de uso
                  </button>{" "}
                  e{" "}
                  <button
                    onClick={() => setStep("termospolitica")}
                    className="underline text-green-300 hover:text-green-200 transition"
                  >
                    política de privacidade
                  </button>
                  . Garantimos total transparência e ética em todas as etapas do
                  seu uso da plataforma.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
      {step === "termospolitica" && (
        <div className="relative w-full min-h-screen bg-black flex items-center justify-center px-4">
          <section className="relative z-10 w-full max-w-4xl bg-zinc-900/90 border-[5px] border-green-400 rounded-3xl shadow-[0_0_30px_#22c55eaa] backdrop-blur-md p-10 space-y-6 text-left overflow-y-auto max-h-screen">
            <BotaoVoltar voltarPara="sobrePremium" />

            <h2 className="text-4xl font-extrabold text-green-400 text-center">
              🛡️ Termos de Uso e Política de Privacidade
            </h2>

            <div className="space-y-6 text-zinc-300 text-sm md:text-base">
              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  1. Introdução
                </h3>
                <p>
                  Ao utilizar a plataforma Mindzy, você concorda com os nossos
                  termos e políticas. É importante ler com atenção para entender
                  seus direitos e deveres como usuário.
                </p>
              </section>

              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  2. Uso da Plataforma
                </h3>
                <p>
                  A Mindzy é voltada para apoio emocional e desenvolvimento
                  pessoal. O uso indevido da plataforma, como disseminação de
                  conteúdo ofensivo ou uso comercial indevido, resultará na
                  suspensão do acesso.
                </p>
              </section>

              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  3. Coleta e Uso de Dados
                </h3>
                <p>
                  Coletamos apenas dados essenciais para oferecer uma
                  experiência personalizada e segura. Nenhuma informação é
                  vendida ou compartilhada com terceiros sem consentimento.
                </p>
              </section>

              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  4. Segurança
                </h3>
                <p>
                  Seus dados são criptografados e protegidos conforme os padrões
                  da LGPD. Utilizamos servidores seguros e atualizados para
                  garantir a privacidade das suas informações.
                </p>
              </section>

              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  5. Cancelamento e Reembolsos
                </h3>
                <p>
                  Você pode cancelar sua assinatura a qualquer momento.
                  Reembolsos serão analisados caso a solicitação ocorra em até 7
                  dias após a assinatura, conforme o Código de Defesa do
                  Consumidor.
                </p>
              </section>

              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  6. Alterações
                </h3>
                <p>
                  Podemos atualizar nossos termos e políticas periodicamente.
                  Avisaremos por e-mail ou via plataforma em caso de mudanças
                  significativas.
                </p>
              </section>

              <section>
                <h3 className="text-green-400 font-semibold text-lg">
                  7. Contato
                </h3>
                <p>
                  Em caso de dúvidas, entre em contato pelo e-mail:{" "}
                  <span className="underline text-green-300">
                    equipe@mindzy.com
                  </span>
                  .
                </p>
              </section>
            </div>
          </section>
        </div>
      )}
      {step === "pagamento" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-lg">
            Pronto! Agora é só confirmar sua assinatura:
          </p>
          <button
            onClick={handlePagamentoSucesso}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Assinar com Mercado Pago
          </button>
        </div>
      )}
       
    </main>
  );
}

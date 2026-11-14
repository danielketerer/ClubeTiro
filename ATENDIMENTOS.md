# Atendimentos e sessões

O antigo item Operação do estande agora se chama **Atendimentos e sessões**, dentro de Clube de tiro. A rota `/gestor/estande` permanece compatível. A alteração é somente local, sem commit, push ou publicação.

## Exemplos iniciais

- **Clube Horizonte:** entrada livre, identificação facial simulada, sem controle individual de pista, utilização da pista inclusa e arma do clube sem locação. Munições fornecidas pelo clube podem ser cobradas por unidade.
- **Clube Serra Azul:** entrada livre, controle de pistas, pista a R$ 60 por sessão, arma do clube a R$ 35 por sessão e munições a R$ 2 (.22 LR) ou R$ 3 (9 mm) por unidade.

As opções podem ser alteradas em **Configurar clube**: entrada livre ou agendamento, facial simulada ou recepção, controle de pistas, pista gratuita/inclusa/por sessão/por hora, locação de arma e fornecimento/cobrança de munições. A cobrança por hora é proporcional aos minutos informados. Não há cobrança real. Sessões já iniciadas preservam uma cópia dos preços do início.

## Testar como gestor

1. Abra Atendimentos e sessões, registre uma entrada e selecione o associado. A entrada não gera prática nem cobrança de sessão.
2. No atendimento Presente, escolha Iniciar prática. Informe responsável, arma própria ou disponível do clube e calibres utilizados. Pista é exigida somente quando o clube controla sua ocupação.
3. Ao encerrar, confirme a devolução da arma do clube, informe duração, munições próprias e/ou fornecidas pelo clube, seus lotes e quantidades e eventuais ocorrências. Consulte o resumo de valores antes de confirmar.
4. Confira recursos liberados, estoque reduzido apenas no fornecimento pelo clube, cobrança discriminada e prática pendente de revisão. Detalhes / prática permite ao gestor validar internamente ou devolver com justificativa.
5. Cobranças de sessão com valor positivo aparecem na ficha do associado, onde é possível dar baixa manual simulada. Elas têm origem própria e não são confundidas com a cobrança exigida para a renovação da filiação.

## Testar como atirador

Selecione Lucas Almeida e abra a Visão geral no modo Acompanhamento do CR. O bloco **Entrada e prática** permite simular a facial previamente cadastrada, confirmar a entrada e iniciar a própria sessão. Não utiliza câmera, imagem ou coleta biométrica. Se o clube configurar confirmação por recepção, o autoatendimento informa que a entrada depende da recepção.

O atirador visualiza apenas seus atendimentos, sessões e valores nesse bloco. Pode informar o consumo e encerrar a própria sessão. A prática encaminhada aparece no histórico do mesmo atirador, com clube de origem, calibres usados e revisão interna. O gestor continua responsável pela validação simulada.

Uma visita pode ser finalizada sem prática e sem cobrança de sessão. O agendamento, quando ativado, é representado por um horário fictício informado na entrada, para a data do cenário; não há integração com uma agenda externa.

## Calibres e persistência

Os calibres utilizados na prática são registrados separadamente dos calibres cadastrados na documentação fictícia. Encerrar ou revisar uma prática **não altera o cadastro documental e não representa apostilamento oficial**.

`src/session-types.ts` contém os contratos e a migração dos dados existentes. `src/session-service.ts` contém os comandos simulados e o cálculo de valores. `src/ClubSessions.tsx` contém a interface compartilhada entre gestor e atirador. Os dados continuam em `elo-manager-v1`, com projeção de práticas e revisões para o histórico anterior pelo adaptador `manager-sync.ts`. A restauração do painel de gestão também reinicia atendimentos e configurações.

## Verificar

```sh
node scripts/verify-sessions.cjs
node scripts/verify-manager.cjs
npm run build
```

Os testes cobrem chegada sem prática, identificação simulada, recepção, entrada agendada, autorização por pessoa e clube, pista opcional, arma reservada, munição própria sem baixa, consumo agregado por lote, saldo insuficiente, cálculo de valores, preços preservados, cobrança por hora, encerramento idempotente, calibres sem alteração documental, sincronização, migração e persistência.

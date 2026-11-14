# Portal do Gestor

Abra `http://127.0.0.1:5188/#/gestor/visao-geral` e escolha **Daniel Keterer · Gestor** no seletor de demonstração. O portal tem layout e menu próprios em `/gestor/*`. O gestor é direcionado à visão geral; Atirador e Instrutor continuam nos seus portais, com menus por papel. URLs diretas de gestão exibem acesso restrito quando o papel não é Gestor. O perfil escolhido persiste após recarregar. Isso simula autorização no frontend; a futura API deve repetir a autorização no servidor.

## Executar

```sh
npm install
node scripts/verify-manager.cjs
npm run build
npm run dev -- --port 5188 --strictPort
```

Neste ambiente, a execução usa `C:\Users\Daniel\AppData\Local\Temp\elo-clubes-demo`, porque o drive compartilhado apresenta erros ao gravar dependências. Os arquivos-fonte principais permanecem na pasta do projeto. A porta 5173 pertence a outro projeto.

## Quatro fluxos

1. **Renovação:** escolha Clube Horizonte. Na visão geral clique em Filiações a vencer, abra Lucas Almeida, registre a baixa de R$ 480 com data e forma fictícias e confirme a renovação até 20/11/2027. Confira cobrança paga, nova vigência e histórico na ficha. O vínculo de Lucas no Serra Azul continua com vencimento em 15/03/2027 e cobrança própria.
2. **Sessão:** em Operação do estande escolha uma pista livre. Selecione Lucas, Rafael Costa e uma arma disponível. A abertura ocupa pista e arma e registra retirada. Encerre a sessão, confirme devolução e consumo de 20 unidades. Confira a pista livre, a arma disponível, a baixa no estoque e a prática Em análise em Habitualidade. O serviço considera o ID da sessão e ignora uma segunda confirmação de encerramento, sem nova baixa, prática ou auditoria.
3. **Manutenção:** no Acervo abra uma arma Disponível. Informe responsável, data e descrição e confirme a manutenção. A arma fica Em manutenção e deixa de aparecer em Abrir sessão. Volte ao histórico e conclua a manutenção; a arma fica Disponível. O cenário também inicia com uma terceira arma em manutenção em cada clube.
4. **Isolamento:** alterne entre Horizonte e Serra Azul no cabeçalho. As fichas de Lucas e os vínculos de Rafael têm IDs separados. Cobranças, sessões, pistas, armas, estoque, documentos, práticas e auditoria são filtrados pelo clube ativo. Os formulários são desmontados ao mudar o clube; o serviço também rejeita IDs de outro clube. Cada clube começa com uma sessão em andamento na Pista 03, deixando duas pistas livres.

## Outras telas

- Estoque: abra um item para consultar movimentos, registrar recebimento com fornecedor, pedido e documento de entrada, ou ajustar o saldo com justificativa obrigatória. Consumo e ajustes não podem produzir saldo negativo.
- Habitualidade: filtre por associado, período e situação; valide internamente ou devolva com justificativa. A trilha mostra responsável e data de cada revisão. A validação é simulada e não atribui regularidade ao CR.
- Equipe: consulte agenda, documento e permissão do vínculo. Marina começa com solicitação no Serra Azul; aceite-a para liberar sua atuação na rotina de gestão desse clube. Um vínculo ativo de instrutor pode ser encerrado sem afetar o outro clube.
- Documentação: consulte CR do clube, licença, protocolo e comprovantes fictícios. A auditoria registra mudanças em filiações, pagamentos, sessões, acervo, estoque, práticas e vínculos.
- Competições: o módulo anterior continua disponível no menu do gestor, com navegação sob `/gestor/competicoes`.

## Dados e limites

`src/manager-domain.ts` contém contratos TypeScript e comandos simulados. `src/Manager.tsx` contém o layout e as telas. `src/portal-access.ts` centraliza a decisão de acesso aos portais. Os dados operacionais persistem no localStorage em `elo-manager-v1`, e o clube ativo em `elo-manager-club`. O adaptador src/manager-sync.ts projeta alterações de vínculo nos portais anteriores e encaminha as práticas geradas por sessões para o histórico do atirador, preservando o clube de origem e as revisões.

A referência operacional é o cenário fixo de **14/11/2026**. “A vencer” abrange até 14/12/2026, incluindo vencidos. As alterações de auditoria usam o horário real da confirmação. Todos os números de série, CRAF, documentos, cobranças e comprovantes são fictícios. Não há integração PF, gov.br ou biometria. A rotina não contém critérios legais ou procedimentos reais de uso de armas.

**Restaurar dados da demonstração**, no menu lateral, reinicia os dados operacionais dos dois clubes. Os dados dos módulos anteriores e de Competições são preservados. Os testes cobrem acesso por papel, pagamentos, renovação, isolamento, ocupação de recursos, devolução, saldo insuficiente, encerramento idempotente, manutenção, estoque, revisão, vínculos, auditoria, persistência e restauração.

## Ampliação dos associados fictícios
O cenário inicial agora possui 29 vínculos por clube (58 no total), com 54 novos vínculos. Em cada clube os novos exemplos cobrem 27 combinações independentes de vigência (vigente, próxima de vencer, vencida), finanças (pago, em atraso, cobrança ainda a vencer) e documentação (validado, em análise, vencido). Seis pessoas adicionais são compartilhadas entre clubes com situações diferentes. A migração em src/member-fixtures.ts acrescenta apenas IDs ausentes, preservando os pagamentos, renovações e alterações existentes, sem duplicar os vínculos ao recarregar.

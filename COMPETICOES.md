# Competições — demonstração

O menu oferece Calendário e inscrições, Resultados por etapa e Ranking da temporada em todos os perfis. O calendário inclui Minhas inscrições para Lucas. Os filtros abrangem entidade, campeonato, temporada, modalidade e recortes esportivos. Busca por atleta está disponível em resultados e ranking. Recortes sem dados exibem uma mensagem.

## Testar

1. Escolha Lucas Almeida e abra Competições. Abra a 4ª etapa, escolha clube representado e recortes, confirme a inscrição e confira Minhas inscrições, abaixo do calendário.
2. Escolha Daniel Keterer (Gestor), Clube Serra Azul, Resultados por etapa. Na 4ª etapa de qualquer modalidade, abra a súmula pendente de Lucas, preencha a justificativa e confirme a homologação simulada.
3. Volte para Lucas e consulte Resultados por etapa e Ranking da temporada. Clique na linha do atleta ou em Ver cálculo para conferir as quatro etapas, os três resultados considerados, o descarte e a soma.
4. Alterne entre Pistola de Ar, Carabina, Trap e IPSC. As colunas, unidades e recortes se adaptam. O gestor do Horizonte não homologa etapas do Serra Azul. Instrutores consultam somente instituições com vínculo ativo.
5. Restaurar competições reinicia somente este módulo. Restaurar cenário inicial reinicia todos os módulos.

## Contratos e regras

`src/competition-domain.ts` define etapas, resultados, pistas, inscrições, regras versionadas e o serviço simulado, com IDs e campos de data adequados à futura API Spring Boot. A persistência usa `elo-competitions-v1` no localStorage. O seletor de perfis não representa autenticação de produção.

As regras têm campeonato, temporada, modalidade, versão, unidade, desempate e agregação. A **Regra da demonstração** soma os três melhores resultados homologados de quatro etapas no mesmo recorte. Não é atribuída a uma entidade oficial. Em IPSC, o hit factor usa pontos líquidos divididos pelo tempo; pontos por pista usam referência fictícia fixa de 6 e o máximo de cada pista. A fórmula detalhada aparece na súmula e não reproduz cálculo oficial IPSC.

O cenário fixo de 14/11/2026 inclui quatro etapas, três atletas e dois clubes em cada modalidade. A 4ª etapa já tem resultados fictícios de teste e uma homologação pendente, embora apareça como próxima no calendário. Inscrição e prazo são simulados no contexto dessa data.

Referências para organização das consultas: [CBTE](https://www.cbte.org.br/campeonato/ranking-categorias/106/), [CBTP](https://www.cbtp.org.br/etapa/resultados-somas/363/) e [LINADE](https://www.linade.com.br/faq/). CBTE e LINADE foram consultadas; a página específica da CBTP não respondeu. Nenhum regulamento oficial foi implementado como regra esportiva.

## Verificar e executar

```sh
npm install
node scripts/verify-competitions.cjs
npm run build
npm run dev -- --port 5188 --strictPort
```

O teste usa armazenamento em memória e verifica as quatro modalidades, soma, descarte, autorização de homologação por clube e papel, persistência, inscrição sem duplicidade e restauração. No ambiente atual a demo roda por uma cópia temporária local, pois o drive compartilhado falha ao instalar dependências.

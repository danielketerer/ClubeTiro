# Elo — demonstração de gestão de clubes

Frontend local em português com React, TypeScript, Vite e React Router. Todos os nomes, registros, documentos, resultados e pagamentos são fictícios. Não transmite dados à PF, não autentica via gov.br e não coleta biometria. A imagem de referência não estava disponível; a interface segue a organização descrita.

## Executar

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite. Para verificar a compilação: `npm run build`. Para visualizar o build: `npm run preview`.

## Testar os fluxos

1. No seletor de demonstração escolha Rafael Costa, mantenha Clube Horizonte, clique em Registrar sessão, escolha Lucas Almeida e confirme. Troque para Ana Martins e revise o registro em Práticas e habitualidade. Valide ou devolva com justificativa. Troque para Lucas: o histórico consolidado mostra a atualização com o clube original.
2. Escolha Marina Lopes e Clube Serra Azul. Em Meus vínculos solicite o vínculo. Troque para Ana, mantenha Serra Azul e aceite em Solicitações de vínculo. Volte para Marina: a agenda e o lançamento desse clube estarão liberados. Rafael começa com acesso ativo aos dois clubes.
3. Escolha Lucas, consulte a pendência em Documentação, alterne para Competições, abra uma etapa e confirme a inscrição simulada. A confirmação aparece no detalhe e no cartão.
4. Teste filtros de clube, situação, busca e período. No perfil de gestor, Relatórios exporta um CSV identificado como simulado com os filtros atuais.
5. Use Restaurar cenário inicial no menu lateral para reiniciar. Os dados são persistidos apenas no localStorage deste navegador. O seletor de perfis é uma ferramenta de demonstração, não autenticação ou autorização de produção.

## Contratos e futura API

`src/domain.ts` define contratos de práticas, revisões, vínculos, documentos, eventos, configuração versionada e estado. O serviço simulado `api` centraliza leitura, persistência e restauração. Pode ser substituído por um cliente HTTP para Spring Boot; em produção, autorização por clube, validação e transições devem ser aplicadas no servidor. Rotas hash permitem abrir páginas sem configuração de fallback no servidor.

A configuração DEMO-1.0 representa uma meta interna ilustrativa de 8 práticas em 2026, somente validadas, em ambos os clubes. Não representa regra legal. A contagem não atribui regularidade ao CR. Nenhuma regra regulatória foi verificada ou implementada; fontes oficiais devem ser verificadas e versionadas antes de implantar critérios regulatórios. A data do cenário é 14/11/2026; documentos e agenda são dados fixos de demonstração. A tipografia usa fontes web opcionais com fallback local; os fluxos funcionam sem conexão após instalar as dependências.

Detalhes do novo módulo e roteiro de testes: [COMPETICOES.md](COMPETICOES.md).

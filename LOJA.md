# Loja e navegação dos portais

O módulo **Loja** fica no primeiro nível do menu do gestor, separado de **Clube de tiro**. A rota inicial é `/gestor/loja`.

Estrutura:

- Catálogo geral
- Armas curtas: Pistolas e Revólveres
- Armas longas: Rifles, Carabinas e Espingardas
- Munições originais: CBC, Sellier & Bellot e ELEY
- Acessórios e EPIs

As telas de grupo incluem todos os seus produtos; as telas de tipo ou marca restringem a consulta. Busca por produto/SKU/marca, filtros por marca, calibre e disponibilidade, além de ordenação por preço ou quantidade. A tabela e o detalhe mostram preço de venda, unidade de comercialização e quantidade. Nas munições, o preço é por caixa fictícia de 50 unidades, com quantidade de caixas e total de unidades indicados separadamente.

Os produtos, modelos, preços e saldos são fictícios; nomes de marcas de munição servem somente para demonstrar a organização. O catálogo de cada clube tem saldo próprio, separado do acervo de locação e do estoque operacional. Esta entrega é um catálogo administrativo de consulta.

## Referências de organização

- [CBC — catálogo e grupos de produtos](https://www.cbc.com.br/cbc/): separação por tipos de armas e marcas importadas.
- [CBC — catálogos](https://www.cbc.com.br/downloads/): catálogos de rifles, carabinas, espingardas e marcas de munição.
- [Baymard — arquitetura de informação](https://baymard.com/blog/information-architecture-ux): categorias com hierarquia clara e filtros, evitando sobreposição e excesso de subdivisões.

A estrutura adotada é uma escolha de organização da demo, não uma classificação jurídica de produtos.

## Usuário e rodapé

Os portais de Gestor, Instrutor e Atirador compartilham `UserMenu` no canto superior direito. O usuário saiu da lateral inferior. O menu mostra a conta fictícia e permite alternar os perfis de demonstração.

`PortalFooter` padroniza o rodapé com nome do produto, identificação do ambiente fictício, direitos autorais e **Desenvolvido por Fluxium8**. Use esse componente nas próximas telas para manter a assinatura.

Contratos e serviço simulado: `src/shop-domain.ts`. Navegação e telas: `src/Shop.tsx`. Usuário e rodapé: `src/PortalChrome.tsx`.

Verificação: `node scripts/verify-shop.cjs` e `npm run build`. Alterações apenas locais, sem commit ou publicação automática.

A Visão geral reúne Pendências do clube e Pendências da loja em contadores clicáveis. Na loja, os filtros de pendência são sem saldo, estoque abaixo do mínimo (somente saldo positivo) e preço não cadastrado. O mínimo demonstrativo é exibido por produto e na mesma unidade comercial do saldo. Não há mais sessões ou listas de atendimentos na Visão geral.

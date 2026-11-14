# Organização do estoque

Na demo local, abra **Clube de tiro → Estoque e compras**.

- **Munições:** Todas, Originais, Insumos de recarga e Recarregadas prontas.
- **EPIs:** protetores auriculares, óculos de proteção e protetores descartáveis.
- **Outros materiais:** alvos, materiais de limpeza e fitas para fixação.
- **Todos os itens:** consulta consolidada, inclusive para os alertas de estoque baixo da visão geral.

Cada aba exibe a quantidade de tipos de item cadastrados, sem somar unidades diferentes. Busca por nome, lote ou calibre e filtro de estoque baixo funcionam dentro da aba. Os saldos, mínimos, lotes, recebimentos, ajustes e históricos continuam exclusivos do clube ativo. O botão Movimentações / receber mantém o fluxo existente, com fornecedor, pedido, documento de entrada e justificativa para ajustes manuais.

Originais e recarregadas prontas são saldos distintos. No encerramento de sessões, ambas podem ser selecionadas pelo lote compatível com o calibre. Insumos e EPIs não aparecem como munições prontas e o serviço rejeita essa utilização, mesmo que um ID de insumo seja informado diretamente.

Os exemplos são acrescentados uma única vez ao carregar os dados antigos, preservando saldos e movimentos já existentes. Restaurar os dados da gestão também restaura as novas categorias. Não há processo de fabricação ou conversão de insumos nesta entrega.

Os contratos estão em `src/stock-types.ts`, a interface em `src/StockInventory.tsx` e os filtros de consumo são usados por `src/ClubSessions.tsx` e `src/session-service.ts`.

Verificações:

```sh
node scripts/verify-sessions.cjs
node scripts/verify-manager.cjs
npm run build
```

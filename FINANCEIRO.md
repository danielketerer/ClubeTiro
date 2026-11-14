# Financeiro

Novo módulo independente de Clube de tiro e Loja, exclusivo do gestor:

- `/gestor/financeiro/funcionarios`: Pagamento de funcionários.
- `/gestor/financeiro/terceiros`: Pagamento de terceiros.
- `/gestor/financeiro/faturamento`: Faturamento de filiações e associados.

As telas exibem total, pago/recebido, em aberto e em atraso. A busca, a situação e o período de vencimento filtram tanto a tabela quanto os indicadores. A referência da demo permanece 14/11/2026.

## Funcionários e terceiros

Cada clube inicia com quatro despesas de funcionários e quatro de terceiros, entre pagas, vencidas e a vencer. Novo lançamento exige favorecido, descrição, competência, vencimento e valor. Registrar pagamento pede data, forma e referência fictícia do comprovante. As confirmações são manuais e simuladas, com auditoria por clube. Repetir a confirmação não duplica o pagamento. Os lançamentos persistem ao recarregar e são restaurados pela opção de restaurar os dados da gestão.

## Faturamento de filiações e associados

Consulta as cobranças já existentes nas fichas. O filtro inicial usa Filiação; é possível consultar Sessão ou todas as origens. Registrar recebimento usa a mesma baixa manual da ficha do associado, atualizando os indicadores e preservando os status de filiação e documentação. Comprovantes são identificados como simulados.

O período considera **vencimento**, não competência contábil ou caixa: o total recebido representa pagamentos das cobranças selecionadas, mesmo que tenham sido pagos fora do período. Não há emissão de nota fiscal, cálculo de tributos, processamento real de folha ou transferência bancária.

Contratos, dados iniciais, comandos e cálculos: `src/finance-domain.ts`. Menu e telas: `src/Finance.tsx`. A persistência usa os dados do gestor em `elo-manager-v1`, com isolamento por clube.

```sh
node scripts/verify-finance.cjs
node scripts/verify-manager.cjs
node scripts/verify-sessions.cjs
npm run build
```

Alterações locais, sem commit ou publicação automática.

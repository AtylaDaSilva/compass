# Constitution.md

## Compass - Finanças Pessoais

Este documento é a fonte única de verdade sobre as regras, convenções e princípios técnicos e de design do projeto **Compass - Finanças Pessoais**. Todo agente (humano ou IA) que contribuir com este repositório deve ler e seguir integralmente as diretrizes descritas aqui.

> ⚠️ **Regra fundamental:** todos os agentes devem sempre seguir as regras definidas em `AGENTS.md`, localizado na raiz do projeto, **sem exceção**. Em caso de conflito entre este documento e `AGENTS.md`, prevalece `AGENTS.md`.

---

## 1. Identidade do Projeto

- **Nome do app:** Compass - Finanças Pessoais
- **Propósito:** aplicação web para gerenciamento de finanças pessoais (controle de receitas, despesas, orçamentos e metas financeiras).
- **Tipo de projeto:** Monorepo (Front-end + Back-end).

---

## 2. Stack Técnica

### 2.1 Estrutura do Monorepo
O projeto é organizado como um **monorepo**, contendo front-end e back-end no mesmo repositório, com responsabilidades claramente separadas.

### 2.2 Front-end
- **Framework:** Next.js
- **Linguagem:** TypeScript (obrigatório — não é permitido código `.js`/`.jsx` em novas implementações)
- **Estilo/UI:** Bootstrap, seguindo o padrão visual definido na seção [4. Padrão de Estilo](#4-padrão-de-estilo)

### 2.3 Back-end
- **Plataforma:** Supabase
- **Banco de dados:** PostgreSQL (via Supabase)
- **Fase inicial:** as APIs consumirão e alimentarão dados a partir de um **banco de dados mock local em JSON**, simulando o comportamento do banco real até a integração completa com Supabase/PostgreSQL. Uma vez que a integração com Supabase/PostgreSQL for completa, será explicitamente declarado aqui e este ponto será retraído.

### 2.4 Comunicação Front-end ↔ Back-end
- Toda comunicação entre front-end e back-end deve ocorrer **exclusivamente através de APIs REST**.
- É **proibido** o acesso direto ao banco de dados (mock ou real) a partir de componentes de UI.
- Todas as definições de API devem residir em arquivos `.ts` dentro de `src/api`.
- Cada domínio/recurso (ex.: transações, categorias, orçamentos) deve ter seu próprio arquivo de API dentro de `src/api` (ex.: `src/api/transactions.ts`, `src/api/budgets.ts`).
- Enquanto o mock em JSON estiver ativo, os arquivos em `src/api` devem simular o comportamento assíncrono de uma API REST real (ex.: retornos via `Promise`), facilitando a futura substituição pela integração real com Supabase sem necessidade de refatorar os componentes consumidores.

---

## 3. Estrutura de Diretórios

```
/
├── AGENTS.md              # Regras obrigatórias para agentes (fonte de verdade)
├── Constitution.md        # Este documento
├── src/
│   ├── api/                # Toda a comunicação REST front-end <-> back-end
│   │   ├── transactions.ts
│   │   ├── budgets.ts
│   │   └── ...
│   ├── components/         # Componentes .tsx específicos de features/páginas
│   │   └── shared/         # Componentes reutilizáveis em toda a aplicação
│   └── ...
└── ...
```

### Regras de organização
- **Novos componentes** devem sempre ter seu arquivo `.tsx` criado em `src/components`.
- **Componentes reutilizáveis** (usados em múltiplas telas/contextos) devem ficar em `src/components/shared`.
- Componentes específicos de uma única feature/página não devem ser colocados em `src/components/shared`.

---

## 4. Padrão de Estilo

### 4.1 Conceito visual: Glassmorphic Dark-Mode First — "Luminous Carbon"

O Compass adota uma identidade visual **dark-mode first**, com estética **glassmórfica** (vidro fosco/translúcido), sob o conceito **Luminous Carbon**: superfícies escuras profundas ("carbono") combinadas com elementos luminosos e vibrantes que criam contraste e hierarquia visual.

### 4.2 Diretrizes de aplicação
- **Modo padrão:** dark mode é o modo primário e deve ser projetado primeiro; o light mode (se existir) é secundário e derivado do dark mode.
- **Superfícies:** fundos escuros (tons de carbono/grafite), com painéis e cards em efeito de vidro fosco (glassmorphism): transparência, blur (`backdrop-filter`), bordas sutis com leve luminosidade e sombras suaves.
- **Luminosidade:** uso de acentos vibrantes/neon (cores de destaque) para dados importantes, CTAs, gráficos e estados (positivo/negativo — ex.: ganhos vs. gastos).
- **Hierarquia:** contraste entre superfícies escuras foscas e elementos luminosos deve guiar o olhar do usuário para informações financeiras críticas (saldos, alertas, metas).
- **Consistência:** todos os componentes construídos com Bootstrap devem ser customizados (via overrides de tema/CSS) para respeitar o padrão Luminous Carbon — não é permitido usar o tema padrão do Bootstrap sem adaptação.
- **Acessibilidade:** apesar do estilo escuro e translúcido, deve-se manter contraste suficiente para legibilidade (WCAG AA como referência mínima).

---

## 5. Governança de Agentes

- Todo agente que atuar neste repositório (assistentes de IA, bots de automação, etc.) deve **ler e seguir `AGENTS.md`** antes de realizar qualquer alteração.
- Este documento (`Constitution.md`) define o "porquê" (princípios, identidade, arquitetura); `AGENTS.md` define o "como" (regras operacionais específicas para agentes).
- Nenhuma exceção às regras de `AGENTS.md` é permitida, mesmo mediante solicitação explícita, salvo atualização formal do próprio `AGENTS.md`.

---

## 6. Princípios Gerais

1. **Separação de responsabilidades:** UI, lógica de API e dados mock/reais nunca devem se misturar.
2. **Tipagem forte:** uso consistente de TypeScript em todo o front-end, evitando `any` sempre que possível.
3. **Preparação para o futuro:** o código deve ser escrito de forma que a migração do mock JSON para Supabase/PostgreSQL seja o mais simples possível.
4. **Consistência visual:** todo novo componente deve respeitar o padrão Luminous Carbon definido neste documento.
5. **Organização previsível:** a estrutura de pastas descrita na seção 3 deve ser respeitada em todas as novas implementações.
6. **Código em inglês:** todo código deve ser escrito exclusivamente em inglês, sem exceções, (incluindo commits no Git) devendo ser escrito em Português (Brasil) apenas texto visível para o usuário.

---

*Este documento deve ser atualizado sempre que houver mudanças estruturais relevantes no projeto (stack, arquitetura, padrão visual ou governança).*

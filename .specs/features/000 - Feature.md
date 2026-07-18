# 000 - [Nome da Feature]

> **Base obrigatória:** esta feature deve estar em conformidade com `Constitution.md` e `AGENTS.md`, localizados na raiz do projeto. Em caso de dúvida ou conflito, esses documentos prevalecem sobre este template.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| **ID da feature** | 000 |
| **Nome** | [Nome curto e descritivo] |
| **Status** | `Rascunho` \| `Em análise` \| `Aprovada` \| `Em desenvolvimento` \| `Concluída` |
| **Responsável** | [Nome/agente responsável] |
| **Data de criação** | [DD/MM/AAAA] |
| **Última atualização** | [DD/MM/AAAA] |

---

## 2. Objetivo

Descreva em 2-3 frases **qual problema financeiro do usuário** esta feature resolve e **por que** ela é relevante para o Compass - Finanças Pessoais.

> Exemplo: *Permitir que o usuário categorize suas transações automaticamente, reduzindo o esforço manual de organização financeira.*

---

## 3. Escopo

### 3.1 Incluído no escopo
- [ ] Item 1
- [ ] Item 2

### 3.2 Fora do escopo
- [ ] Item 1
- [ ] Item 2

---

## 4. User Stories

| Como... | Eu quero... | Para que... |
|---|---|---|
| [tipo de usuário] | [ação desejada] | [benefício/objetivo] |

---

## 5. Critérios de Aceite

- [ ] Critério 1 (comportamento observável e testável)
- [ ] Critério 2
- [ ] Critério 3

---

## 6. Arquitetura e Implementação

> Toda decisão técnica desta seção deve respeitar a stack e as regras definidas em `Constitution.md` (seção 2 - Stack Técnica).

### 6.1 APIs (`src/api`)

Toda comunicação entre front-end e back-end desta feature deve ocorrer via API REST, definida em arquivo(s) `.ts` dentro de `src/api`.

| Arquivo | Endpoint/Método | Descrição | Fonte de dados atual |
|---|---|---|---|
| `src/api/[nome].ts` | `GET /[recurso]` | [descrição] | Mock JSON local |
| `src/api/[nome].ts` | `POST /[recurso]` | [descrição] | Mock JSON local |

> Enquanto o back-end real (Supabase/PostgreSQL) não estiver integrado, estas funções devem consumir/alimentar o banco de dados mock local em JSON, simulando comportamento assíncrono real.

### 6.2 Modelo de dados (mock JSON)

```json
{
  "recurso": {
    "id": "string",
    "campo1": "tipo",
    "campo2": "tipo"
  }
}
```

### 6.3 Componentes (`src/components`)

| Componente | Caminho | Tipo | Reutilizável? |
|---|---|---|---|
| `[NomeComponente]` | `src/components/[Nome].tsx` | Feature-specific | Não |
| `[NomeComponenteShared]` | `src/components/shared/[Nome].tsx` | Compartilhado | Sim |

> Componentes usados por mais de uma feature/tela devem ser criados diretamente em `src/components/shared`, e não migrados posteriormente.

### 6.4 Páginas/Rotas (Next.js)

| Rota | Arquivo | Descrição |
|---|---|---|
| `/[rota]` | `[caminho da página]` | [descrição] |

---

## 7. Design e UX

> Deve seguir o padrão **Glassmorphic Dark-Mode First — Luminous Carbon**, definido em `Constitution.md` (seção 4 - Padrão de Estilo).

- **Telas/estados envolvidos:** [ex.: estado vazio, carregando, erro, sucesso]
- **Elementos de destaque luminoso:** [ex.: saldo positivo/negativo, alertas de orçamento]
- **Componentes Bootstrap customizados necessários:** [ex.: cards, modais, tabelas]
- **Considerações de acessibilidade:** [contraste, leitura de tela, navegação por teclado]

---

## 8. Regras de Negócio

- Regra 1: [descrição]
- Regra 2: [descrição]

---

## 9. Dependências

- [ ] Depende de outra feature: [referência, ex.: `001 - Categorias.md`]
- [ ] Depende de API externa: [nome]
- [ ] Depende de dado/configuração: [descrição]

---

## 10. Riscos e Considerações

| Risco | Impacto | Mitigação |
|---|---|---|
| [descrição do risco] | Alto/Médio/Baixo | [ação de mitigação] |

---

## 11. Checklist de Conformidade com `Constitution.md`

- [ ] Comunicação front/back feita exclusivamente via API REST em `src/api`
- [ ] Novos componentes criados em `src/components`
- [ ] Componentes reutilizáveis colocados em `src/components/shared`
- [ ] Código em TypeScript, sem uso de `.js`/`.jsx`
- [ ] Estilo visual segue o padrão Luminous Carbon (dark-mode first, glassmórfico)
- [ ] Estrutura preparada para futura migração do mock JSON para Supabase/PostgreSQL
- [ ] Regras de `AGENTS.md` seguidas integralmente

---

## 12. Referências

- `Constitution.md` — princípios, stack técnica e padrão de estilo do projeto
- `AGENTS.md` — regras operacionais obrigatórias para agentes
- [Links adicionais: mockups, discussões, issues, etc.]

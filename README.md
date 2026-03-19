# AgendAI — Web

Painel web do AgendAI desenvolvido em Next.js 15 + TypeScript.

## 🛠️ Stack

- **Next.js 15** — App Router, SSR
- **TypeScript** — tipagem estática
- **Tailwind CSS** — estilização
- **Keycloak** — autenticação OAuth2 + JWT
- **Zustand** — gerenciamento de estado
- **React Hook Form + Zod** — formulários e validação
- **Axios** — cliente HTTP
- **Lucide React** — ícones
- **Radix UI** — componentes acessíveis

## 📁 Estrutura
```
src/
├── app/              # App Router — páginas e layouts
├── components/       # Componentes reutilizáveis
├── hooks/            # Custom hooks
├── lib/              # Configurações (axios, keycloak)
├── services/         # Chamadas à API
├── store/            # Estado global (Zustand)
└── types/            # Tipos TypeScript
```

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 20+
- API do AgendAI rodando ([agendai-backend](https://github.com/rafaelaldolizarbe/agendai-backend))
- Keycloak rodando ([agendai-infra](https://github.com/rafaelaldolizarbe/agendai-infra))

### 1. Instala as dependências
```bash
npm install
```

### 2. Configura as variáveis de ambiente
```bash
cp .env.example .env.local
# edite o .env.local com suas configurações
```

### 3. Roda em desenvolvimento
```bash
npm run dev
```

Acesse em `http://localhost:3000`

## 🔐 Autenticação

O painel usa Keycloak com OAuth2. As roles disponíveis são:

| Role | Acesso |
|---|---|
| `owner` | Painel completo |
| `hairdresser` | Agenda e comissões próprias |
| `client` | Agendamento online |

## 🔗 Repositórios relacionados

| Repo | Descrição |
|---|---|
| [agendai-backend](https://github.com/rafaelaldolizarbe/agendai-backend) | API .NET 10 |
| [agendai-infra](https://github.com/rafaelaldolizarbe/agendai-infra) | Docker Compose + NGINX |
| [agendai-flutter](https://github.com/rafaelaldolizarbe/agendai-flutter) | App mobile |

## 🗺️ Roadmap

- [x] Setup inicial Next.js 15
- [x] Autenticação Keycloak
- [ ] Layout e navegação
- [ ] Página de agenda
- [ ] Página de profissionais
- [ ] Página de comissões
- [ ] Página de clientes
- [ ] Relatórios

## 📄 Licença

MIT

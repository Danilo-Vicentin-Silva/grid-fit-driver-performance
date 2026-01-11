# GridFit 🏁

![Logo](./public/logo-placeholder.png)

[![Next.js](https://img.shields.io/badge/Next.js-13-blue)](https://nextjs.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-CSS-green)](https://tailwindcss.com/) [![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen)]

---

## Sobre

**GridFit** é um tracker de treinos pensado para pilotos de kart e entusiastas de performance. Ajuda a estruturar exercícios semanais, registrar treinos concluídos e visualizar progresso com uma interface leve e responsiva — ideal para uso rápido durante sessões de treino.

## Funcionalidades ✨

- ✅ Monitoramento semanal de progresso
- ✅ Biblioteca de treinos categorizada
- ✅ Player de treino com cronômetro e controle de séries
- ✅ Perfil de usuário com metas semanais
- ✅ Autenticação e persistência com Supabase

## Demo 🎬

- Deploy (adicionar link do deploy aqui)

Screenshots / GIFs:

- `public/screenshot-dashboard.png` (substitua pelo seu screenshot ou GIF)

## Stack Tecnológica 🧰

- Next.js (App Router)
- React + Hooks
- TypeScript
- Tailwind CSS
- Supabase (Auth & Postgres)

## Como rodar localmente 🚀

1. Clone o repositório

```bash
git clone https://github.com/your-username/grid-fit-driver-performance.git
cd grid-fit-driver-performance
```

2. Instale dependências

```bash
npm install
```

3. Configure variáveis de ambiente

- Copie `.env.example` para `.env.local` e preencha os valores (NÃO comite chaves reais).

4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

5. Abra no navegador: [`http://localhost:3000`](http://localhost:3000)

## Segurança & Sanitização 🔒

- Nunca comite arquivos de ambiente com segredos (`.env`, `.env.local` etc.).
- Use o arquivo `.env.example` como modelo.
- Não exponha `service_role` keys do Supabase (essas devem permanecer em ambiente server-only).

## Contribuição 🤝

- Abra issues para bugs/feature requests.
- Para contribuições, crie uma branch `feat/xxx` ou `fix/xxx`, faça um PR com descrição clara e testes quando aplicável.

## Licença

MIT Licence.

---

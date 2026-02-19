# Regras de Desenvolvimento - Spec Squeeze
Este documento define os padrões técnicos e de infraestrutura para este projeto. Siga estas diretrizes em cada interação.

---

## 🛠 1. Tecnologias Core
*   **Frontend**: React + Vite + TypeScript.
*   **Estilização**: Tailwind CSS (utilizar apenas classes utilitárias, evitar CSS externo).
*   **Animações**: Framer Motion (para transições dinâmicas e efeitos de scroll).
*   **Icons**: Usar a biblioteca de ícones do Flaticon - npm i @flaticon/flaticon-uicons

---

## 📁 2. Estrutura de Pastas e Caminhos
*   `/src/components/sections`: Componentes de seções inteiras da página (Lp-style).
*   `/src/components/ui`: Componentes atômicos e reutilizáveis (botões, cards, inputs).
*   `/public/assets`: TODAS as imagens, ícones e arquivos estáticos.
*   **Caminhos de Assets**: Sempre use caminhos relativos sem a barra inicial para garantir compatibilidade (ex: `src="assets/foto.png"` em vez de `src="/assets/foto.png"`).

---

## 🚀 3. Deploy e Produção (Docker & VPS)
O projeto é servido via Docker na VPS. Mantenha os seguintes padrões:
*   **Dockerfile**: Deve gerar uma build otimizada e servir via Nginx (ou similar) em ambiente Linux.
*   **build.sh**: Script na raiz que automatiza o `docker build`.
*   **Atualização de Serviço**: Para refletir mudanças na VPS após o `git pull`, use o comando:
    `docker service update --force [NOME_DO_SERVICO]`

---

## 📝 4. Git e Fluxo de Trabalho
*   **Commits**: Frequentes e descritivos em português (ex: `feat: adiciona FAQ`, `fix: alinhamento mobile`).
*   **SEO & Social**: O arquivo `index.html` deve sempre conter meta tags de título, descrição e a imagem de destaque (`og:image`).
*   **Simplicidade**: Mantenha o código limpo, evite bibliotecas pesadas desnecessárias e priorize componentes que rodem bem em produções rápidas.

---

## 🎯 5. Regras de Negócio Padrão
*   **CTAs**: Botões de seções de meio de página devem levar ao formulário de orçamento (`#orcamento`).
*   **Formulário**: Quando a pessoa terminar de preencher o formulário, o botão de enviar deve direcionar as respostas para o email da Spec Squeeze: `contato@specsqueeze.com.br`.
*   **Mobile-First**: A prioridade de validação e refinamento é sempre a experiência mobile.

---
*Instrução para IA: Ao iniciar este projeto, leia a estrutura atual para garantir que os nomes de serviços Docker e IDs de serviço coincidam com as definições acima.*

Vamos construir uma landing page do nosso cliente chamado Spec Squeeze, essa landing page tem o intuito de ser de alta conversão voltada para o público B2B, então vamos usar técnicas avançadas e consolidadas de UX/UI nos componentes da página.

Vamos usar o MCP do Shadcn para criação dos componentes e elementos em toda a landing page.
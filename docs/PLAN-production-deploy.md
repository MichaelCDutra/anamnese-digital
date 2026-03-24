# PLAN: Estrutura de Produção Profissional (V3.0)

Este plano detalha a transição da aplicação "Anamnese Premium" de um protótipo de arquivo único para uma estrutura de nível de mercado, focada em segurança, organização e facilidade de manutenção.

## Objetivos
- **Refatoração**: Separar HTML, CSS e JavaScript em arquivos modulares.
- **Segurança**: Isolar chaves de API do EmailJS usando variáveis de ambiente.
- **Organização**: Estruturar pastas seguindo o padrão da indústria (`src`, `assets`, `config`).
- **Showcase**: Preparar o repositório para uma apresentação profissional no GitHub.

## Fase 1: Reestruturação de Pastas
Criaremos uma estrutura limpa e intuitiva:
- `/` (Root): `index.html`, `README.md`, `.gitignore`, `package.json` (se usar Vite).
- `/src/css/`: `main.css`, `components.css`.
- `/src/js/`: `app.js` (entry), `modules/` (Nav, UI, Media, etc).
- `/assets/`: `img/` (logo.webp), `fonts/`.
- `/config/`: `env.js` (gerenciador de variáveis).

## Fase 2: Refatoração de Código
- **HTML**: Remoção de blocos `<style>` e `<script>`, substituindo por links externos.
- **CSS**: Uso de variáveis CSS avançadas e separação por responsabilidade (Layout vs Componentes).
- **JavaScript**: Conversão da IIFE atual para ES Modules nativos (import/export), facilitando a depuração.

## Fase 3: Segurança e Chaves (Estratégia .env)
Como o GitHub Pages é estático, utilizaremos uma delas:
1. **Config Dinâmico**: Um arquivo `env.js` (ignorado no git) que o usuário preenche localmente.
2. **Vite (Recomendado)**: Uso de um bundler leve para injetar as chaves via `import.meta.env`, permitindo o uso de `.env` real.

## Fase 4: Documentação e Deploy
- Criar um `README.md` de alta qualidade com:
    - Guia de Configuração (como colocar as chaves EmailJS).
    - Stack Tecnológica.
    - Instruções de Deploy no GitHub Pages.

---

## Cronograma de Execução

| Tarefa | Agente Corretor |
| :--- | :--- |
| Criar estrutura de pastas e mover assets | `App-Orchestrator` |
| Extrair CSS e JS para arquivos independentes | `Dev-Frontend` |
| Implementar carregamento dinâmico de chaves | `Sec-Officer` |
| Gerar README.md e .env.example | `Doc-Writer` |

## Checklist de Verificação
- [ ] O projeto funciona perfeitamente sem erros de carregamento (404).
- [ ] A chave de produção está oculta no código versionado.
- [ ] O visual CSS é 100% fiel à versão 2.2.
- [ ] O build de produção (se aplicado) está otimizado.

---
**[OK] Plan created: docs/PLAN-production-deploy.md**

**Próximos Passos:**
- Revisar o plano acima.
- Executar `/create` para iniciar a reestruturação.
- Confirmar se deseja adotar o **Vite** para facilitar o uso de `.env` e minificação.

# 💎  Anamnese Digital

Aplicação web profissional para coleta de fichas de anamnese clínica, desenvolvida para proporcionar uma experiência de luxo, segura e em conformidade com a LGPD.

---

## 🚀 Tecnologias
- **Core**: HTML5 Semântico, Vanilla JavaScript (ES6+).
- **Tooling**: [Vite](https://vitejs.dev/) (Bundler rápido e moderno).
- **Segurança**: CryptoJS (AES para criptografia do rascunho local).
- **Integração**: EmailJS (Envio de prontuário direto ao email da clínica).
- **Documentação**: jsPDF (Geração nativa de prontuário clínico oficial).

## 📁 Estrutura do Projeto
- `src/css/`: Estilos modulares e sofisticados.
- `src/js/modules/`: Lógica de negócio dividida por responsabilidades (Navegação, Validação, Assinatura, etc).
- `public/assets/`: Identidade visual da clínica.
- `.env`: Configurações de API isoladas.

## ⚙️ Como Rodar Localmente
1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone o repositório.
3. No terminal, execute:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz (veja o `.env.example`) e configure suas chaves do EmailJS.
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🔒 Segurança & LGPD
- **Criptografia Client-Side**: Dados salvos no `localStorage` são ofuscados com algoritmos AES.
- **TCLE**: Termo de Consentimento Livre e Esclarecido integrado, exigindo assinatura digital obrigatória antes do envio.
- **Privacidade**: As fotos carregadas são comprimidas localmente (Canvas API) antes do upload para garantir agilidade e conformidade.

---

## 🌎 Deploy no GitHub Pages
Para publicar sua ficha online via GitHub:
1. No arquivo `vite.config.js`, descomente a linha `base: '/SEU-REPOSITORIO/'`.
2. Execute o comando:
   ```bash
   npm run build
   ```
3. Suba a pasta `dist` ou utilize uma **GitHub Action** para deploy automático via Vite.

---
*Desenvolvido com foco em excelência clínica e UX premium.*

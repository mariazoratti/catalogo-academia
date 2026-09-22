# Roadmap - Sistema de Gerenciamento de Academias

## Etapa 1 - Planejamento
- [x] Definir entidade principal: Academia (Nome, Endereço, Preço da mensalidade, Foto)
- [x] Definir stack: Node.js + Express + MongoDB (backend), HTML/CSS/JS puro (frontend)
- [x] Definir estrutura de pastas separando backend e frontend

## Etapa 2 - Backend (API)
- [x] Criar `server.js` com Express e middleware de conexão ao MongoDB
- [x] Criar modelo `Academia` com Mongoose (models/Academia.js)
- [x] Criar rotas CRUD em `routes/academias.js`
  - [x] GET /api/academias
  - [x] GET /api/academias/:id
  - [x] POST /api/academias
  - [x] PUT /api/academias/:id
  - [x] DELETE /api/academias/:id
- [x] Configurar `vercel.json` para deploy serverless
- [ ] Criar cluster no MongoDB Atlas e obter a `MONGODB_URI`
- [ ] Testar rotas localmente com `npm run dev`
- [ ] Fazer deploy do backend na Vercel

## Etapa 3 - Frontend
- [x] Criar `index.html` com formulário de cadastro e listagem
- [x] Criar `style.css` com o layout responsivo
- [x] Criar `script.js` consumindo a API (fetch: GET, POST, PUT, DELETE)
- [ ] Atualizar `API_URL` em script.js com o domínio real do backend na Vercel
- [ ] Fazer deploy do frontend na Vercel (novo projeto separado)

## Etapa 4 - Testes
- [ ] Testar cadastro de academia (POST)
- [ ] Testar listagem (GET)
- [ ] Testar edição (PUT)
- [ ] Testar exclusão (DELETE)
- [ ] Testar tratamento de erros (campos obrigatórios ausentes, IDs inválidos)

## Etapa 5 - Entrega
- [ ] Subir código para o GitHub (repositórios Frontend e Backend)
- [ ] Coletar domínio da Vercel do Frontend
- [ ] Coletar domínio da Vercel do Backend
- [ ] Atualizar `Contexto.md` com status final
- [ ] Revisar `api.md` com exemplos reais de uso

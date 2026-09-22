# Contexto do Projeto

## Resumo
Sistema para gerenciar **academias da cidade**, permitindo cadastrar, listar, editar e excluir academias com os campos: Nome, Endereço, Preço da mensalidade e Foto.

## Stack utilizada
- **Backend:** Node.js + Express + MongoDB (Mongoose), publicado como API na Vercel
- **Frontend:** HTML, CSS e JavaScript puro (sem framework), em pasta separada do backend
- **Banco de dados:** MongoDB Atlas (cloud)

## Estrutura de pastas
```
academia-projeto/
├── backend/
│   ├── models/Academia.js
│   ├── routes/academias.js
│   ├── server.js
│   ├── vercel.json
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Roadmap.md
├── Contexto.md
└── api.md
```

## Status atual
Estrutura completa do backend (modelo, rotas CRUD, servidor, config. da Vercel) e do frontend (interface de cadastro/listagem/edição/exclusão consumindo a API via fetch) já foram geradas. Faltam: configurar o MongoDB Atlas, testar localmente, e realizar os deploys na Vercel (backend e frontend em projetos separados).

## Decisões tomadas
- Campo `foto` armazena apenas uma URL de imagem (não upload de arquivo), para simplificar o escopo do projeto.
- Conexão com o MongoDB é reaproveitada entre invocações (`conectado` em cache) para funcionar corretamente em ambiente serverless da Vercel.
- Validações básicas (campos obrigatórios, preço não-negativo) feitas no schema do Mongoose.

## Próximos passos
Ver `Roadmap.md` para a lista detalhada de tarefas pendentes.

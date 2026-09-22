# Documentação da API - Academias

Base URL (local): `http://localhost:3000/api/academias`
Base URL (produção): `https://SEU-DOMINIO.vercel.app/api/academias`

## Modelo de dados

```json
{
  "_id": "string (gerado automaticamente)",
  "nome": "string (obrigatório)",
  "endereco": "string (obrigatório)",
  "precoMensalidade": "number (obrigatório, >= 0)",
  "foto": "string (URL da imagem, opcional)",
  "createdAt": "data de criação",
  "updatedAt": "data da última atualização"
}
```

## Endpoints

### GET /api/academias
Lista todas as academias cadastradas, mais recentes primeiro.

**Resposta 200:**
```json
[
  {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "nome": "Academia PowerFit",
    "endereco": "Rua das Flores, 123",
    "precoMensalidade": 99.9,
    "foto": "https://exemplo.com/foto.jpg",
    "createdAt": "2026-09-22T12:00:00.000Z",
    "updatedAt": "2026-09-22T12:00:00.000Z"
  }
]
```

### GET /api/academias/:id
Retorna uma academia específica pelo ID.

**Resposta 200:** objeto da academia
**Resposta 404:** `{ "erro": "Academia não encontrada" }`

### POST /api/academias
Cria uma nova academia.

**Body:**
```json
{
  "nome": "Academia PowerFit",
  "endereco": "Rua das Flores, 123",
  "precoMensalidade": 99.9,
  "foto": "https://exemplo.com/foto.jpg"
}
```

**Resposta 201:** objeto criado, com `_id`
**Resposta 400:** erro de validação (ex: campo obrigatório faltando)

### PUT /api/academias/:id
Atualiza uma academia existente.

**Body:** mesmo formato do POST (envie todos os campos a atualizar)

**Resposta 200:** objeto atualizado
**Resposta 404:** `{ "erro": "Academia não encontrada" }`

### DELETE /api/academias/:id
Remove uma academia.

**Resposta 200:** `{ "mensagem": "Academia removida com sucesso" }`
**Resposta 404:** `{ "erro": "Academia não encontrada" }`

## Como testar

### Localmente
1. `cd backend`
2. `npm install`
3. Copie `.env.example` para `.env` e preencha `MONGODB_URI` com a string de conexão do MongoDB Atlas
4. `npm run dev`
5. Teste com Postman/Insomnia ou `curl`, exemplo:
   ```bash
   curl -X POST http://localhost:3000/api/academias \
     -H "Content-Type: application/json" \
     -d '{"nome":"Academia Teste","endereco":"Rua A, 10","precoMensalidade":89.9}'
   ```

### Em produção (Vercel)
1. Suba a pasta `backend` como um projeto separado na Vercel
2. Configure a variável de ambiente `MONGODB_URI` nas configurações do projeto na Vercel
3. Após o deploy, use o domínio gerado como base da API
4. Atualize a constante `API_URL` em `frontend/script.js` com esse domínio

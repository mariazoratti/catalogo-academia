// Ajuste esta URL para o domínio do backend publicado na Vercel
const API_URL = "http://localhost:3000/api/academias";

const form = document.getElementById("academia-form");
const listaEl = document.getElementById("lista-academias");
const mensagemEl = document.getElementById("mensagem");
const formTitulo = document.getElementById("form-titulo");
const btnCancelar = document.getElementById("btn-cancelar");

const campoId = document.getElementById("academia-id");
const campoNome = document.getElementById("nome");
const campoEndereco = document.getElementById("endereco");
const campoPreco = document.getElementById("precoMensalidade");
const campoFoto = document.getElementById("foto");

function mostrarErro(msg) {
  mensagemEl.textContent = msg;
  mensagemEl.hidden = false;
  setTimeout(() => (mensagemEl.hidden = true), 4000);
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function carregarAcademias() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Falha ao carregar academias");
    const academias = await resp.json();
    renderizarLista(academias);
  } catch (err) {
    mostrarErro(err.message);
  }
}

function renderizarLista(academias) {
  listaEl.innerHTML = "";

  if (academias.length === 0) {
    listaEl.innerHTML = "<p>Nenhuma academia cadastrada ainda.</p>";
    return;
  }

  academias.forEach((academia) => {
    const card = document.createElement("div");
    card.className = "academia-card";

    const imgSrc = academia.foto && academia.foto.trim() !== ""
      ? academia.foto
      : "https://via.placeholder.com/300x140?text=Sem+foto";

    card.innerHTML = `
      <img src="${imgSrc}" alt="Foto de ${academia.nome}" onerror="this.src='https://via.placeholder.com/300x140?text=Sem+foto'" />
      <div class="conteudo">
        <h3>${academia.nome}</h3>
        <span>${academia.endereco}</span>
        <span class="preco">${formatarPreco(academia.precoMensalidade)}</span>
      </div>
      <div class="acoes">
        <button class="editar" data-id="${academia._id}">Editar</button>
        <button class="excluir" data-id="${academia._id}">Excluir</button>
      </div>
    `;

    listaEl.appendChild(card);
  });

  listaEl.querySelectorAll(".editar").forEach((btn) =>
    btn.addEventListener("click", () => iniciarEdicao(btn.dataset.id, academias))
  );
  listaEl.querySelectorAll(".excluir").forEach((btn) =>
    btn.addEventListener("click", () => excluirAcademia(btn.dataset.id))
  );
}

function iniciarEdicao(id, academias) {
  const academia = academias.find((a) => a._id === id);
  if (!academia) return;

  campoId.value = academia._id;
  campoNome.value = academia.nome;
  campoEndereco.value = academia.endereco;
  campoPreco.value = academia.precoMensalidade;
  campoFoto.value = academia.foto || "";

  formTitulo.textContent = "Editar Academia";
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetarFormulario() {
  form.reset();
  campoId.value = "";
  formTitulo.textContent = "Cadastrar Academia";
  btnCancelar.hidden = true;
}

async function excluirAcademia(id) {
  if (!confirm("Tem certeza que deseja excluir esta academia?")) return;
  try {
    const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!resp.ok) throw new Error("Falha ao excluir academia");
    await carregarAcademias();
  } catch (err) {
    mostrarErro(err.message);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: campoNome.value.trim(),
    endereco: campoEndereco.value.trim(),
    precoMensalidade: parseFloat(campoPreco.value),
    foto: campoFoto.value.trim(),
  };

  const id = campoId.value;
  const url = id ? `${API_URL}/${id}` : API_URL;
  const metodo = id ? "PUT" : "POST";

  try {
    const resp = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    if (!resp.ok) throw new Error("Falha ao salvar academia");

    resetarFormulario();
    await carregarAcademias();
  } catch (err) {
    mostrarErro(err.message);
  }
});

btnCancelar.addEventListener("click", resetarFormulario);

carregarAcademias();

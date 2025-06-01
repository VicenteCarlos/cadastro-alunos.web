const table = document.getElementById("table");
const createAluno = document.getElementById("save");
const editarAluno = document.getElementById("edit");
const getAlunosByName = document.getElementById("search");
const getAlunosByNameStorage = document.getElementById("input-search");
let btnExcluir, btnEditar;

let alunos = {};

const getAlunos = async () => {
  const data = await fetch("http://localhost:3000/alunos");
  const json = await data.json();

  return json;
};

alunos = await getAlunos();
localStorage.setItem("alunos", JSON.stringify(alunos.data));
const localAlunos = localStorage.getItem("alunos");

const getSearchAluno = localStorage.getItem("searchAluno");

if (getSearchAluno) {
  let tr = document.createElement("tr");
  Object.entries(JSON.parse(getSearchAluno).data).forEach(([key, value]) => {
    if (key === "id") {
      editarAluno.addEventListener("click", () => {
        (async () => await editarAlunoReq(value))();
      });
    }
    const td = document.createElement("td");
    td.append(value);
    tr.appendChild(td);
  });
  const td = document.createElement("td");
  const editar = document.createElement("button");
  editar.style.cursor = "pointer";
  editar.id = "editar";
  editar.className = "editar";
  editar.append("Editar");
  td.appendChild(editar);
  btnEditar = document.querySelector(".editar");
  const tdEx = document.createElement("td");
  const excluir = document.createElement("button");
  excluir.style.cursor = "pointer";
  excluir.id = "excluir";
  excluir.className = "excluir";
  excluir.append("Excluir");
  tdEx.appendChild(excluir);
  tr.appendChild(td);
  tr.appendChild(tdEx);
  table.appendChild(tr);
  btnExcluir = document.querySelector(".excluir");
} else {
  JSON.parse(localAlunos).forEach((aluno) => {
    const tr = document.createElement("tr");
    Object.entries(aluno).forEach(([key, value]) => {
      if (key === "id") {
        editarAluno.addEventListener("click", () => {
          (async () => await editarAlunoReq(value))();
        });
      }

      const td = document.createElement("td");
      td.append(value);
      tr.appendChild(td);
    });
    const td = document.createElement("td");
    const editar = document.createElement("button");
    editar.style.cursor = "pointer";
    editar.className = "editar";
    editar.append("Editar");
    td.appendChild(editar);
    btnEditar = document.querySelector(".editar");

    const tdEx = document.createElement("td");
    const excluir = document.createElement("button");
    excluir.style.cursor = "pointer";
    excluir.className = "excluir";
    excluir.append("Excluir");
    tdEx.appendChild(excluir);
    tr.appendChild(td);
    tr.appendChild(tdEx);
    table.appendChild(tr);
    btnExcluir = document.querySelector(".excluir");
  });
}

let searchAlunoStorage;

getAlunosByNameStorage.onchange = (e) => (searchAlunoStorage = e.target.value);

createAluno.onclick = async (e) => {
  e.preventDefault();
  await fetch("http://localhost:3000/alunos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: inputs[0],
      idade: +inputs[1],
      heigth: +inputs[2],
      cpf: inputs[3],
    }),
  });
  localStorage.removeItem("searchAluno");

  window.location.reload();
};



getAlunosByName.onclick = async () => {
  const data = await fetch(
    `http://localhost:3000/alunos/byName/${searchAlunoStorage}`
  );
  const json = await data.json();

  localStorage.setItem("searchAluno", JSON.stringify(json));

  window.location.reload();
};

// Modal:
const openModalBtn = document.getElementById("register");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const closeModalBtnEditar = document.getElementById("closeModal2");

const modal2 = document.getElementById("modal2");



openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});


const inputs = [
  document.getElementById("nome"),
  document.getElementById("idade"),
  document.getElementById("altura"),
  document.getElementById("cpf"),
];

inputs.forEach((input, i, arr) => {
  input.onchange = (e) => {
    arr[i] = e.target.value;
  };
});


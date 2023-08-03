const btnAdd = document.querySelector('#btn-add');
const inputTarefa = document.querySelector('#input-tarefas');
const listaTarefas = document.querySelector('#lista-tarefas');

document.addEventListener('click', function (e) {
    const evento = e.target;
    if (evento === btnAdd) {
        if (inputTarefa.value) {
            criarTarefa(inputTarefa.value);
            limparInput();
        }
    }
    if (evento.classList.contains('btn-remove')) {
        const tagRemove = evento.parentElement;
        const parent = tagRemove.parentElement
        parent.remove();
    }
});

function criarTarefa(text) {
    const li = criarLi();
    const div = criarDiv(text);
    li.appendChild(div);
    listaTarefas.appendChild(li);
    salvarTarefas();
};

function limparInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
};

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        criarTarefa(inputTarefa.value);
        limparInput();
    }
});

function criarDiv(text) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const button = document.createElement('button');

    p.innerText = text
    button.innerHTML = 'Apagar'
    button.setAttribute('class', 'btn-remove');

    div.appendChild(p);
    div.appendChild(button);

    return div;
};

function criarLi() {
    const li = document.createElement('li');
    return li;
};

function salvarTarefas() {
    const itensTarefas = listaTarefas.querySelectorAll('li');
    const arrayList = [];
    for (const item of itensTarefas) {
        let itemTexto = item.innerText;
        itemTexto = itemTexto.replace('Apagar', '').trim();
        arrayList.push(itemTexto);
    }
    const listJSON = JSON.stringify(arrayList);
    localStorage.setItem('lista', listJSON);
};

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('lista');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criarTarefa(tarefa);
    }
}
adicionaTarefasSalvas();

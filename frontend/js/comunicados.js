const pastaAnterior = document.querySelectorAll('.pasta-anterior');
const addAviso = document.getElementById('add-aviso')
const btnEnviar = document.getElementById('enviar-btn');
const formAviso = document.getElementById('formulario-add');
const containerMain = document.getElementById('container-main');
const iconAdd = document.getElementById('icon-add');
const addTxt = document.getElementById('add-aviso');
const formulario = document.getElementById('formulario');

addTxt.addEventListener('mouseenter', () => {
    iconAdd.style.opacity = '100';
    addTxt.style.color = '#fff';
})

addTxt.addEventListener('mouseleave', () => {
    iconAdd.style.opacity = '';
    addTxt.style.color = '';
})

// Enviar Comunicado
formAviso.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo-area');
    const textArea = document.getElementById('comunicao-textarea');

    try {
        const response = await fetch('http://localhost:8000/api/avisos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: titulo.value, descricao: textArea.value, turma: '66fce960f518a6293edcf293', disciplina: '66f3a6fe8f5f6816e45d9a8d' })
        });

        const data = await response.json();
        formulario.style.visibility = 'hidden';
        titulo.value = '';
        textArea.value = '';
        console.log('Usuário cadastrado:', data);
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
})

// Pasta anterior. Ex: Home > Comunicado
pastaAnterior.forEach((pasta) => {
    pasta.addEventListener('mouseenter', () => {
        pasta.style.color = '#21618C';
    });

    pasta.addEventListener('mouseleave', () => {
        pasta.style.color = '';
    });
});

// Abrir formulário
function AbrirForm() {
    
    
}

addAviso.addEventListener('click', () => {
    formulario.style.visibility = 'hidden'
})


function ClickChange() {
    btnEnviar.style.color = '#fff'
}
function ClickBack() {
    btnEnviar.style.color = ''
}
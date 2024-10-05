if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/frontend/service_worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.error('Falha ao registrar o Service Worker:', error);
            });
    });
}

// Menu
const mouseEnter = (option) => {
    option.addEventListener('mouseenter', () => {
        option.style.opacity = '100'
    })

    option.addEventListener('mouseleave', () => {
        option.style.opacity = ''
    })
}

mouseEnter(document.getElementById('inicio'));
mouseEnter(document.getElementById('comunicados'));
mouseEnter(document.getElementById('conceitos'));
mouseEnter(document.getElementById('alunos'));
mouseEnter(document.getElementById('professor'));
mouseEnter(document.getElementById('coordenador'));
mouseEnter(document.getElementById('turmas'));
mouseEnter(document.getElementById('disciplinas'));
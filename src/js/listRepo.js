const email = document.getElementById('email');
const phone = document.getElementById('phone');
const projectName = document.getElementsByClassName('project-name');
const projectDesc = document.getElementsByClassName('project-desc');
const language = document.getElementsByClassName('language-content');
const url = document.getElementsByClassName('project-item2');
const color = document.getElementsByClassName('color-ball');
const allProjects = document.getElementById('allProjects')

email.addEventListener('click', function () {
    let copy = email.innerHTML;
    navigator.clipboard.writeText(copy).then(() => {
        swal({
            icon: 'info',
            title: 'Copiado',
            text: 'E-mail copiado com sucesso!',
            buttons: false,
            timer: 1500
        });

    }).catch((err) => {
        console.log(err);
    })
});
phone.addEventListener('click', function () {
    let copy = phone.innerHTML;
    navigator.clipboard.writeText(copy).then(() => {
        swal({
            icon: 'info',
            title: 'Copiado',
            text: 'telefone copiado com sucesso!',
            buttons: false,
            timer: 1500
        });
    });
})

function getApiGitHub(){
    fetch('https://api.github.com/users/AzzyPog/repos')
    .then(async res => {

            if(!res.ok){
                throw new Error(res.status);
            }

            var repos = await res.json();

            for(let i= 0; i < repos.length; i++){
                let card = document.createElement('a');
                card.classList.add('project-item2');
                card.href = repos[i].html_url;
                card.target = '__blank';

                if (repos[i].description === null) {
                    repos[i].description = 'Projeto sem descrição.';
                };

                card.innerHTML = `
                <span class="project-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="project-image">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z">
                    </path>
                </svg>
                <span class="project-name">${repos[i].name.toUpperCase()}</span>
            </span>
            <span class="project-desc">${repos[i].description}
            </span>
            <p class="language">
                <span class="color-ball"></span><span class="language-content">${repos[i].language}</span>
            </p>
                `
            allProjects.appendChild(card);

            switch (repos[i].language) {
                case null:
                    language[i].innerHTML = 'Vazio';
                    break;
                case 'JavaScript':
                    color[i].style.backgroundColor = '#efd81d';
                    break;
                case 'CSS':
                    color[i].style.backgroundColor = '#254bdd';
                    break;
                case 'HTML':
                    color[i].style.backgroundColor = '#ff8800';
                    break;
            };
            }
        }).catch(err => console.log(err));
}

getApiGitHub();

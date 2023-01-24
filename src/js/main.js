const projectName = document.getElementsByClassName('project-name');
const projectDesc = document.getElementsByClassName('project-desc');
const language = document.getElementsByClassName('language-content');
const url = document.getElementsByClassName('project-item');
const color = document.getElementsByClassName('color-ball');


function getApiGitHub() {
    fetch('https://api.github.com/users/AzzyPog/repos?sort=created').then(
        async res => {

            if(!res.ok) {
                throw new Error(res.status);
            }

            var repos = await res.json();

            for(let i= 0; i < 2; i++){

                projectName[i].innerHTML = repos[i].name.toUpperCase();
                if(repos[i].description === null){
                    projectDesc[i].innerHTML = 'Projeto sem descrição.';
                } else {
                    projectDesc[i].innerHTML = repos[i].description;
                }
                language[i].innerHTML = repos[i].language;
                url[i].href = repos[i].html_url;

                switch(repos[i].language){
                    case null:
                        language[i].innerHTML = 'Vazio';
                        break;
                    case 'Javascript':
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
        }
    )
}
getApiGitHub();
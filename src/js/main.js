const projectName = document.getElementsByClassName('project-name');
const projectDesc = document.getElementsByClassName('project-desc');
const language = document.getElementsByClassName('language-content');
const url = document.getElementsByClassName('project-item');
const color = document.getElementsByClassName('color-ball');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const typing = document.getElementById('type');
(document.getElementsByClassName('projects')[1].style.marginTop = '40px');

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
var i= 0

function type(){
    let aboutMe = `Olá,  eu me chamo Renato Longo Filho, sou desenvolvedor Web Fullstack e Estudante de graduação na UFRJ pelo curso de ciências matemáticas. Durante o curso, tive oportunidade de entrar em contato com algumas linguagens de programação inicialmente voltada para a resolução de problemas matemáticos, foi assim que acabei criando interesse pela 
    área e comecei a estudar por fora através de cursos como Alura, Dankicode, Rocketseat e etc. Foi através disso que tive minha primeira oportunidade de me desenvolver colocando minhas habilidades em prática com desenvolvimento real através da EJCM, empresa junior na qual eu fiz parte inicialmente como Desevolvedor Back-end.
    `
    if(i < aboutMe.length){
        typing.innerHTML += aboutMe.charAt(i);
        i++;
        setTimeout(type, 30);
    }
}type()

function getApiGitHub() {
    fetch('https://api.github.com/users/AzzyPog/repos?sort=created').then(
        async res => {

            if (!res.ok) {
                throw new Error(res.status);
            }

            var repos = await res.json();

            for (let i = 0; i < projectName.length; i++) {

                projectName[i].innerHTML = repos[i].name.toUpperCase();
                if (repos[i].description === null) {
                    projectDesc[i].innerHTML = 'Projeto sem descrição.';
                } else {
                    projectDesc[i].innerHTML = repos[i].description;
                }
                if(repos[i].language === null){
                    language[i].innerHTML = 'Vazio';
                } else {
                    language[i].innerHTML = repos[i].language;
                }
                url[i].href = repos[i].html_url;


                switch (language[i].innerHTML.toLowerCase()) {
                    case null:
                        language[i].innerHTML = 'Vazio';
                        break;
                    case 'javascript':
                        color[i].style.backgroundColor = '#efd81d';
                        break;
                    case 'css':
                        color[i].style.backgroundColor = '#254bdd';
                        break;
                    case 'html':
                        color[i].style.backgroundColor = '#ff8800';
                        break;
                    case 'typescript':
                        color[i].style.backgroundColor = '#7dd2d1';
                        break;
                    case 'python':
                        color[i].style.backgroundColor = '#3776AB';
                        break;
                };

            }
        }
    )
}
getApiGitHub();
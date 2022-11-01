import picNightMode from '../images/nightMode.png';
import picNightModeOff from '../images/nightModeOff.png';

let nightMode = false;
const darker = 'rgb(20, 20, 20)';
const dark = 'rgb(50, 50, 50)';
const lighter = 'rgb(230, 230, 230)';
const black = "rgb(0, 0, 0)";
const white = 'rgb(255, 255, 255)'

function darken (id, skipBackground, color, skipForeground) {
    document.getElementById(id).style.transitionDuration = "0.5s";
    if (!skipBackground) {
        document.getElementById(id).style.backgroundColor = black;
    } else if (skipBackground && color) {
        document.getElementById(id).style.backgroundColor = color;
    }
    if (!skipForeground) {
        document.getElementById(id).style.color = white;
    }
}
function lighten (id, skipBackground, color, skipForeground) {
    document.getElementById(id).style.transitionDuration = "0.5s";
    if (!skipBackground) {
        document.getElementById(id).style.backgroundColor = white;
    } else if (skipBackground && color) {
        document.getElementById(id).style.backgroundColor = color;
    }
    if (!skipForeground) {
        document.getElementById(id).style.color = black;
    }
}

export function toggleNightMode () {
    if (!nightMode) {
        //page background
        document.body.style.backgroundColor = black;
        //logo header
        lighten('header', true);
        //night mode button
        darken('night-mode-button');
        document.getElementById('night-mode-logo').src = picNightModeOff;
        //searchbar
        darken('searchbar');
        
        //articles
        const articles = document.getElementsByClassName('article');
        for (let article of articles) {
            article.removeChild(document.getElementById(`${article.id}-article-shadow`));
        }
        //article-actions
        const articleActionsDivs = document.getElementsByClassName('article-actions');
        for (let articleActionsDiv of articleActionsDivs) {
            darken(articleActionsDiv.id, true, 'rgb(80, 80, 80)');
        }
        
        

        nightMode = true;
    } else {
        //page background
        darken('header', true);
        document.body.style.backgroundColor = white;
        //night mode button
        lighten('night-mode-button');
        document.getElementById('night-mode-logo').src = picNightMode;
        //searchbar
        lighten('searchbar', true, lighter)

        //articles
        const articles = document.getElementsByClassName('article');
        for (let article of articles) {
            const articleShadow = document.createElement('div')
            articleShadow.id = `${article.id}-article-shadow`;
            article.appendChild(articleShadow);
        }

        //article-actions
        const articleActionsDivs = document.getElementsByClassName('article-actions');
        for (let articleActionsDiv of articleActionsDivs) {
            lighten(articleActionsDiv.id, true, 'rgb(151, 151, 151)', true);
        }



        nightMode = false;        
    }
}
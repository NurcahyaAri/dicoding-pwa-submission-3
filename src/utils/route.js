import Home from '../ui/pages/home';
import About from '../ui/pages/about';
import UefaTeams from '../ui/pages/uefa-teams';
import UefaTeamsDetail from '../ui/pages/uefa-teams/detail';
import FavoriteTeams from '../ui/pages/uefa-teams/fav';

const initNavbar = () => {
    const elems = document.querySelectorAll('.sidenav');
    // eslint-disable-next-line no-undef
    M.Sidenav.init(elems);


    document
        .querySelectorAll('.sidenav a, .topnav a')
        .forEach(elm => {
            elm.addEventListener('click', (evt) => {
                console.log(evt);
                const sidenav = document.querySelector('.sidenav');

                M.Sidenav.getInstance(sidenav).close();
            })
        });
}

/**
 * 
 * @param {string} page 
 */
const loadPage = (page) => {
    switch (true) {
        case /''/g.test(page):
        case /home/g.test(page):
            document.querySelector('#app').innerHTML = Home();
            break;
        case /about/g.test(page):
            document.querySelector('#app').innerHTML = About();
            break;
        case /uefa/g.test(page):
            const breakURL = page.split('/');
            console.log(breakURL);
            if (breakURL.length > 1) {
                document.querySelector('#app').innerHTML = UefaTeamsDetail(breakURL[1]);
            } else {
                document.querySelector('#app').innerHTML = UefaTeams();
            }
            break;
        case /favorite-teams/g.test(page):
            document.querySelector('#app').innerHTML = FavoriteTeams();
            break;

    }
    initNavbar(); 
}

const route = () => {
    const currentLocation = window.location.hash.replace('#/', '') || 'home';
    console.log(currentLocation);
    loadPage(currentLocation);
    window.onhashchange = () => {
        // const location = window.location.pathname;
        const currentLocation = window.location.hash.replace('#/', '') || 'home';
        console.log(currentLocation);
        loadPage(currentLocation);
    }
}

export default route;

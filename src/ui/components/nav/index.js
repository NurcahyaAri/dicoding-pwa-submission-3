const template = `
    <style>
        .img-banner {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }
    </style>
    <li><a class="waves-effect" href="#/home">Home</a></li>
    <li><a class="waves-effect" href="#/uefa">UEFA Teams</a></li>
    <li><a class="waves-effect" href="#/favorite-teams">Tim Favorit</a></li>
    <li><a class="waves-effect" href="#/about">About</a></li>
`;

const renderNavigation = () => template;

export default renderNavigation;

// const loadNav = async () => {
//     // const f = await fetch('src/ui/components/nav/nav.html');
//     const nav = `

//     `;

//     document.querySelectorAll('.topnav, .sidenav').forEach(elm => {
//         elm.innerHTML = nav;
//     });

//     document
//         .querySelectorAll('.sidenav a, .topnav a')
//         .forEach(elm => {
//             elm.addEventListener('click', (evt) => {
//                 const sidenav = document.querySelector('.sidenav');

//                 M.Sidenav.getInstance(sidenav).close();
//             })
//         })
// }

import renderNavigation from '../components/nav';
import injectableContent from './injectable';

const template = `
    <!-- Navigasi -->
    <nav class="black darken-1" role="navigation">
        <div class="nav-wrapper container">
            <a href="#" class="brand-logo" id="logo-container">
                <i><img src="assets/img/logo.jpg" width="64" /></i>
            </a>
            <a href="#" class="sidenav-trigger" data-target="nav-mobile">&#9776;</a>
            <ul class="topnav right hide-on-med-and-down">${renderNavigation()}</ul>
        </div>
    </nav>
    <ul class="sidenav" id="nav-mobile">
        ${renderNavigation()}
    </ul>
    <!-- Akhir Navigasi -->

    ${injectableContent}
`;

export {
  template,
  injectableContent,
};

import injectableContent from './injectable';

const template = `
    <!-- Navigasi -->
    <nav class="black darken-1" role="navigation">
        <div class="nav-wrapper container">
            <a id="back" onclick="return window.history.back();">
                <i class="material-icons">arrow_back</i>
            </a>
        </div>
    </nav>
    <!-- Akhir Navigasi -->

    <div class="container" id="content">
    </div>

    ${injectableContent}
`;

export {
  template,
  injectableContent,
};

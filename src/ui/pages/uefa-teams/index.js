import config from '../../../config/app';
import { template as baseLayout, injectableContent } from '../../container/base_layout';
import Loading from '../../components/loading';

const { baseURL, token } = config;

const template = `
    <div id="container" class="container">
        <div class="row">
            <div id="uefaTeams">
                ${Loading()}
            </div>
        </div>
    </div>
`;

const script = async () => {
  // eslint-disable-next-line no-unused-vars

  if ('caches' in window) {
    console.log('cached');
    // eslint-disable-next-line no-undef
    caches.match(`https://cors-anywhere.herokuapp.com/${baseURL}competitions/2001/teams`).then((response) => {
      console.log(response);
      if (response) {
        response.json().then((data) => {
          const teamsDOM = data.teams.map((item) => {
            const html = `
                <div class="col s12 m4 l4" key="${item.id}">
                    <div class="card">
                        <div 
                        class="card-image" 
                        style="
                            display: flex;
                            flex: 1;
                            justify-content: center;
                            min-height: 250px;
                            max-height: 250px;"
                        >
                            <img src="${item.crestUrl}" style="width: 80%" class="responsive-img" alt="${item.tla}">
                        </div>
                        <div class="card-content">
                            <p>${item.name}</p>
                        </div>
                        <div class="card-action">
                            <a href="#/uefa/${item.id}">Detail</a>
                        </div>
                    </div>
                </div>
            `;
            return html;
          }).join().replaceAll(',', '');
          document.querySelector('#uefaTeams').innerHTML = teamsDOM;
        });
      }
    });
  }

  const f = await fetch(`https://cors-anywhere.herokuapp.com/${baseURL}competitions/2001/teams`, {
    headers: {
      'X-Auth-Token': token,
    },
  });
  const data = await f.json();
  const teamsDOM = data.teams.map((item) => {
    const html = `
            <div class="col s12 m4 l4" key="${item.id}">
                <div class="card">
                    <div 
                    class="card-image" 
                    style="
                        display: flex;
                        flex: 1;
                        justify-content: center;
                        min-height: 250px;
                        max-height: 250px;"
                    >
                        <img src="${item.crestUrl}" style="width: 80%" class="responsive-img" alt="${item.tla}">
                    </div>
                    <div class="card-content">
                        <p>${item.name}</p>
                    </div>
                    <div class="card-action">
                        <a href="#/uefa/${item.id}">Detail</a>
                    </div>
                </div>
            </div>
        `;
    return html;
  }).join().replaceAll(',', '');
  document.querySelector('#uefaTeams').innerHTML = teamsDOM;
};

const renderTemplate = () => {
  const layout = baseLayout.replace(injectableContent, template);

  // inject js
  script();

  return layout;
};

export default renderTemplate;

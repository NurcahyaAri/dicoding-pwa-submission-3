import { getAllTeams } from '../../../utils/db';
import { template as baseLayout, injectableContent } from '../../container/base_layout';


const template = `
    <div id="container" class="container">
        <div class="row">
            <div id="uefaTeams">
            </div>
        </div>
    </div>
`;

const script = async () => {
    getAllTeams().then((data) => {
        document.querySelector('#uefaTeams').innerHTML = "";
        console.log(data);
        let teamsDOM = '';
        if (data.length > 0) {
          teamsDOM = data.map((item) => {
            const html = `
                <style>
                  .button:hover {
                    opacity: 0.7;
                  }
                </style>
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
                        <div 
                          class="card-action"
                          style="
                            display: flex;
                            flex: 1;
                            justify-content: space-between;
                          "
                        >
                            <a href="./teams.html?id=${item.id}">Detail</a>
                            <i 
                              class="material-icons button"
                              style="cursor: pointer;"
                              onclick="deleteDataFavTeams(${item.id})"
                            >delete</i>
                        </div>
                    </div>
                </div>
              `;
            return html;
          }).join().replaceAll(',', '');
        } else {
          teamsDOM = `
            <div style="display: flex; flex: 1;justify-content: center; align-items: center; font-size:14pt">
              <p>Data Kosong  </p>
            </div>
          `;
        }
        
        document.querySelector('#uefaTeams').innerHTML = teamsDOM;
      });
}

const renderTemplate = () => {
    const layout = baseLayout.replace(injectableContent, template);

    // inject js
    script();

    return layout;
}

export default renderTemplate;

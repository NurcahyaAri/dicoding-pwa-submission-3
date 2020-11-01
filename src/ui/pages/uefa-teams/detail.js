import config from '../../../config/app';
import { addToFavorit } from '../../../utils/db';

import {
    template as baseLayout,
    injectableContent
} from '../../container/detail_layout';

const {
    baseURL,
    token
} = config;

const template = `
    <div id="container" class="container">
        <div class="row" style="margin: 21px">
            <div id="content"></div>
        </div>
    </div>

    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red" id="like">
            <i class="large material-icons">thumb_up</i>
        </a>
    </div>
`;

/**
 * 
 * @param {*} params 
 */
const script = async ({
    id
}) => {
    const getTeamsByID = async () => {
        if ('caches' in window) {
            caches.match(`https://cors-anywhere.herokuapp.com/${baseURL}teams/${id}`).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        const teamsDOM = data.squad.map((item) => {
                            const html = `
                                <tr key="${item.id}">
                                    <td>${item.name}</td>
                                    <td>${item.position}</td>
                                    <td>${item.role}</td>
                                </tr>
                      `;
                            return html;
                        }).join().replaceAll(',', '');
    
                        const informationHTML = `
                    <div class="row">
                      <div class="row" >
                        <div class="col s12" style="display: flex; flex: 1; justify-content: center">
                          <img src="${data.crestUrl}" style="wid" alt="${data.name}-name"/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col s12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="col s12 m6 l6">
                                  <table class="striped">
                                    <thead>
                                      <tr>
                                          <th>Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${data.name}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col s12 m6 l6">
                                  <table class="striped">
                                    <thead>
                                      <tr>
                                          <th>Website</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${data.website}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col s12 m6 l6">
                                  <table class="striped">
                                    <thead>
                                      <tr>
                                          <th>Address</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${data.address}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col s12 m6 l6">
                                  <table class="striped">
                                    <thead>
                                      <tr>
                                          <th>Phone</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${data.phone}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col s12 m6 l6">
                                  <table class="striped">
                                    <thead>
                                      <tr>
                                          <th>Short Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${data.shortName}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div class="col s12 m6 l6">
                                  <table class="striped">
                                    <thead>
                                      <tr>
                                          <th>Email</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${data.email}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <table class="striped">
                          <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${teamsDOM}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  `;
                        document.querySelector('#content').innerHTML = informationHTML;
                        return data;
                    });
                }
            });
        }
    
        const f = await fetch(`https://cors-anywhere.herokuapp.com/${baseURL}teams/${id}`, {
            headers: {
                'X-Auth-Token': token,
            },
        });
        const data = await f.json();
    
        const teamsDOM = data.squad.map((item) => {
            const html = `
              <tr key="${item.id}">
                <td>${item.name}</td>
                <td>${item.position}</td>
                <td>${item.role}</td>
              </tr>
              `;
            return html;
        }).join().replaceAll(',', '');
    
        const informationHTML = `
            <div class="row">
              <div class="row" >
                <div class="col s12" style="display: flex; flex: 1; justify-content: center">
                  <img src="${data.crestUrl}" style="wid" alt="${data.name}-name"/>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <div class="card">
                    <div class="card-content">
                      <div class="row">
                        <div class="col s12 m6 l6">
                          <table class="striped">
                            <thead>
                              <tr>
                                  <th>Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.name}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col s12 m6 l6">
                          <table class="striped">
                            <thead>
                              <tr>
                                  <th>Website</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.website}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col s12 m6 l6">
                          <table class="striped">
                            <thead>
                              <tr>
                                  <th>Address</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.address}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col s12 m6 l6">
                          <table class="striped">
                            <thead>
                              <tr>
                                  <th>Phone</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.phone}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col s12 m6 l6">
                          <table class="striped">
                            <thead>
                              <tr>
                                  <th>Short Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.shortName}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="col s12 m6 l6">
                          <table class="striped">
                            <thead>
                              <tr>
                                  <th>Email</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${data.email}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <table class="striped">
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${teamsDOM}
                  </tbody>
                </table>
              </div>
            </div>
          `;
    
        document.querySelector('#content').innerHTML = informationHTML;
        return data;
    }
    const teams = await getTeamsByID();
    const like = document.getElementById("like");
    like.onclick = () => {
        console.log("Tambahkan ke favorit");
        addToFavorit(teams);
    }
};

/**
 * 
 * @param {number} id 
 */
const renderTemplate = (id) => {
    const layout = baseLayout.replace(injectableContent, template);

    // inject js
    script({
        id,
    });

    return layout;
}

export default renderTemplate;

import config from '../../../config/app';
import { addToFavorit, getTeamsByID as getTeamsByIDFromDB } from '../../../utils/db';
import { DoneToast, ErrorToast } from '../../components/toast';
import Loading from '../../components/loading';
import NoInternet from '../../components/nointernet';

import {
  template as baseLayout,
  injectableContent,
} from '../../container/detail_layout';

const {
  baseURL,
  token,
} = config;

const template = `
    <div id="container" class="container">
        <div class="row" style="margin: 21px">
            <div id="content">${Loading()}</div>
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
  id,
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

    const fetchTeamsByID = await fetch(`https://cors-anywhere.herokuapp.com/${baseURL}teams/${id}`, {
      headers: {
        'X-Auth-Token': token,
      },
    });
    const teamsByID = await fetchTeamsByID.json();

    if (teamsByID) {
      const teamsDOM = teamsByID.squad.map((item) => {
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
                        <img src="${teamsByID.crestUrl}" style="wid" alt="${teamsByID.name}-name"/>
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
                                      <td>${teamsByID.name}</td>
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
                                      <td>${teamsByID.website}</td>
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
                                      <td>${teamsByID.address}</td>
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
                                      <td>${teamsByID.phone}</td>
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
                                      <td>${teamsByID.shortName}</td>
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
                                      <td>${teamsByID.email}</td>
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
      return teamsByID;
    }
    document.querySelector('#content').innerHTML = NoInternet();
    return null;
  };
  const teams = await getTeamsByID();
  console.log(teams);
  const like = document.getElementById('like');
  like.onclick = async () => {
    console.log('Tambahkan ke favorit');
    const teamInDB = await getTeamsByIDFromDB(teams.id);
    console.log('teams');
    console.log(teamInDB);

    if (!teamInDB) {
      console.log('ada');
      const res = await addToFavorit(teams);
      console.log(res);
      if (res) {
        DoneToast('Berhasil manambahkan data ke database');
      } else {
        ErrorToast('Error saat menambahkan data ke database');
      }
    } else {
      console.log('tidak ada');
      ErrorToast('Data sudah ada di Database');
    }
  };
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
};

export default renderTemplate;

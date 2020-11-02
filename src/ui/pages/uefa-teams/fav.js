import { getAllTeams, deleteFavorit } from '../../../utils/db';
import { template as baseLayout, injectableContent } from '../../container/base_layout';
import { DoneToast, ErrorToast } from '../../components/toast';

const template = `
    <div id="container" class="container">
        <div class="row">
            <div id="uefaTeams">
            </div>
        </div>
    </div>
`;

const script = async () => {
    const getAllFavTeams = async () => {
        const data = await getAllTeams();
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
                                class="material-icons button delete-teams"
                                data-id="${item.id}"
                                style="cursor: pointer;"
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
    }
    await getAllFavTeams();

    const deleteData = document.getElementsByClassName('delete-teams');
    
    for (const d of deleteData) {
        d.addEventListener('click', async (e) => {
            const c = confirm('Mau menghapus');
            if (c) {
                const id = parseInt(e.target.dataset.id, 10);
                const res = await deleteFavorit(id);
                if (res) {
                    DoneToast('Berhasil menghapus data');
                    // window.location.reload();
                } else {
                    ErrorToast('Gagal menghapus data');
                }
                await script();
            }
        });
    }
}

const renderTemplate = () => {
    const layout = baseLayout.replace(injectableContent, template);

    // inject js
    script();

    return layout;
}

export default renderTemplate;

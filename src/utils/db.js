import idb from '../assets/js/idb';

const dbPromised = idb.open('football-teams', 1, (upgradeDb) => {
    const teamsObjectStore = upgradeDb.createObjectStore('teams', {
        keyPath: 'id'
    });
    teamsObjectStore.createIndex('id', 'id', {
        unique: true
    });
});

function getAllTeams() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction('teams', 'readonly');
                const store = tx.objectStore('teams');
                return store.getAll();
            })
            .then((articles) => {
                resolve(articles);
            });
    });
}

function deleteFavorit(id) {
    console.log(id);
    const c = confirm('Mau menghapus');
    if (c) {
        return new Promise((resolve, reject) => {
            dbPromised.then(function (db) {
                    var tx = db.transaction('teams', 'readwrite');
                    var store = tx.objectStore('teams');
                    store.delete(id);
                    return tx.complete;
                })
                .then(function () {
                    console.log('Item deleted');
                    resolve(true);
                })
                .catch(err => {
                    resolve(false);
                });
        });
    }
}

function addToFavorit(team) {
    dbPromised
        .then((db) => {
            const tx = db.transaction('teams', 'readwrite');
            const store = tx.objectStore('teams');
            console.log(team);
            store.add(team);
            return tx.complete;
        })
        .then(() => {
            alert('Berhasil menambahkan ke favorit');
            console.log('Berhasil ditambahkan ke favorit');
        })
        .catch(err => {
            alert('Data sudah ada!!!');
        });
}

export {
    addToFavorit,
    deleteFavorit,
    getAllTeams,
}

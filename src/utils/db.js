import idb from 'idb';
// import db from '../assets/js/idb';

const dbPromised = idb.open('football', 1, (upgradeDb) => {
    console.log(upgradeDb.objectStoreNames.contains("teams"));
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        const teamsObjectStore = upgradeDb.createObjectStore('teams', {
            keyPath: 'id'
        });
        teamsObjectStore.createIndex('id', 'id', {
            unique: true
        });
    }
});

const getAllTeams = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction('teams', 'readonly');
                const store = tx.objectStore('teams');
                return store.getAll();
            })
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
}

const deleteFavorit = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            var tx = db.transaction(['teams'], 'readwrite');
            var store = tx.objectStore('teams');
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            console.log('Item deleted');
            resolve({status: true, message: 'Success deleting data'});
        })
        .catch(() => reject({status: false, message: 'Failed to delete data'}));
    });
}

const getTeamsByID = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then((db) => {
            const tx = db.transaction('teams', 'readonly');
            const store = tx.objectStore('teams');
            return store.getKey(id);
        })
        .then((data) => resolve(data))
        .catch(err => reject(err));
    })
}

const addToFavorit = (team) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(async (db) => {
                const tx = db.transaction('teams', 'readwrite');
                const store = tx.objectStore('teams');
                console.log(team);
                store.add(team);
                const complete = await tx.complete;
                console.log(complete);
                return team;
            })
            .then((data) => {
                console.log(data);
                resolve(data);
            })
            .catch(err => reject(err));
    })
}

export {
    addToFavorit,
    deleteFavorit,
    getAllTeams,
    getTeamsByID
}

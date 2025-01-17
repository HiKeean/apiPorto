const db = require('./index'); // Mengimpor koneksi database dari index.js


async function getAll() {
    try {
        const [rows] = await db.query('SELECT * FROM Text');
        return rows; 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

async function changeById(id, name){
    try {
        const query = `
            UPDATE Text
            SET name = ?
            WHERE id = ?
        `;
        await db.execute(query, [name, id]);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteById(id){
    try {
        const query = `
            DELETE FROM Text WHERE id = ?
        `
        await db.execute(query, [id]);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

async function addNew(name){
    try {
        const query = `
            INSERT INTO Text(name)
            VALUES(?)
        `
        await db.execute(query, [name]);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAll,
    changeById,
    deleteById,
    addNew
};

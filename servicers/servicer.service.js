const db = require('abc/db');
const Servicer = db.servicer;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    deleteByIds: deleteByIds
};

async function getAll() {
    return await Servicer.find();
}

async function getById(id) {  
    return await Servicer.findById(id);
}

async function create(servicerParam) {
    // validate
    if (await Servicer.findOne({ uid: servicerParam.uid })) {
        throw 'ID "' + servicerParam.uid + '" is already taken';
    }  
  
    if (await Servicer.findOne({ email: servicerParam.email })) {
        throw 'Email "' + servicerParam.name + '" is already taken';
    }    

    const servicer = new Servicer(servicerParam);

    // save servicer
    await servicer.save();
}

async function update(id, servicerParam) { 
    const servicer = await Servicer.findById(id);

    // validate
    if (!servicer) throw 'servicer not found';
    if (servicer.name !== servicerParam.name && await Servicer.findOne({ name: servicerParam.name })) {
        throw 'servicername "' + servicerParam.name + '" is already taken';
    }

    // copy servicerParam properties to servicer
    Object.assign(servicer, servicerParam);

    await servicer.save();
}

async function _delete(id) { 
    await Servicer.findByIdAndRemove(id);
}

async function deleteByIds(ids) { 
    ids.map(async id => {
        await Servicer.findByIdAndRemove(id);
    })    
}
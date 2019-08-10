const {
    MongoClient,
    ObjectId
} = require('mongodb');

// // Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'maoyan';
//连接数据库
const connects = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useNewUrlParser: true //URL字符串解析器
        }, function (err, client) {
            if (err) {
                reject(err);
                throw err;
            } else {
                resolve(client);
            }

        });
    });
}
//查找
const tfind = (params, tab) => {
    return new Promise(async (resolve, reject) => {
        // console.log("Connected successfully to server");
        let client = await connects();
        //连接库
        const db = client.db(dbName);
        //连接表
        const col = db.collection(tab);
        col.find(params).toArray((err, docs) => {
            if (err) {
                reject(err);
                throw err;
            } else {
                // console.log(docs);
                resolve(docs);
            }
        });
        client.close();
    });
}
//修改
const tupdate = (params, params2, tab) => {
    return new Promise(async (resolve, reject) => {
        // console.log("Connected successfully to server");
        let client = await connects();
        //连接库
        const db = client.db(dbName);
        //连接表
        const col = db.collection(tab);
        col.updateOne(params, params2, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        client.close();
    });
}
//删除
const tremove = (params, tab) => {
    return new Promise(async (resolve, reject) => {
        // console.log("Connected successfully to server");
        let client = await connects();
        //连接库
        const db = client.db(dbName);
        //连接表
        const col = db.collection(tab);
        col.deleteOne(params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        client.close();
    });
}
//增加
const tinsert = (params, tab) => {
    return new Promise(async (resolve, reject) => {
        // console.log("Connected successfully to server");
        let client = await connects();
        //连接库
        const db = client.db(dbName);
        //连接表
        const col = db.collection(tab);
        col.insertOne(params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        client.close();
    });
}

module.exports = {
    connects,
    tfind,//查找
    tupdate,//修改
    tremove,//删除
    tinsert,//添加
    // 根据id查找
    ObjectId
}

// var {
//     tfind,
//     tupdate,
//     tremove,
//     tinsert
// } = require('./bd');

//查找
// (async() => {
//     var find = await tfind('', 'login');
//     console.log(find);
// })();

//修改
// (async () => {
//     var update = await tupdate({name : '张三'},{ $set: { psd : 654321 } }, 'login');
//     console.log(update);
// })();

//删除
// (async () => {
//     var remove = await tremove({name : '张三'}, 'login');
//     console.log(remove);
// })();

//添加
// (async () => {
//     var inset = await tinsert({name : '张三',psd : '123456'}, 'login');
//     console.log(inset);
// })();
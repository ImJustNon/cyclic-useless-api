const e = require('express');
const { Client } = require('pg');
const config = require("../../configs/config.js");

const connection = new Client(config.database.postgreSQL);


const connect = async () =>{
    connection.connect((err) => {
        if (err) {
        console.log(`[Database] PostgreSQL : Cannot connect to database ERROR : ${err}`);
        } else {
        console.log("[Database] PostgreSQL : Connected");
        }
    });
}

const query = async ({sql,option}) =>{
    return new Promise(async(resolve, reject) =>{
        // no  sql
        if(typeof sql === "undefined"){
            throw new Error('Please specify SQL command');
        }
        else if(typeof sql === "undefined" && typeof option === "object"){
            throw new Error('Please specify SQL command');
        }

        // sql ok
        if(typeof sql === "string"){
            await connection.query(sql,(err, result) =>{
                if(!err){
                    resolve({
                        result: result,
                        error: err,
                    });
                }
                else {
                    resolve({
                        result: result,
                        error: err,
                    });
                }
            });
        }
        else if(typeof sql === "string" && typeof option === "object"){
            await connection.query(sql, option, (err, result) =>{
                if(!err){
                    resolve({
                        result: result,
                        error: err,
                    });
                }
                else {
                    resolve({
                        result: result,
                        error: err,
                    });
                }
            });
        }
    });
}

exports.connect = connect;
exports.query = query;
exports.connection = connection;
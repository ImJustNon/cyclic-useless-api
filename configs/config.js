require("dotenv").config();

module.exports = {
    app: {
        port: process.env.PORT || 8888,
        domain_url: 'https://useless-api.cyclic.app',
    },
    database: {
        postgreSQL: {
            user: process.env.PG_USER || '',
            host: process.env.PG_HOST || '',
            database: process.env.PG_DATABASE || '',
            password: process.env.PG_PASSWORD || '',
            port: parseInt(process.env.PG_PORT),
            application_name: process.env.PG_APP_NAME || '', 
            ssl: parseBool(process.env.PG_SSL),
        }
    },
}


function parseBool(val) {
    if(val){
        if(val.toLowerCase() === 'true'){
            return true;
        }
        else return false;
    }
    else return false;
}
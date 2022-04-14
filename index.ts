import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda";
import * as _ from 'lodash';
import * as AWS from 'aws-sdk';
import { Knex } from 'knex';
import { json } from "stream/consumers";
// AWS.config.update({region: 'us-east-1'});

const host = 'welldb.cmrswdjikbhu.us-east-1.rds.amazonaws.com';
const user = 'admin';
const password = 'wellplayed';
const port = 3306;
const database = 'dbo';

const connection = {
    ssl: { rejectUnauthorized: false },
    host,
    port,
    user,
    password,
    database
}

const knex = require('knex')({
    client: 'mysql',
    connection
  });

// const app = require('lambda-api')()


// app.get('/users', async (req, res) => {
//     console.log('this is the req', req);
//     let user = await knex.select('*').from('User');
//     return { status: 'OK', body: JSON.stringify(user) }
// });

// app.get('/test', async (req, res) => {
//     return { status: 'OK', body: req }
// });

export const handler: Handler = async (event, context) => {   
    try {
        console.log('PATH', event['path']);
        // await knex('User').select('UserId');
        let user = await knex.select('*').from('User');
        switch(event.rawPath) {
            case '/dev/user':
                return userMethods(event);
            case '/dev/company':
                return companyMethods(event);
            default:
                console.log('test');
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(user) + ' - ' + JSON.stringify(event)
         };
        return response;

    } 
    catch(err) {
        return {
            statusCode: 500,
            body: err
        }
    }

    // return await app.run(event, context);
};

function userMethods(event: any) {
    let response = {
        statusCode: 200,
        body: 'User Works'
    };

    return response;
}

function companyMethods(event: any) {
    let response = {
        statusCode: 200,
        body: 'Company Works'
    };

    return response;
}
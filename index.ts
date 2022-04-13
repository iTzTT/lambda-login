import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from "aws-lambda";
import * as _ from 'lodash';
import * as AWS from 'aws-sdk';
import { Knex } from 'knex';
// AWS.config.update({region: 'us-east-1'});

const host = 'welldb.cmrswdjikbhu.us-east-1.rds.amazonaws.com';
const user = 'admin';
const password = 'wellplayed';
const database = 'welldb';

const connection = {
    ssl: { rejectUnauthorized: false },
    host,
    user,
    password,
    database
}

const knex = require('knex')({
    client: 'mysql',
    connection
  });


export const handler: Handler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResultV2> => {   
    try {
        // await knex.select('UserId').from('User');

        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda 23232323!'),
        };

        knex.raw("SELECT VERSION()").then(
            (version) => response.body = JSON.stringify(version[0][0])
        ).catch((err) => { console.log( err); throw err })
            .finally(() => {
                knex.destroy();
            });
        
        return response;
    } 
    catch(err) {
        return {
            statusCode: 500,
            body: err
        }
    }
};
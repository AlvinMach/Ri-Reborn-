import { Client,Databases,Account,Storage,Teams } from 'appwrite';
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66f571300003d806b1e8');

const databases = new Databases(client)
const account = new Account(client)
const storage = new Storage(client)
const teams = new Teams(client)



export {client,databases,account,storage,teams}
import { databases } from "./config";
import {ID} from "appwrite"

export const db = {}

const collections = [
    {
        dbid:import.meta.env.VITE_DATABASE_ID,
        Id:import.meta.env.VITE_COLLECTION_ID,
        name:"texts"
    },
    {
        dbid:import.meta.env.VITE_DATABASE_ID,
        Id:import.meta.env.VITE_COLLECTION_ID_MESSAGES,
        name:"messages"
    }
]

collections.forEach((col)=>{
    db[col.name] = {
        delete:(id)=>databases.deleteDocument(
            col.dbid,
            col.Id,
            id,
        ),


        create:(payload,permissions,id = ID.unique()) =>databases.createDocument(
            col.dbid,
            col.Id,
            id,
            payload,
            permissions,
        ),

        list:(queries) => databases.listDocuments(
            col.dbid,
            col.Id,
            queries
        )
    }
})
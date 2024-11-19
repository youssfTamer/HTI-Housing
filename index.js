//import ngrok from '@ngrok/ngrok'
import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import { connectDB } from './db/connection.js'
import { initApp } from './src/initApp.js'
dotenv.config({ path: path.resolve('./config/.env') })
const app = express()
const port = 3000
connectDB()

initApp(app, express)
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))


//ngrok.connect({addr:3000,authtoken_from_env:true})
//.then(listener => console.log(`Ingress established at: ${listener.url()}`)); 

import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db/connection.js'
import { initApp } from './src/initApp.js'
dotenv.config({ path: path.resolve('./config/.env') })
const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: 'https://asemyasser.github.io' }));

connectDB()

initApp(app, express)
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))



import express from 'express'
import router from './routes/routes'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(router)
app.listen(process.env.PORT || 3200)

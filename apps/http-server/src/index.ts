

import express from 'express'
import { CreateUserSchema, SigninSchema } from '@repo/common/types'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/signup', async (req, res) => {})

app.post('/signin', async (req, res) => {})

app.listen(3001, () => {
    console.log('Server is running on port 3000')
})
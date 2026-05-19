const express = require('express')

const app = express()

const chamadosRoutes = require('./routes/chamadosRoutes')

app.use(express.json())

app.use(express.static('public'))

app.use('/chamados', chamadosRoutes)

app.listen(3000, () => {
    console.log('Servidor rodando!')
})
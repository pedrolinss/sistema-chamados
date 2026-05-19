const db = require('../database/database')

const express = require('express')

const router = express.Router()


// Listar chamados
router.get('/', (req, res) => {

    db.all('SELECT * FROM chamados', [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                erro: err.message
            })
        }

        res.json(rows)
    })

})

// Criar chamado
router.post('/', (req, res) => {

    const { titulo, descricao } = req.body

    db.run(
        `
        INSERT INTO chamados (titulo, descricao, status)
        VALUES (?, ?, ?)
        `,
        [titulo, descricao, 'aberto'],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                })
            }

            res.status(201).json({
                id: this.lastID,
                titulo,
                descricao,
                status: 'aberto'
            })
        }
    )

})

// Atualizar chamado
router.put('/:id', (req, res) => {

    const id = req.params.id
    const { status } = req.body

    db.run(
        `
        UPDATE chamados
        SET status = ?
        WHERE id = ?
        `,
        [status, id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                })
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensagem: 'Chamado não encontrado'
                })
            }

            res.json({
                mensagem: 'Chamado atualizado'
            })
        }
    )

})

// Deletar chamado
router.delete('/:id', (req, res) => {

    const id = req.params.id

    db.run(
        `
        DELETE FROM chamados
        WHERE id = ?
        `,
        [id],
        function(err) {

            if (err) {
                return res.status(500).json({
                    erro: err.message
                })
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    mensagem: 'Chamado não encontrado'
                })
            }

            res.json({
                mensagem: 'Chamado deletado'
            })
        }
    )

})

module.exports = router
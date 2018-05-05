const express = require('express')
const router = express.Router()
module.exports = router


router.get('/', async (req, res)=>{
    let db = req.db
    let rows = await db('mark')
    res.send({
        status: true,
        marks: rows
    })
})

router.post('/add', async (req, res)=>{
    let db = req.db
})
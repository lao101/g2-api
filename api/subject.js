const express = require('express')
const router = express.Router()
module.exports = router

router.get('/', async (req, res)=>{
    let db = req.db
    let rows = await db('subjects')
    res.send({
        status: true,
        subjects: rows
    })
})
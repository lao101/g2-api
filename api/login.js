const express = require('express')
const router = express.Router()

module.exports = router

router.post('/', (req, res)=>{
    let db = req.db
    let rows = db('user').where({
        user: req.body.user,
        pass: req.body.pass
    })
    if (rows.length === 0) {
        res.send( {ok: true}, {user: rows} )
    } else {
        res.send( {ok: false})
    }
})
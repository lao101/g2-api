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

router.post('/add', async (req, res)=>{
    let db = req.db
    await db('teacher').insert({
        code: req.body.code,
        fname: req.body.fname,
        lname: req.body.lname
    }).then(()=>{
        //let id = ids[0] //ตรงนี้จะ return insert_id ของฟิลด์ auto_increment
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})


// /api/teacher/save/id
router.post('/save/:id', async (req, res) => {
    let db = req.db
    console.log(req.params.id)
    await db('teacher').where({id: req.params.id}).update({
        fname: req.body.fname,
        lname: req.body.lname,
    }).then(()=>{
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})
// router.post('/save', async (req, res) => {
//     let db = req.db
//     await db('teacher').where({id: req.params.id}).update({
//         fname: req.body.fname,
//         lname: req.body.lname,
//     }).then(()=>{
//         res.send({status: true})
//     }).catch(e => res.send({status: false, error: e.message}))
// })

router.delete('/delete/:id', async (req, res)=> {
    await req.db('teacher').where({id: req.params.id}).delete().then(() =>{
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})
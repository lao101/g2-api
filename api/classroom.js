const express = require('express')
const router = express.Router()
module.exports = router


router.get('/', async (req, res)=>{
    let db = req.db
    let rows
    if (req.query.id)
        rows = await db('classrooms').where({'id': req.query.id})
    else
        rows = await db('classrooms')
    res.send({
        status: true,
        classrooms: rows
    })
})

router.post('/add', async (req, res)=>{
    let db = req.db
    await db('classrooms').insert({
        classCode: req.body.classCode,
        classDescript: req.body.classDescript,
    }).then(()=>{
        //let id = ids[0] //ตรงนี้จะ return insert_id ของฟิลด์ auto_increment
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})


// /api/classrooms/save/id
router.post('/save/:id', async (req, res) => {
    let db = req.db
    console.log(req.params.id)
    await db('classrooms').where({id: req.params.id}).update({
        classDescript: req.body.classDescript,
    }).then(()=>{
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})

router.delete('/delete/:id', async (req, res)=> {
    await req.db('classrooms').where({id: req.params.id}).delete().then(() =>{
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})
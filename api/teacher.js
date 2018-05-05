const express = require('express')
const router = express.Router()
module.exports = router


// Student.js
// router.get('/', async (req, res)=>{
//     let db = req.db
//     let rows
//     if (req.query.class) {
//       rows = await db('student').where('class', '=', req.query.class).orderBy('fname');
//     } else {
//       rows = await db('student').orderBy('fname');
//     }
//     res.send({
//       status: true,
//       student: rows
//     })
// })

// router.get('/', async (req, res)=>{
//     let db = req.db
//     let rows
//     if (req.query.id)
//         rows = await db('teacher').where({'id': req.query.id})
//     else
//         rows = await db('teacher')
//     res.send({
//         status: true,
//         teachers: rows
//     })
// })

router.get('/', async (req, res)=>{
    let db = req.db
    let rows = await db('teacher')
    res.send({
        status: true,
        teachers: rows
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

router.delete('/delete/:id', async (req, res)=> {
    await req.db('teacher').where({id: req.params.id}).delete().then(() =>{
        res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
})
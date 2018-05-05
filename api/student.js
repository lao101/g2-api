const express = require('express')
const router = express.Router()

module.exports = router

// /api/student/
router.get('/', async (req, res)=>{
  let db = req.db
  let rows
  if (req.query.class) {
    rows = await db('student').where('class_id', '=', req.query.class).orderBy('fname');
  } else {
    rows = await db('student').orderBy('fname');
  }
  res.send({
    status: true,
    student: rows
  })
})

// /api/student/id/xxx
router.get('/id/:id', async (req, res)=>{
  let db = req.db
  let rows = await db('student')
    .where('id', '=', req.params.id)
  res.send({
    status: true,
    student: rows[0] || {},
  })
})

// /api/student/group/xxx
router.get('/classroom/:id', async (req, res)=>{
  let db = req.db
  let rows = await db('student')
    .where('class_id', '=', req.params.id)
  res.send({
    status: true,
    students: rows || {},
  })
})

//   /api/student/save
router.post('/save', async (req, res) => {
  let db = req.db
  await db('student').where({id: req.body.id}).update({
      fname: req.body.fname,
      lname: req.body.lname,
    })
    res.send({status: true})
})

//   /api/student/save
router.post('/insert', async (req, res) => {
  let db = req.db
  let ids = await db('student').insert({
    code: req.body.code,
    fname: req.body.fname,
    lname: req.body.lname,
    birth: req.body.birth,
    class_id: req.body.cls
  })
  let id = ids[0] //ตรงนี้จะ return insert_id ของฟิลด์ auto_increment
  res.send({status: true})
})


router.delete('/:id', function (req, res) {
  req.db('student').where({id: req.params.id}).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})
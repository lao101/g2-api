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

router.post('/save', async (req, res)=>{
    let db = req.db
    // insert into mark (teachid, sbjid, sid, mark) values(1,1,1, 5), (1,1,2, 6)
    // let sql = 'insert into mark (teachid, sbjid, sid, mark) values '
    //     + req.body.marks.map(x => '(' + req.body.teacherId + ', ' + req.body.subid + ', ' + x.sid + ', ' + x.mark + ')').join(', ')

    try {
        let ids = await db('marks').insert(req.body.marks.map(x => ({
            mark: x.mark,
            grade: x.grade,
            student_id: x.sid,
            teacher_id: req.body.teacherId,
            subjCode: req.body.subid,
        })))
        res.send({ok: true})
    } catch (e) {
        res.send({ok: false, e: e.message})
    }
})
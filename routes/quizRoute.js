const express = require('express')
const { createQuiz, getOneQuiz } = require('../controller/quiz')


const router = express.Router()



router.route('/')
    .post(createQuiz)



router.route('/:id')
    .get(getOneQuiz)





module.exports = router
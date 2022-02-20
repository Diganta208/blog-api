const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Blog = require('../Models/Blog')

router.get('/', async (req, res) => {
   let result = await Blog.find()
      .limit(10)
   if (result.length == 0) res.status(400).send('Threre is no data')
   else res.send(result)
})

router.get('/getByDate', async (req, res) => {
   let result = await Blog.find()
                           .and([{ publishedDate: {$gte : req.query.searchFrom}}, {publishedDate : {$lte : req.query.searchTo}} ])
                            .limit(10)
   if (result.length == 0) res.status(400).send('Threre is no data')
   else res.send(result)
})

router.post('/', async (req, res) => {
   if (!req.body.title || !req.body.blogBody || !req.body.author) res.status(400).send('Please provide post title , author and body')
   const blog = new Blog({
      title: req.body.title,
      blogBody: req.body.blogBody,
      author: req.body.author,
      likeCount: 0
   })

   let result = await blog.save()
   res.send(result)
})

router.put('/', async (req, res) => {
   if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) res.status(400).send('Please provide a valid id')
   else {
      let result = await Blog.findById(req.body.id)
      if (!result) res.status(400).send('Threre is no data with this id')
      else {
         if (req.body.title) result.title = req.body.title
         if (req.body.blogBody) result.blogBody = req.body.blogBody
         let response = await result.save()
         res.send(response)
      }
   }
})

router.put('/incrementLike/', async (req, res) => {
   if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) res.status(400).send('Please provide a valid id')
   else {
      let result = await Blog.findById(req.body.id)
      if (!result) res.status(400).send('Threre is no data with this id')
      else {
         result.likeCount += 1
         let response = await result.save()
         res.send(response)
      }
   }
})

router.put('/decrementLike/', async (req, res) => {
   if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) res.status(400).send('Please provide a valid id')
   else {
      let result = await Blog.findById(req.body.id)
      if (!result) res.status(400).send('Threre is no data with this id')
      else {
         if (result.likeCount > 0) result.likeCount -= 1
         let response = await result.save()
         res.send(response)
      }
   }
})

router.delete('', async (req, res) => {
   if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) res.status(400).send('Please provide a valid id')
   else {
      let result = await Blog.findById(req.body.id)
      if (!result) res.status(400).send('Threre is no data with this id')
      else {
         let response = await Blog.deleteOne({ _id: req.body.id })
         return response
      }
   }
})

module.exports = router
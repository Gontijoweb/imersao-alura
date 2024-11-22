import express from 'express'
import multer from 'multer'
import cors from 'cors'
import {
  createNewPost,
  listPosts,
  updatePost,
  uploadImage,
} from '../controllers/postsController.js'

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ dest: './uploads', storage })

const router = app => {
  app.use(express.json())
  app.use(cors(corsOptions))

  app.get('/api/posts', listPosts)

  app.post('/api/posts', createNewPost)
  app.post('/api/upload', upload.single('image'), uploadImage)
  app.put('/api/upload/:id', updatePost)
}

export default router

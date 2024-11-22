import fs from 'fs'
import { getAllPosts, createPost, updatingPost } from '../models/postsModels.js'
import generateImgDescription from '../services/geminiService.js'

export const listPosts = async (req, res) => {
  const posts = await getAllPosts()
  res.status(200).json(posts)
}

export const createNewPost = async (req, res) => {
  const newPost = req.body

  try {
    const createdPost = await createPost(newPost)
    res.status(200).json(createdPost)
  } catch (error) {
    res.status(500).json({ erro: 'Falha na requisição' })
  }
}

export const uploadImage = async (req, res) => {
  const newPost = {
    descricao: '',
    imgUrl: req.file.originalname,
    alt: '',
  }

  try {
    const createdPost = await createPost(newPost)
    const updatedImage = `uploads/${createdPost.insertedId}.png`

    fs.renameSync(req.file.path, updatedImage)
    res.status(200).json(createdPost)
  } catch (error) {
    res.status(500).json({ erro: 'Falha na requisição' })
  }
}

export const updatePost = async (req, res) => {
  const id = req.params.id
  const urlImage = `http://locahost:3000/uploads/${id}.png`

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await generateImgDescription(imgBuffer)

    const newPost = {
      descricao: descricao,
      imgUrl: urlImage,
      alt: req.body.alt,
    }

    const createdPost = await updatingPost(id, newPost)
    res.status(200).json(createdPost)
  } catch (error) {
    res.status(500).json({ erro: 'Falha na requisição' })
  }
}

import express from 'express'
import router from './src/routes/postsRoutes.js'

const app = express()
app.use(express.static('uploads'))
router(app)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

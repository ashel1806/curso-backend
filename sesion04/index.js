import express from 'express'
import BooksController from './controller.js'

const app = express()

const PORT = 3001

app.use(express.json())

app.get('/api/books', BooksController.getAllBooks)
app.get('/api/books/:id', BooksController.getBookById)
app.post('/api/books', BooksController.createBook)
app.put('/api/books/:id', BooksController.updateBook)
app.delete('/api/books/:id', BooksController.deleteBook)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


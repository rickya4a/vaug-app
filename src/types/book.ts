type Book = {
  id: number
  title: string
  author: string
  genre: string
  description: string
  isbn: number
  published: string
  publisher: string
}

export type ResponseBook = {
  status: string
  code: number
  total: number
  data: Book[]
}
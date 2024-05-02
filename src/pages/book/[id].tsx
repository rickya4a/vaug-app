import { useRouter } from 'next/router'
import { ResponseBook } from "@/types/book";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import dayjs from 'dayjs';

export const getServerSideProps = (async () => {
  const response = await fetch('https://fakerapi.it/api/v1/books')
  const books: ResponseBook = await response.json()

  return { props: { books } }
}) satisfies GetServerSideProps<{ books: ResponseBook }>

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const bookId = router.query ? parseInt((router.query.id) as string, 10) : 0;

  const book = books.data.filter(el => el.id == bookId);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
              <th>ISBN</th>
              <th>Published Date</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
            {book.length > 0 ? book.map((el, i) => {
              return (
                <>
                  <tr>
                    <td>{el.title}</td>
                    <td>{el.author}</td>
                    <td>{el.genre}</td>
                    <td>{el.description}</td>
                    <td>{el.isbn}</td>
                    <td>{dayjs(el.published).format('DD/MM/YYYY')}</td>
                    <td>{el.publisher}</td>
                  </tr>
                </>
              )
            })
              : <p>No data</p>
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}

import { Inter } from "next/font/google";
import Link from 'next/link'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ResponseBook } from "@/types/book";
import dayjs from 'dayjs';

export const getServerSideProps = (async () => {
  const response = await fetch('https://fakerapi.it/api/v1/books', { cache: "default" })

  const books: ResponseBook = await response.json()

  return { props: { books } }
}) satisfies GetServerSideProps<{ books: ResponseBook }>

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
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
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {books.data.map((el, i) => {
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
                    <td>
                      <Link className="text-blue-600 visited:text-purple-600" href={`/book/${el.id}`}>View</Link>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

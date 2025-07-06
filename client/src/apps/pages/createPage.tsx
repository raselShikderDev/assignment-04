import { CreateBook } from "../custom_components/books/addBook"

const CreatePage = () => {
  return (
    <main className="container py-1 0 px-5">
      <h1 className="text-xl font-bold my-4 text-center">📚 Create your Book</h1>
      <div className="">
        <CreateBook/>
      </div>
      
    </main>
  )
}

export default CreatePage

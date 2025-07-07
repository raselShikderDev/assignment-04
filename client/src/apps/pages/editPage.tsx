import EditBook from "../custom_components/books/EditBook"

const EditPage = () => {
  return (
    <main className="container py-1 0 px-5">
      <h1 className="text-xl font-bold my-4 text-center">📚 Edit existing Book details</h1>
      <div className="">
        <EditBook/>
      </div>
    </main>
  )
}

export default EditPage

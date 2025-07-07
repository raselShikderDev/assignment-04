import Loader from "../custom_components/Loader";
import Error from "../custom_components/Error";
import BorrowSummaryCard from "../custom_components/borrow/borrowSummerycard";
import { useGetBorrowSummaryQuery } from "../redux/api/borrowApi";


const BorrowSummaryPage = () => {
const { data, error, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Borrow Summary</h1>
      {data?.data.length === 0 ? (
        <p className="text-center text-muted-foreground">No borrowed books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((item, idx) => (
            <BorrowSummaryCard
              key={idx}
              title={item.book.title}
              isbn={item.book.isbn}
              totalQuantity={item.totalQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowSummaryPage;



// import Loader from "../custom_components/Loader";
// import Error from "../custom_components/Error";
// import BorrowSummaryCard from "../custom_components/borrow/borrowSummerycard"; // UNCOMMENT THIS
// import { useGetBorrowSummaryQuery } from "../redux/api/borrowApi";


// const BorrowSummaryPage = () => {
// const { data, error, isLoading } = useGetBorrowSummaryQuery();
// console.log("Data from API:", data);

//   if (isLoading) return <Loader />;
//   if (error) {
//     console.error("API Error:", error);
//     return <Error />;
//   }

//   return (
//     <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
//       <h1 className="text-2xl font-bold text-center">Borrow Summary</h1>
//       {data?.data.length === 0 ? (
//         <p className="text-center text-muted-foreground">No borrowed books found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data?.data.map((item, idx) => (
//             <BorrowSummaryCard
//               key={idx}
//               title={item.book.title}
//               isbn={item.book.isbn}
//               totalQuantity={item.totalQuantity}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BorrowSummaryPage;
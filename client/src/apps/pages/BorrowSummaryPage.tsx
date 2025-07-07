/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Loader from "../custom_components/Loader";
import Error from "../custom_components/Error";
import BorrowSummaryCard from "../custom_components/borrow/borrowSummerycard";

interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

const BorrowSummaryPage = () => {
  const [summary, setSummary] = useState<BorrowSummaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchSummary = async () => {
    try {
      const res = await fetch("http://localhost:3000/borrow");
      const json = await res.json();
      if (json.success) {
        setSummary(json.data);
      } else {
        setHasError(true);
      }
    } catch (err) {
      setHasError(true);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <Loader />;
  if (hasError) return <Error />;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Borrow Summary</h1>
      {summary.length === 0 ? (
        <p className="text-center text-muted-foreground">No borrowed books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summary.map((item, idx) => (
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

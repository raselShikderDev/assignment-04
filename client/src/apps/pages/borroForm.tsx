import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetBookByIdQuery } from "../redux/api/bookApi";
import { useCreateBorrowMutation } from "../redux/api/borrowApi";
import Loader from "../custom_components/Loader";
import Error from "../custom_components/Error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/components/ui/form";


// Zod schema for validation
const borrowSchema = z.object({
  quantity: z.number().int().positive("Quantity must be greater than 0"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

type BorrowFormType = z.infer<typeof borrowSchema>;

const BorrowForm = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading, isError } = useGetBookByIdQuery(bookId!);
  const [createBorrow, { isLoading: isSubmitting }] = useCreateBorrowMutation();

  const form = useForm<BorrowFormType>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      quantity: 1,
      dueDate: "",
    },
  });

  const onSubmit = async (formData: BorrowFormType) => {
    console.log("Requested for Borrow");
    
    try {
      await createBorrow({
        book: bookId!,
        quantity: formData.quantity,
        dueDate: new Date(formData.dueDate).toISOString(),
      }).unwrap();
      console.log("Successfuly Borrowed a book");
      navigate("/borrow-summary");
    } catch (err) {
      console.error("Borrow Error:", err);
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !bookData?.data) return <Error />;

  const book = bookData.data;

  return (
    <div className="max-w-md mx-auto my-10 p-4 border rounded-md shadow-md space-y-4">
      <h2 className="text-xl"><span className="font-bold">Borrowing Book:</span> {book.title}</h2>
      <p><span className="font-bold">Author:</span> {book.author}</p>
      <p><span className="font-bold">Available Copies:</span>  {book.copies}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BorrowForm;

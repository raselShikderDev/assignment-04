/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Keep this import for z.infer
import { bookFormZod } from "../../zodSchema/booksZodSchemaFront"; // <--- ADD THIS IMPORT BACK!
import { useEditBookMutation, useGetBookByIdQuery } from "src/apps/redux/api/bookApi";
import Loader from "../Loader";
import Error from "../Error";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export type BookFormValues = z.infer<typeof bookFormZod>;

const defaultValues: BookFormValues = {
  title: "",
  author: "",
  genre: "FICTION",
  isbn: "",
  copies: 0,
  description: "",
  available: true,
};


function EditBook() {
  const { id } = useParams<{ id: string }>();
  console.log("EditBook component rendered, ID from params:", id); // LOG 1
  const [editBook] = useEditBookMutation();
    const { data, isLoading, isError, } = useGetBookByIdQuery(id!);
   const { register, handleSubmit, control, reset } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormZod),
    defaultValues,
  });

 useEffect(() => {
  if (data) {
      console.log("Data fetched from API:", data); // LOG 2
    reset(data.data);
  }
}, [data, reset]);
  
  const navigate = useNavigate();
  const onError = (errors: any) => {
    console.error("React Hook Form Errors:", errors); // LOG 3
  };

  const onSubmit = async (data: BookFormValues) => {
    console.log("onSubmit called! Submitted Data: ", data); // LOG 4 - This is the one we want to see
    try {
      if (!id) {
        console.error("Book ID is missing for edit operation. Redirecting.");
        navigate('/books');
        return;
      }
      console.log("Attempting to edit book with ID:", id, "and data:", data); // LOG 5
      await editBook({id: id!, data}).unwrap();
      console.log("Book edited successfully! Navigating to /books."); // LOG 6
      navigate("/books");
    } catch (error) {
      console.error("Edit Book Mutation Error:", error); // LOG 7 - If RTK Query throws error
    }
  };


//   const onSubmit = async (data: BookFormValues) => {
//     console.log("Submitted Data: ", data);
//     try {
//       if (!id) {
//     console.error("Book ID is missing for edit operation.");
//     navigate('/books');
//     return; 
// }
//       await editBook({id, data}).unwrap();
//       navigate("/books");
//     } catch (error) {
//       console.error("Create Book Error:", error);
//     }
//   };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <Card className="w-full mx-auto max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Edit Book</CardTitle>
        <CardDescription>Edit book details</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Input {...register("title")} placeholder="Title" />
            <Input {...register("author")} placeholder="Author" />

            {/* Genre */}
            <Controller
              control={control}
              name="genre"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Genre</SelectLabel>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <Input {...register("isbn")} placeholder="ISBN" />
            <Input {...register("description")} placeholder="Description" />
            <Input
              type="number"
              {...register("copies", { valueAsNumber: true })}
              placeholder="Copies"
            />

            {/* Available */}
            <Controller
              control={control}
              name="available"
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(val === "true")}
                  value={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Availability</SelectLabel>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Out of Stock</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default EditBook;

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
import { z } from "zod"; 
import { bookFormZod } from "../../zodSchema/booksZodSchemaFront"; 
import { useCreateABookMutation } from "src/apps/redux/api/bookApi";
import Loader from "../Loader";
import Error from "../Error";
import { useNavigate } from "react-router-dom";

type BookFormValues = z.infer<typeof bookFormZod>;

const defaultValues: BookFormValues = {
  title: "",
  author: "",
  genre: "FICTION",
  isbn: "",
  copies: 0,
  description: "",
  available: true,
};

export function CreateBook() {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormZod), 
    defaultValues,
  });

  const [createABook, { isLoading, isError }] = useCreateABookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: BookFormValues) => {
    try {
      await createABook(data).unwrap();
      reset();
      navigate("/books");
    } catch (error) {
      console.error("Create Book Error:", error);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <Card className="w-full mx-auto max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Create a Book</CardTitle>
        <CardDescription>Enter your book details</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Input {...register("title")} placeholder="Title" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            <Input {...register("author")} placeholder="Author" />
             {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
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
             {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
            <Input {...register("isbn")} placeholder="ISBN" />
            {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
            <Input {...register("description")} placeholder="Description" />
            <Input
              type="number"
              {...register("copies", { valueAsNumber: true })}
              placeholder="Copies"
            />
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
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
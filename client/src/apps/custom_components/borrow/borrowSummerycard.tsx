import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BorrowSummaryCardProps {
  title: string;
  isbn: string;
  totalQuantity: number;
}

const BorrowSummaryCard = ({ title, isbn, totalQuantity }: BorrowSummaryCardProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>ISBN: {isbn}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-medium">Total Borrowed: {totalQuantity}</p>
      </CardContent>
    </Card>
  );
};

export default BorrowSummaryCard;

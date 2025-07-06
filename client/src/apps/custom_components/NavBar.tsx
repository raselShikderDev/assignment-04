
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "All Books", path: "/books" },
  { label: "Add Book", path: "/create-book" },
  { label: "Borrow Summary", path: "/borrow-summary" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-[#4B3F72] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/books" className="text-xl font-bold tracking-wide">
          📚 MyLibrary
        </Link>

        <nav className="space-x-4 hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium hover:underline",
                location.pathname === link.path ? "underline text-[#FFD166]" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            ☰
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

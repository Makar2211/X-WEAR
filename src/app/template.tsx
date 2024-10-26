import { Toaster } from "react-hot-toast";
import { Footer, Header } from "../shared/components/modules";
import { getAllFilters } from "../shared/services";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const { category: sneakersCategory } = await getAllFilters({
    categoryItem: "sneakers",
  });
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

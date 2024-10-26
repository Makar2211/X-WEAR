import { Metadata } from "next";
import { Container, TabsProfile } from "@/shared/components/elements";

export const metadata: Metadata = {
  title: "X-WEAR | Кабинет",
};

export default async function Profile() {
  return (
    <Container className="mt-10 mb-10 px-5">
      <h2 className="text-2xl font-black ">ЛИЧНЫЙ КАБИНЕТ</h2>

      <TabsProfile />
    </Container>
  );
}

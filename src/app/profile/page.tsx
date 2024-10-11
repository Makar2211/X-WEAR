import { Container, LogOut } from "@/src/shared/components/elements";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession();
  console.log(session, "session");

  if (session === null) {
    redirect("/sign-in");
  }

  return (
    <Container className="mt-10 mb-10">
      <h2 className="text-2xl font-black ">АККАУНТ</h2>

      <p className="text-[#8C8F96]">Ваш логин: {session?.user?.email}</p>
      <p className="text-[#8C8F96]">Ваше имя: {session?.user?.name}</p>
      <LogOut />
    </Container>
  );
}

import {getServerSession} from "next-auth";
import {authOptions} from "@/shared/lib/authOptions";
import {ClientSessionProvider} from "@/shared/providers/ClientSessionProvider";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
      <ClientSessionProvider session={session}>
        {children}
      </ClientSessionProvider>
  );
}

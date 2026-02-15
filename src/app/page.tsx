import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/modules/auth/utils/auth-utils";
import Image from "next/image";

export default async function Home() {
  await requireAuth()
  return (
    <main className="flex justify-center items-center h-screen w-full ">
      <Logout>

      <Button>Logout</Button>
      </Logout>
    </main>
  );
}

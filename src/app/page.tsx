import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/modules/auth/utils/auth-utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  await requireAuth()
  return (
   redirect("/dashboard")
  );
}

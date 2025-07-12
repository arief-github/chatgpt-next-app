import NotesApp from "@/app/components/NotesApp";
import { getServerSession } from "next-auth";
import { Separator } from '@/components/ui/separator'

export default async function Home() {
    const session = await getServerSession()

  return (
      <main>
          <h1 className="text-4xl font-bold">Welcome to Notes App With Server Actions</h1>
          Welcome { session?.user?.name } { session?.user?.email }
          {!session?.user?.name ? (
              <div className="text-center">You need to log in to use this noteApp.</div>
          ) : (
              <>
                  <Separator className="my-5"/>
                  <NotesApp/>
              </>
          )}
      </main>
  );
}

import { getUserTodoListAction } from "@/actions/todos.actions";
import { AddTodoForm } from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import TodoTable from "@/components/TodoTable";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }
  const user = await currentUser();
  if (user?.publicMetadata?.role === "admin") return redirect("/admin");
  const todos = await getUserTodoListAction({ userId });

  return (
    <>
      <main className="container mx-auto px-8 md:px-6 mt-10">
        <div className="flex items-center justify-between mb-4">
          <ModeToggle />
          <div className="flex items-center space-x-2">
            <AddTodoForm userId={userId} />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <style
              dangerouslySetInnerHTML={{
                __html: `
            .cl-internal-l2l775,
            .cl-internal-pe6vm4 {
              display: none !important;
            }
          `,
              }}
            />
          </div>
        </div>
        <TodoTable todos={todos} />
      </main>
    </>
  );
}

import { getAllTodosListAction } from "@/actions/todos.actions";
import AdminDashboardClient from "@/components/AdminDashboardClient";


export default async function AdminDashboard() {
    const todos = await getAllTodosListAction();
    return <AdminDashboardClient todos={todos} />
}

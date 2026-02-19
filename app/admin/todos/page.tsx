import { getAllTodosListAction } from "@/actions/todos.actions";
import AdminTodosControling from "@/components/AdminTodosControling";


export default async function AdminDashboard() {
    const todos = await getAllTodosListAction();
    return <AdminTodosControling todos={todos} />
}

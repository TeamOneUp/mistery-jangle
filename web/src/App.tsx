import {DefaultTodoRepository, TodoRepository} from './repository/TodoRepository.ts'
import {useEffect, useState} from 'react'
import {TodoResponse} from './model/TodoResponse.ts'

interface Props {
    todoRepository: TodoRepository
}

export default function App(
    {
        todoRepository = new DefaultTodoRepository()
    }: Props
) {
    const [todos, setTodos] = useState<TodoResponse[]>([])

    useEffect(() => {
        todoRepository.getTodos()
            .then(res => setTodos(res))
    }, [])

    return (
        <>
            TODO
            {todos.map(todo => (
                <div key={window.crypto.randomUUID()}>
                    {todo.todo}
                </div>
            ))}
        </>
    )
}
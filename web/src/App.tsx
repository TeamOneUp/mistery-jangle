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
    const [text, setText] = useState<string>('')

    useEffect(() => {
        todoRepository.getTodos()
            .then(todos => setTodos(todos))
    }, [])

    async function SaveTodo() {
        const todos = await todoRepository.saveTodo(text)
        setTodos(todos)
        setText('')
    }

    return (
        <>
            TODO
            <label>
                New Todo
                <input
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
            </label>
            {todos.map(todo => (
                <div key={window.crypto.randomUUID()}>
                    {todo.todo}
                </div>
            ))}
            <button onClick={SaveTodo}>保存</button>
        </>
    )
}
import { TodoResponse } from '../../model/TodoResponse.ts';
import {TodoRepository} from '../../repository/TodoRepository.ts'

export class DummyTodoRepository implements TodoRepository {
    getTodos(): Promise<TodoResponse[]> {
        return Promise.resolve([])
    }

    saveTodo(todo: string): Promise<TodoResponse[]> {
        return Promise.resolve([])
    }
}

export class SpyTodoRepository implements TodoRepository {
    getTodos_wasCalled: boolean = false
    getTodos(): Promise<TodoResponse[]> {
        this.getTodos_wasCalled = true
        return Promise.resolve([])
    }

    saveTodo_argument_todo?: string = undefined
    saveTodo(todo: string): Promise<TodoResponse[]> {
        this.saveTodo_argument_todo = todo
        return Promise.resolve([])
    }
}

export class StubTodoRepository implements TodoRepository {
    getTodos_returnValue: Promise<TodoResponse[]> = Promise.resolve([])
    getTodos(): Promise<TodoResponse[]> {
        return this.getTodos_returnValue
    }

    saveTodo_returnValue: Promise<TodoResponse[]> = Promise.resolve([])
    saveTodo(todo: string): Promise<TodoResponse[]> {
        return this.saveTodo_returnValue
    }
}
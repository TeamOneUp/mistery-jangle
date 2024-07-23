import {describe, expect, test} from 'vitest'
import App from '../App.tsx'
import {render, screen} from '@testing-library/react'
import {DummyTodoRepository, SpyTodoRepository, StubTodoRepository} from './repository/TodoRepositoryDoubles.ts'
import {act} from 'react'
import {TodoRepository} from '../repository/TodoRepository.ts'
import userEvent from '@testing-library/user-event'

describe('App', () => {
    test('TODOという文字が表示されている', async () => {
        const dummyTodoRepository = new DummyTodoRepository()
        await renderApp(dummyTodoRepository)


        expect(screen.getByText('TODO')).toBeInTheDocument()
    })

    test('初期レンダリング時にtodoRepositoryのgetTodosを呼ぶ', async () => {
        const spyTodoRepository = new SpyTodoRepository()
        await renderApp(spyTodoRepository)


        expect(spyTodoRepository.getTodos_wasCalled).toBeTruthy()
    })

    test('初期レンダリング時にtodoを表示する', async () => {
        const stubTodoRepository = new StubTodoRepository()
        stubTodoRepository.getTodos_returnValue = Promise.resolve([
            {todo: 'running'},
            {todo: 'swimming'},
        ])
        await renderApp(stubTodoRepository)


        expect(screen.getByText('running')).toBeInTheDocument()
        expect(screen.getByText('swimming')).toBeInTheDocument()
    })

    test('Todoを入力するインプットと保存ボタンが表示されている', async () => {
        await renderApp(new DummyTodoRepository())


        expect(screen.getByLabelText('New Todo')).toBeInTheDocument()
        expect(screen.getByText('保存')).toBeInTheDocument()
    })

    test('保存ボタンを押すとTodoRepositoryのsaveTodoを呼ぶ', async () => {
        const spyTodoRepository = new SpyTodoRepository()
        await renderApp(spyTodoRepository)


        const todoInput = screen.getByLabelText('New Todo')
        await userEvent.type(todoInput, 'ランニング')
        const saveButton = screen.getByText('保存')
        await userEvent.click(saveButton)


        expect(spyTodoRepository.saveTodo_argument_todo).toEqual('ランニング')
    })

    test('登録ボタンを押すと保存されているtodoを全て表示する', async () => {
        const stubTodoRepository = new StubTodoRepository()
        stubTodoRepository.saveTodo_returnValue = Promise.resolve([
            {todo: 'running'},
            {todo: 'swimming'},
            {todo: 'walking'},
        ])
        await renderApp(stubTodoRepository)


        const todoInput = screen.getByLabelText('New Todo')
        await userEvent.type(todoInput, 'dummy')
        const saveButton = screen.getByText('保存')
        await userEvent.click(saveButton)


        expect(screen.getByText('running')).toBeInTheDocument()
        expect(screen.getByText('swimming')).toBeInTheDocument()
        expect(screen.getByText('walking')).toBeInTheDocument()
    })

    test('登録ボタンを押すとフォームの中のテキストが消える', async () => {
        await renderApp(new DummyTodoRepository())


        const todoInput = screen.getByLabelText('New Todo') as HTMLInputElement
        await userEvent.type(todoInput, 'training')
        const saveButton = screen.getByText('保存')
        await userEvent.click(saveButton)


        expect(todoInput.value).toEqual('')
    })

    async function renderApp(todoRepository: TodoRepository) {
        await act(async () => {
            render(<App todoRepository={todoRepository}/>)
        })
    }
})
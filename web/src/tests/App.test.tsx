import {describe, expect, test} from 'vitest'
import App from '../App.tsx'
import {render, screen} from '@testing-library/react'
import {DummyTodoRepository, SpyTodoRepository, StubTodoRepository} from './repository/TodoRepositoryDoubles.ts'
import {act} from 'react'
import {TodoRepository} from '../repository/TodoRepository.ts'

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

    async function renderApp(todoRepository: TodoRepository) {
        await act(async () => {
            render(<App todoRepository={todoRepository}/>)
        })
    }
})
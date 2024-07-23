import {describe, expect, test} from 'vitest'
import {DefaultTodoRepository} from '../../repository/TodoRepository.ts'
import {SpyHttp, StubHttp} from '../http/HttpDoubles.ts'

describe('TodoRepository', () => {
    describe('getTodos', () => {
        test('httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const todoRepository = new DefaultTodoRepository(spyHttp)


            todoRepository.getTodos()


            expect(spyHttp.get_argument_url).toEqual('/api/todos')
        })

        test('httpの返り値をキャストして返す', async () => {
            const stubHttp = new StubHttp()
            stubHttp.get_returnValue = Promise.resolve([
                { todo: '歯を磨く' },
                { todo: '服を洗濯する' },
            ])
            const todoRepository = new DefaultTodoRepository(stubHttp)


            const todos = await todoRepository.getTodos()


            expect(todos.length).toEqual(2)
            expect(todos).toEqual([{ todo: '歯を磨く' }, { todo: '服を洗濯する' }])
        })
    })

    describe('saveTodo', () => {
        test('httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const todoRepository = new DefaultTodoRepository(spyHttp)


            todoRepository.saveTodo('筋トレをする')


            expect(spyHttp.post_argument_url).toEqual('/api/todos')
            expect(spyHttp.post_argument_body).toEqual('筋トレをする')
        })

        test('httpの戻り値をキャストして返す', async () => {
            const stubHttp = new StubHttp()
            stubHttp.post_returnValue = Promise.resolve([
                { todo: '鉛筆を削る' },
                { todo: '絵本を読む' },
            ])
            const todoRepository = new DefaultTodoRepository(stubHttp)


            const todos = await todoRepository.saveTodo('dummy')


            expect(todos.length).toEqual(2)
            expect(todos).toEqual([{ todo: '鉛筆を削る' }, { todo: '絵本を読む' }])
        })
    })




})
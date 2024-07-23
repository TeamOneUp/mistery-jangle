package com.minspo.mistery_jangle

import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import kotlin.test.assertEquals

@DataJpaTest
class DefaultTodoServiceTest {
    @Autowired
    private lateinit var todoRepository: TodoRepository

    @Nested
    inner class GetTodos {
        @Test
        fun getTodosを呼ぶとDBに保存されている全てのTodoを返す() {
            todoRepository.saveAll(listOf(
                TodoRecord(todo = "髪を切る"),
                TodoRecord(todo = "自転車に乗る"),
            ))


            val todoService = DefaultTodoService(todoRepository)
            val todos = todoService.getTodos()


            assertEquals(2, todos.size)
            assertEquals("髪を切る", todos.first().todo)
            assertEquals("自転車に乗る", todos.last().todo)
        }
    }

    @Nested
    inner class SaveTodo {
        @Test
        fun saveTodoを呼ぶとDBにTodoを保存し全てのTodoを返す() {
            todoRepository.saveAll(listOf(
                TodoRecord(todo = "風呂掃除をする"),
                TodoRecord(todo = "机を拭く"),
            ))
            val todoService = DefaultTodoService(todoRepository)


            val todoRecords = todoService.saveTodo("髪を乾かす")
            val savedTodoRecords = todoRepository.findAll()


            assertEquals(3, todoRecords.size)
            assertEquals("風呂掃除をする", todoRecords.first().todo)
            assertEquals("髪を乾かす", todoRecords.last().todo)
            assertEquals("風呂掃除をする", savedTodoRecords.first().todo)
            assertEquals("髪を乾かす", savedTodoRecords.last().todo)
        }
    }
}
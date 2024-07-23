package com.minspo.mistery_jangle

import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@SpringBootTest
class TodoControllerTest {
    lateinit var todoController: TodoController

    @Nested
    inner class GetTodos {
        @Test
        fun getTodosが呼ばれる() {
            val spyTodoService = SpyTodoService()
            todoController = TodoController(spyTodoService)
            val mockMvc = buildMockMvc(todoController)


            val result = mockMvc.perform(get("/api/todos"))


            result.andExpect(status().isOk)
            assertTrue(spyTodoService.getTodos_wasCalled)
        }

        @Test
        fun getTodosの戻り値を返す() {
            val stubTodoService = StubTodoService()
            stubTodoService.getTodos_returnValue = listOf(
                TodoRecord(todo = "カレーを食べる"),
                TodoRecord(todo = "お皿を片付ける"),
            )
            todoController = TodoController(stubTodoService)
            val mockMvc = buildMockMvc(todoController)


            val result = mockMvc.perform(get("/api/todos"))


            result
                .andExpect(status().isOk)
                .andExpect(jsonPath("$[0].todo", equalTo("カレーを食べる")))
                .andExpect(jsonPath("$[1].todo", equalTo("お皿を片付ける")))
        }


    }

    @Nested
    inner class SaveTodo {
        @Test
        fun todoServiceのsaveTodoを正しく呼ぶ() {
            val spyTodoService = SpyTodoService()
            todoController = TodoController(spyTodoService)
            val mockMvc = buildMockMvc(todoController)


            val result = mockMvc.perform(
                post("/api/todos")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content("朝早起きする")
                    .characterEncoding("UTF-8")
            )


            result.andExpect(status().isCreated)
            assertEquals("朝早起きする", spyTodoService.saveTodo_argument_todo)
        }

        @Test
        fun todoServiceのsaveTodoの戻り値を返す() {
            val stubTodoService = StubTodoService()
            stubTodoService.saveTodo_returnValue = listOf(
                TodoRecord(todo = "ゴミ袋を取り替える"),
                TodoRecord(todo = "髪を切る"),
            )
            todoController = TodoController(stubTodoService)
            val mockMvc = buildMockMvc(todoController)


            val result = mockMvc.perform(
                post("/api/todos")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content("dummy")
                    .characterEncoding("UTF-8")
            )


            result
                .andExpect(status().isCreated)
                .andExpect(jsonPath("$[0].todo", equalTo("ゴミ袋を取り替える")))
                .andExpect(jsonPath("$[1].todo", equalTo("髪を切る")))
        }
    }

    private fun buildMockMvc(todoController: TodoController): MockMvc {
        val mockMvc = MockMvcBuilders
            .standaloneSetup(todoController)
            .build()
        return mockMvc
    }
}


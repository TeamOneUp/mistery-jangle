package com.minspo.mistery_jangle

class SpyTodoService: TodoService {
    var getTodos_wasCalled: Boolean = false
    override fun getTodos(): List<TodoRecord> {
        getTodos_wasCalled = true
        return emptyList()
    }

    var saveTodo_argument_todo: String? = null
    override fun saveTodo(todo: String): List<TodoRecord> {
        saveTodo_argument_todo = todo
        return emptyList()
    }
}

class StubTodoService: TodoService {
    var getTodos_returnValue: List<TodoRecord> = emptyList()
    override fun getTodos(): List<TodoRecord> {
        return getTodos_returnValue
    }

    var saveTodo_returnValue: List<TodoRecord> = emptyList()
    override fun saveTodo(todo: String): List<TodoRecord> {
        return saveTodo_returnValue
    }

}
package com.minspo.mistery_jangle

import org.springframework.stereotype.Service

interface TodoService {
    fun getTodos(): List<TodoRecord>
    fun saveTodo(todo: String): List<TodoRecord>
}

@Service
class DefaultTodoService(
    private val todoRepository: TodoRepository
): TodoService {
    override fun getTodos(): List<TodoRecord> {
        val todoRecords = todoRepository.findAll()
        return todoRecords
    }

    override fun saveTodo(todo: String): List<TodoRecord> {
        todoRepository.save(TodoRecord(todo = todo))
        return todoRepository.findAll()
    }
}
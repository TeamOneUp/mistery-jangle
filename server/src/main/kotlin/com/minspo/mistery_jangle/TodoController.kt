package com.minspo.mistery_jangle

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/todos")
class TodoController(
    private val todoService: TodoService
) {
    @GetMapping
    fun getTodos(): List<TodoRecord> {
        return todoService.getTodos()
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun saveTodo(@RequestBody todo: String): List<TodoRecord> {
        return todoService.saveTodo(todo)
    }
}
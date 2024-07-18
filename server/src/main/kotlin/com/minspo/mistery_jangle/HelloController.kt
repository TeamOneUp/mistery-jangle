package com.minspo.mistery_jangle

import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/hello")
class HelloController {
    val messages: MutableList<String> = mutableListOf()

    @GetMapping
    fun hello(): String {
        return """
            "Hello World!"
        """.trimIndent()
    }

    @PostMapping("/messages")
    fun receiveMessage(@RequestBody message: String) {
        println(message)
        messages.add(message)
    }

    @GetMapping("/message")
    fun getAllMessages(): List<String> {
        return messages
    }
}
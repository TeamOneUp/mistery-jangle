package com.minspo.mistery_jangle

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface TodoRepository: JpaRepository<TodoRecord, UUID> {
}
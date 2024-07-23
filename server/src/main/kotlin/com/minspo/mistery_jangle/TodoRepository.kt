package com.minspo.mistery_jangle

import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
@Transactional
interface TodoRepository: JpaRepository<TodoRecord, UUID> {
}
import Foundation


protocol TodoRepository {
    func getTodos() async throws -> [TodoResponse]
}

class DefaultTodoRepository: TodoRepository {
    func getTodos() async throws -> [TodoResponse] {	
        return []
    }
}

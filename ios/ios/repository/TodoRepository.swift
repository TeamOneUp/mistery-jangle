import Foundation

protocol TodoRepository {
    func getTodos() async -> [TodoResponse]
}

class DefaultTodoRepository: TodoRepository {
    func getTodos() async -> [TodoResponse] {
        return []
    }
    
    
}

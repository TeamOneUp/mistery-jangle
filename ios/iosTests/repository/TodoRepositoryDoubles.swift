import Foundation
@testable import ios

class SpyTodoRepository: TodoRepository {
    var getTodos_wasCalled: Bool = false
    func getTodos() async -> [TodoResponse] {
        getTodos_wasCalled = true
        return []
    }
    
    
}

class StubTodoRepository: TodoRepository {
    var getTodos_returnValue: [TodoResponse] = []
    func getTodos() async -> [TodoResponse] {
        return getTodos_returnValue
    }
}

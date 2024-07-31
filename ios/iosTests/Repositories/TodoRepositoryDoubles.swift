import Foundation
@testable import ios

class DummyTodoRepository: TodoRepository {
    func getTodos() async throws -> [TodoResponse] {
        return []
    }
}

class SpyTodoRepository: TodoRepository {
    var getTodos_wasCalled = false
    func getTodos() async throws -> [TodoResponse] {
        getTodos_wasCalled = true
        return []
    }
}

class StubTodoRepository: TodoRepository {
    var getTodos_returnValue: [TodoResponse] = []
    func getTodos() async throws -> [ios.TodoResponse] {
        return getTodos_returnValue	
    }
    
}

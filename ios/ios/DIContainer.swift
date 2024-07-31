import Foundation

struct DIContainer {
    let todoRepository: TodoRepository
    let dispatching: Dispatching
    
    static func make() -> DIContainer {
        return DIContainer(
            todoRepository: DefaultTodoRepository(),
            dispatching: DispatchQueue.main
        )
    }
}

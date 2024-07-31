import Foundation
@testable import ios

extension DIContainer {
    static func fixture(
        todoRepository: TodoRepository = DummyTodoRepository(),
        dispatching: Dispatching = DummyDispatching()
    ) -> DIContainer {
        return DIContainer(
            todoRepository: todoRepository,
            dispatching: dispatching
        )
    }
}

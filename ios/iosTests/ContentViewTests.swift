import XCTest
@testable import ios
import Nimble

final class ContentViewTests: XCTestCase {
    func test_初期化時にTodoRepositoryのgetTodosを呼ぶ() throws {
        let spyTodoRepository = SpyTodoRepository()
        _ = ContentView.ViewModel(diContainer: DIContainer.fixture(todoRepository: spyTodoRepository))
        
        
        expect(spyTodoRepository.getTodos_wasCalled).toEventually(beTrue())
    }
    
    func test_getTodosの返り値をプロパティとして保持する() async throws {
        let stubTodoRepository = StubTodoRepository()
        stubTodoRepository.getTodos_returnValue = [
            TodoResponse(id: UUID(), todo: "shion teacher!!"),
            TodoResponse(id: UUID(), todo: "running"),
        ]
        let spyDispatching = SpyDispatching()
        let viewModel = ContentView.ViewModel(diContainer: DIContainer.fixture(
            todoRepository: stubTodoRepository,
            dispatching: spyDispatching
        ))
        
        
        await expect(spyDispatching.asyncWrapper_argument_work).toNotEventually(beNil())
        expect(viewModel.todos.count).to(equal(0))
        spyDispatching.asyncWrapper_argument_work?()
        
        expect(viewModel.todos.count).to(equal(2))
        expect(viewModel.todos.first?.todo).to(equal("shion teacher!!"))
        expect(viewModel.todos.last?.todo).to(equal("running"))
    }
}

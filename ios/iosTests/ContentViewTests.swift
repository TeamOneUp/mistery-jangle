import XCTest
@testable import ios
import Nimble

final class ContentViewTests: XCTestCase {
    func test_calles_SpyTodoRepository_getTodos() throws {
        let spyTodoRepository = SpyTodoRepository()
        let viewModel = ContentView.ViewModel(todoRepository: spyTodoRepository)
        
        
        expect(spyTodoRepository.getTodos_wasCalled).toEventually(beTrue())
    }
    
    func test_return_StubTodoReposiotry_getTodos() throws {
        let stubTodoRepository = StubTodoRepository()
        stubTodoRepository.getTodos_returnValue = [
            TodoResponse(id: UUID(), todo: "shion teacher!!"),
            TodoResponse(id: UUID(), todo: "running"),
        ]
        let viewModel = ContentView.ViewModel(todoRepository: stubTodoRepository)
        
        
        expect(viewModel.todos.count).toEventually(equal(2))
        expect(viewModel.todos.first?.todo).toEventually(equal("shion teacher!!"))
        expect(viewModel.todos.last?.todo).toEventually(equal("running"))
    }
}

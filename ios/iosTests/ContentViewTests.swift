import XCTest
@testable import ios
import Nimble

final class ContentViewTests: XCTestCase {
    func test_初期化時にtodoRepositoryのgetTodosを呼ぶ() throws {
        let spyTodoRepository = SpyTodoRepository()
        let _ = ContentView.ViewModel(todoRepository: spyTodoRepository)
        
        
        expect(spyTodoRepository.getTodos_wasCalled).toEventually(beTrue())
    }
    
    func test_getTodosの戻り値を返す() throws {
        let stubTodoRepository = StubTodoRepository()
        stubTodoRepository.getTodos_returnValue = [
            TodoResponse(id: UUID(), todo: "棚を整理する"),
            TodoResponse(id: UUID(), todo: "ソファを動かす"),
        ]
        let viewModel = ContentView.ViewModel(todoRepository: stubTodoRepository)
        
        
        expect(viewModel.todos.count).toEventually(equal(2))
        expect(viewModel.todos.first?.todo).toEventually(equal("棚を整理する"))
        expect(viewModel.todos.last?.todo).toEventually(equal("ソファを動かす"))
    }
    
}

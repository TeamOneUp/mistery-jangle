import SwiftUI

struct TodoResponse: Decodable, Identifiable {
    let id: UUID
    let todo: String
}

struct ContentView: View {
    @State private var todos: [TodoResponse] = []
    @State private var todoText: String = ""
    
    var body: some View {
        TextField("新規TODO", text: $todoText).textFieldStyle(.roundedBorder)
        Button {
            Task {
                let url = URL(string: "http://localhost:8080/api/todos")
                var request = URLRequest(url: url!)
                request.httpMethod = "POST"
                request.httpBody = todoText.data(using: .utf8)
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                let (data, _) = try await URLSession.shared.data(for: request)
                let todos = try JSONDecoder().decode([TodoResponse].self, from: data)
                DispatchQueue.main.async {
                    self.todos = todos
                }
            }
        } label: {
            Text("保存")
        }
        List(todos) { todo in
            Text(todo.todo)
        }
        .task {
            Task {
                let url = URL(string: "http://localhost:8080/api/todos")
                let request = URLRequest(url: url!)
                let (data, _) = try await URLSession.shared.data(for: request)
                let todos = try JSONDecoder().decode([TodoResponse].self, from: data)
                DispatchQueue.main.async {
                    self.todos = todos
                }
            }
        }
        
    }
    class ViewModel {
        var todos: [TodoResponse] = []
        init(todoRepository: TodoRepository) {
            Task {
                todos = await todoRepository.getTodos()
            }
        }
    }


}

#Preview {
    ContentView()
}

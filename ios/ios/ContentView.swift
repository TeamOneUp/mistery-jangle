import SwiftUI

struct TodoResponse: Decodable, Identifiable {
    let id: UUID
    let todo: String
}

struct ContentView: View {
    @State private var todos: [TodoResponse] = []
    @State private var draftTodo: String = ""
    
    var body: some View {
        VStack {
            HStack {
                TextField("New Todo", text: $draftTodo).textFieldStyle(.roundedBorder)
                Button {
                    Task {
                        let url = URL(string: "http://localhost:8080/api/todos")
                        var request = URLRequest(url: url!)
                        request.httpMethod = "POST"
                        request.httpBody = draftTodo.data(using: .utf8)
                        request.setValue("text/plain", forHTTPHeaderField: "Content-Type")
                        let (data, _) = try await URLSession.shared.data(for: request)
                        let todos = try JSONDecoder().decode([TodoResponse].self, from: data)
                        DispatchQueue.main.async {
                            self.todos = todos
                        }
                    }
                } label: {
                    Text("save")
                }
            }
            .padding(.horizontal)
            List(todos) { todo in
                Text(todo.todo)
            }
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
    
    class ViewModel: ObservableObject {
        @Published var todos: [TodoResponse] = []
        
        init(todoRepository: TodoRepository)  {
            Task {
                todos = try await todoRepository.getTodos()
            }
        }
    }
}

#Preview {
    ContentView()
}

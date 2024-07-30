import SwiftUI

struct TodoResponse: Decodable, Identifiable {
    let id: UUID
    let todo: String
}

struct ContentView: View {
    @State private var todos: [TodoResponse] = []
    var body: some View {
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
}

#Preview {
    ContentView()
}

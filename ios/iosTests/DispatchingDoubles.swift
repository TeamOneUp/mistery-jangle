import Foundation
@testable import ios


class DummyDispatching: Dispatching {
    func async(
        group: DispatchGroup?,
        qos: DispatchQoS,
        flags: DispatchWorkItemFlags,
        execute work: @escaping @Sendable @convention(block) () -> Void
    ) {}
    
    func asyncWrapper(execute work: @escaping @Sendable @convention(block) () -> Void) {
        work()
    }
}

class SpyDispatching: Dispatching {
    func async(
        group: DispatchGroup?,
        qos: DispatchQoS,
        flags: DispatchWorkItemFlags,
        execute work: @escaping @Sendable @convention(block) () -> Void
    ) {}
    
    var asyncWrapper_argument_work: (() -> Void)?
    func asyncWrapper(execute work: @escaping @Sendable @convention(block) () -> Void) {
        self.asyncWrapper_argument_work = work
    }
}

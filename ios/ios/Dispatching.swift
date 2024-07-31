import Foundation

protocol Dispatching {
    func async(
        group: DispatchGroup?,
        qos: DispatchQoS,
        flags: DispatchWorkItemFlags,
        execute work: @escaping @Sendable @convention(block) () -> Void
    )
    
    func asyncWrapper(execute work: @escaping @Sendable @convention(block) () -> Void)
}

extension DispatchQueue: Dispatching {
    func asyncWrapper(execute work: @escaping @Sendable @convention(block) () -> Void) {
        async(execute: work)
    }
}

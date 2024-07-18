import {useEffect, useState} from 'react'

function App() {
    const [greeting, setGreeting] = useState('')
    const [draftMessage, setDraftMessage] = useState('')

    useEffect(() => {
        fetch('/api/hello')
            .then(res => res.json())
            .then(greeting => setGreeting(greeting))
    }, [])

    async function onClickSendButton() {
        const headers = {
            'Content-Type': 'application/json'
        }
        await fetch('/api/hello/messages', {body: draftMessage, headers, method: 'POST'})
    }

    return (
        <>
            {greeting}
            <label>
                send message
                <input type="text" value={draftMessage} onChange={e => setDraftMessage(e.target.value)}/>
            </label>
            <button onClick={onClickSendButton}>send</button>
        </>
    )
}

export default App

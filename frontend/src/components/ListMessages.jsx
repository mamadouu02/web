import { useContext, useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'

function ListMessages({ gid }) {
  const { token, login, count, backend } = useContext(AppContext)
  const [messages, setMessages] = useState([])

  function getMessages() {
    fetch(backend + '/api/messages/' + gid, {
      method: 'GET',
      headers: { 'x-access-token': token }
    })
      .then(res => res.json())
      .then(json => setMessages(json.data))
  }

  useEffect(() => {
    getMessages()
    const timerID = setInterval(getMessages, 5000)
    return (() => clearInterval(timerID))
  }, [gid, count])

  return (
    <div className='ListMessages'>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={(login == message.userId) ? 'MyMessage' : 'OtherMessage'}>
            {(login != message.userId) ? <div className='MessageAuthor'>{message.userId}</div> : null}
            <div className='MessageContent'>{message.content}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

ListMessages.propTypes = {
  gid: PropTypes.number.isRequired
}

export default ListMessages
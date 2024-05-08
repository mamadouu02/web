import { useContext, useState } from 'react'
import { PropTypes } from 'prop-types'
import { AppContext } from '../AppContext'
import ListMessages from './ListMessages'
import Button from '../components/Button'
import InputField from '../components/InputField'

function GroupMessages({ group }) {
  const { token, count, setCount, backend } = useContext(AppContext)
  const [content, setContent] = useState("")

  function sendMessage() {
    fetch(backend + '/api/messages/' + group.id, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({ content })
    })
      .then(res => res.json())
      .then(json => {
        if (json.status) {
          setCount(count + 1)
        }
      })

    setContent("")
  }
  
  return (
    <fieldset className='GroupMessages'>
      <legend>Discussion sur le groupe &quot;{group.name}&quot;</legend>
      <ListMessages gid={group.id} />
      <hr></hr>
      <InputField
        type='text'
        value={content}
        placeholder='Saisir un message'
        onChangeHandler={setContent}
      />
      <Button onClickHandler={sendMessage} title='Envoyer' />
    </fieldset>
  )
}

GroupMessages.propTypes = {
  group: PropTypes.object.isRequired
}

export default GroupMessages
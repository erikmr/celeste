import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import UseUser from 'hooks/useUser'
import { useState } from 'react'
import { addDevit } from 'firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}
export default function composeTweet() {
  const user = UseUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((error) => {
        console.log(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="¿Qué esta pasando?"
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Publicar</Button>
          </div>
        </form>
        <style jsx>{`
          div {
            padding: 15px;
          }
          textarea {
            border: 0;
            font-size: 21px;
            padding: 15px;
            outline: 0;
            resize: none;
            width: 100%;
          }
        `}</style>
      </AppLayout>
    </>
  )
}
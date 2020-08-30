import { useEffect } from 'react'
import Head from 'next/head'
import { colors } from 'styles/theme'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import { loginWithGithub } from 'firebase/client'
import { useRouter } from 'next/router'
import UseUser, { USER_STATES } from 'hooks/useUser'

export default function Home() {
  const user = UseUser()

  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  console.log(user)
  const handleClick = () => {
    loginWithGithub().catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      <Head>
        <title> Create Next App </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <img src="/celeste-logo.png" alt="Logo" />
        <h1>Celeste</h1>
        <h2>
          Asistente virtual
          <br />
          para agentes de seguros 👩‍💻👨‍💻
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login con GitHub
            </Button>
          )}

          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif"></img>}
        </div>
      </section>
      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}

import { useEffect } from 'react'
import Head from 'next/head'
import { colors } from 'styles/theme'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import { loginWithGithub, loginWithFacebook } from 'firebase/client'
import { useRouter } from 'next/router'
import UseUser, { USER_STATES } from 'hooks/useUser'
import Facebook from 'components/Icons/Facebook'

export default function Home() {
  const user = UseUser()
  const router = useRouter()
  useEffect(() => {
    user && router.replace('/home')
  }, [user])
  console.log(user)
  const handleClickloginWithGithub = () => {
    loginWithGithub().catch((err) => {
      console.log(err)
    })
  }
  const handleClickloginWithFaceBook = () => {
    loginWithFacebook().catch((err) => {
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
            <Button
              onClick={handleClickloginWithGithub}
              width="200px"
              color="#000"
            >
              <GitHub fill="#fff" width={24} height={24} />
              GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_LOGGED && (
            <Button
              onClick={handleClickloginWithFaceBook}
              width="200px"
              color="#3b5998"
            >
              <Facebook fill="#fff" width={24} height={24} />
              Faccebook
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

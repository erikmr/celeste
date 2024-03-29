import { useEffect, useState } from 'react'
import Devit from 'components/Devit'
import useUser from 'hooks/useUser'
import { listenLatestDevits } from 'firebase/client'
import Link from 'next/link'
import Create from 'components/Icons/Create'
import { colors } from 'styles/theme'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import Head from 'next/head'
export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  useState([])
  const user = useUser()
  useEffect(() => {
    let unsuscribe
    if (user) {
      unsuscribe = listenLatestDevits(setTimeline)
    }
    return () => unsuscribe && unsuscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, avatar, img, content, userId, createdAt }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              img={img}
              content={content}
              userName={userName}
              userId={userId}
              createdAt={createdAt}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} heigth={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/home">
          <a>
            <Search width={32} heigth={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} heigth={32} stroke="#09f" />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        h2 {
          margin-left: 20px;
          font-size: 21px;
          font-weight: 800;
        }
        section {
          flex: 1;
          padding-top: 10px;
        }
        nav {
          background: #ffffff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          heigth: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}

import Devit from 'components/Devit'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '5J5fdfCmjJNj01k7XtCq' } }],
//     fallback: true,
//   }
// }

// export async function getStaticProps(context) {
//   const { params } = context
//   const { id } = params

//   return firestore
//     .collection('devits')
//     .doc(id)
//     .get()
//     .then((doc) => {
//       const data = doc.data()
//       const id = doc.id
//       const { createdAt } = data

//       const props = {
//         ...data,
//         id,
//         createdAt: +createdAt.toDate(),
//       }
//       return { props }
//     })
//     .catch(() => {
//       return { props: {} }
//     })
// }

export async function getServerSideProps(context) {
  const { params } = context
  const { id } = params
  console.log(id)
  console.log('getServerSideProps')
  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      console.log('doc')
      console.log(doc.data())
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
export default function Devit({
  avatar,
  userName,
  img,
  content,
  id,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>
          <span> · </span>
          <span date="true">{timeago}</span>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        span[date] {
          color: #555;
          font-size: 14px;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  )
}

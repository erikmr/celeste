import { colors } from '../../styles/theme'
export default function Button({ children, disabled, onClick, width, color }) {
  if (!color) color = colors.black
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${color};
          border-radius: 9999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          user-select: none;
          margin-bottom: 10px;
          width: ${width};
        }
        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }
        button > :global(svg) {
          margin-right: 8px;
        }
        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}

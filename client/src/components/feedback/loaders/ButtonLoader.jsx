import Spinner from './Spinner'

export default function ButtonLoader({ children = 'Loading...' }) {
  return <span className="button-loader"><Spinner label={children} />{children}</span>
}

import { useContext } from 'react'
import ModalContext from '../context/ModalContext'

export default function useConfirm() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useConfirm must be used inside ModalProvider')
  return context
}

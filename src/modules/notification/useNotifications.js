import { useContext } from 'react'
import { NotificationsContext } from './NotificationsProvider'

// use context
export default function useNotifications() {
  return useContext(NotificationsContext)
}

import React from 'react'
import PropTypes from 'prop-types'
import 'react-notifications-component/dist/theme.css'
import ReactNotification, { store } from 'react-notifications-component'

const defaultSettings = {
  insert: 'top',
  container: 'bottom-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
}

const showNotification = (type) => (message, title) => {
  store.addNotification({
    ...defaultSettings,
    title: title,
    message: message,
    type: type
  })
}
const contextValue = {
  showSuccess: showNotification('success'),
  showError: showNotification('error'),
  showWarning: showNotification('warning')
}

export const NotificationsContext = React.createContext(contextValue)

const NotificationsProvider = ({ children }) => {
  return (
    <NotificationsContext.Provider value={contextValue}>
      <ReactNotification />
      {children}
    </NotificationsContext.Provider>
  )
}

NotificationsProvider.propTypes = {
  children: PropTypes.node
}

export default NotificationsProvider

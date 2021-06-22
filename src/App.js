import React from 'react'
import { Container } from 'reactstrap'

import { Navbar, ScheduleForm } from 'components'
import { NotificationsProvider } from 'modules'

function App() {
  return (
    <div id="emani-app-conatiner">
      {/* Notification provider */}
      <NotificationsProvider>
        {/* Nav */}
        <Navbar />
        {/* Page title */}
        <div className="position-relative py-4">
          <div className="position-absolute left-0 top-0">
            <div className="bg-white rounded-ellipse-right px-6 py-3">
              <h5 className="m-0 p-0">
                Request a call back from a local expert
              </h5>
            </div>
          </div>
        </div>
        {/* Page content */}
        <Container className="card-form card-container">
          <ScheduleForm />
        </Container>
      </NotificationsProvider>
    </div>
  )
}

export default App

import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App', () => {
  render(<App />)
  const containerElement = screen.getByTestId('emani-app-conatiner')
  expect(containerElement).toBeInTheDocument()
})

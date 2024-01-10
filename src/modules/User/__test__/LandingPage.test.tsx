import React from 'react'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import LandingPage from '../components/LandingPage'
import {
  LOADER_DATA_TEST_ID,
  USER_DATA_TEST_ID,
  USER_STORAGE_KEY,
} from '../constant'
import { useLocalStorage } from '../hooks/useLocalStorage'

jest.mock('axios')

describe('User Component', () => {
  it('should render user component', () => {
    render(<LandingPage dataTestId={USER_DATA_TEST_ID} />)

    expect(screen.getByTestId(USER_DATA_TEST_ID)).toBeInTheDocument()
  })

  it('should show loading indicator on refresh', async () => {
    render(<LandingPage dataTestId={USER_DATA_TEST_ID} />)
    const containerEl = screen.getByTestId(USER_DATA_TEST_ID)
    const button = containerEl.getElementsByTagName('button')[0]

    await userEvent.click(button)
    waitFor(() => {
      expect(screen.getByTestId(LOADER_DATA_TEST_ID)).toBeInTheDocument()
    })
  })

  it('should render users from  local storage', () => {
    const mockData = [
      {
        email: 'user@example.com',
        name: { title: 'Mr', first: 'John', last: 'Doe' },
        id: { value: '123' },
      },
      {
        email: 'user@example.com',
        name: { title: 'Mr', first: 'John', last: 'Doe' },
        id: { value: '1234' },
      },
    ]
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockData))

    act(() => {
      render(<LandingPage dataTestId={USER_DATA_TEST_ID} />)
      renderHook(() => useLocalStorage(USER_STORAGE_KEY, mockData))
    })

    const containerEl = screen.getByTestId(USER_DATA_TEST_ID)
    waitFor(() => {
      expect(containerEl.getElementsByTagName('li')).toHaveLength(
        mockData.length
      )
    })
  })
})

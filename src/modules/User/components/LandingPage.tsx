import React, { useEffect } from 'react'
import { fetchUsers } from '../actions'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { IUser } from '../interface'
import Loader from './Loader'
import { USER_LOADING_KEY, USER_STORAGE_KEY } from '../constant'

function User() {
  const [users, setUsers] = useLocalStorage(USER_STORAGE_KEY, [])
  const [loading, setLoading] = useLocalStorage(USER_LOADING_KEY, false)
  const controller = new AbortController()

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetchUsers({ signal: controller.signal })
      setUsers(response)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        if (err.name !== 'CanceledError') {
          // Handle cancelled error here
        }
      }
      // Handle Unexpected error
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    return () => controller.abort()
  }, [])

  return (
    <>
      <div className="mb-[20px]">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => fetchData()}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <ul className="max-w-md divide-y divide-gray-200">
        {loading ? (
          <Loader />
        ) : (
          users.map((data: IUser) => {
            const {
              email,
              name: { title, first, last },
              id: { value },
            } = data

            return (
              <li key={value} className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {`${title} ${first} ${last}`}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{email}</p>
                  </div>
                </div>
              </li>
            )
          })
        )}
      </ul>
    </>
  )
}

export default User

import axios, { AxiosRequestConfig } from 'axios'

// eslint-disable-next-line import/prefer-default-export
export const fetchUsers = async (config: AxiosRequestConfig) => {
  try {
    const {
      data: { results },
    } = await axios.get('https://randomuser.me/api', { ...config  })
    return results
  } catch (err) {
    return err
  }
}

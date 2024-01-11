export interface IUserProps {
  dataTestId: string
}

export interface IUser {
  cell: string
  dob: { date: string; age: number }
  email: string
  gender: string
  id: { name: string; value: string }
  location: any
  login: any
  name: { title: string; first: string; last: string }
  nat: string
  phone: string
  picture: any
  registered: any
}

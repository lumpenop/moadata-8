import store from 'store'
import { IUser } from 'types/userManagement'

export const setUserStoreData = (userDataArr: IUser[]) => {
  const newArr: IUser[] = []
  userDataArr.forEach((item) => {
    newArr.push(item)
  })
  store.set('userManagement', newArr)
}

export const getAllUserStoreData = () => {
  return store.get('userManagement')
}

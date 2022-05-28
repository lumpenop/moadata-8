import store from 'store'
import { IHeartrate, IUser } from 'types/userManagement'

export const getAllUserStoreData = (storeName: string = 'userName') => {
  return store.get(storeName)
}

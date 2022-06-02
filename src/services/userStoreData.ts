import store from 'store'

export const getAllUserStoreData = (storeName: string = 'userName') => {
  return store.get(storeName)
}

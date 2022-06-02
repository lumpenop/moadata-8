import {
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
  useRecoilCallback,
  RecoilState,
  GetRecoilValue,
  SetRecoilState,
  SetterOrUpdater,
  Resetter,
} from 'recoil'

export { atom, selector, useRecoilState, useSetRecoilState, useRecoilValue, useResetRecoilState, useRecoilCallback }
export { useClickAway, useInterval, usePrevious, useMount, useUnmount } from 'react-use'
export type { SetterOrUpdater, Resetter, GetRecoilValue, SetRecoilState }

export function useRecoil<T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>, Resetter] {
  const [value, setter] = useRecoilState(recoilState)
  const resetter = useResetRecoilState(recoilState)
  return [value, setter, resetter]
}

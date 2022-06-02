export interface IUserInfo {
  seq: number
  member_seq: number
  steps: number
  minutes: number
  distance: number
  crt_ymdt: string
}

export interface IDailyStepsData {
  totalSteps: number
  totalDistances: number
  records: IUserInfo[]
}

export interface IStep {
  steps: number
}

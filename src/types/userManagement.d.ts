export interface IUser {
  seq: number
  date: string
  login_id: string
}

export interface IHeartrate {
  seq: number
  member_seq: number
  avg_beat: number
  crt_ymdt: string
}

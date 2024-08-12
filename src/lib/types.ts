export type VoteType = 'liked' | 'disliked'

export type ParkingLotsType = {
  getAllParkingLots: LotType[]
}

export type ParkingLotContextType = {
  isVoting: boolean
  summary: SummaryType[]
}

export type LotType = {
  id: string
  name: string
  address: string
  status: string
  live_date: string
  type: string
  size: number
  image: string
}

export type SummaryType = {
  lot: LotType
  vote: VoteType
  createdAt: string
}

export type SortingType = 'asc' | 'desc'
export type GroupedKeysType = VoteType | 'all'
export type GroupedLotsType = {
  liked: SummaryType[]
  disliked: SummaryType[]
  all: SummaryType[]
}

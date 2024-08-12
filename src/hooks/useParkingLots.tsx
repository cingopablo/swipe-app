import { useInfiniteQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import gql from 'graphql-tag'

import { SERVER_URL } from '../lib/constants.ts'
import { ParkingLotsType } from '../lib/types.ts'

const query = gql(`
  query GetAllParkingLots($where: LotWhereInput, $limit: Int, $offset: Int) {
    getAllParkingLots(where: $where, limit: $limit, offset: $offset) {
      id
      name
      image
      address
      live_date
    }
  }
`)

export function useParkingLots() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['parking-lots'],
    queryFn: async ({ pageParam }): Promise<ParkingLotsType> => {
      return request(SERVER_URL, query, {
        where: {
          status: 'active',
        },
        limit: 5,
        offset: pageParam * 5,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.getAllParkingLots.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })

  return {
    pages: data?.pages ?? [],
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

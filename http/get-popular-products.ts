import { api } from './api-client'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export const getPopularProducts = async () => {
  return await api
    .get('metrics/popular-products')
    .json<GetPopularProductsResponse>()
}

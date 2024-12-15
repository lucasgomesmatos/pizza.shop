import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server'

export const searchParamsOrdersCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  id: parseAsString.withDefault(''),
  status: parseAsString.withDefault('all'),
  customerName: parseAsString.withDefault(''),
})

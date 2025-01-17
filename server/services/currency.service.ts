import { useDatabaseService } from './db.service'

export interface ICurrencyRate {
  id: number
  base_currency: string
  quote_currency: string
  rate: number
  created_at: string
}

export const useCurrencyService = () => {
  const { currency: { apiKey, base_currency, currencies, keep } } = useRuntimeConfig()

  const { getDatabase } = useDatabaseService()
  const db = getDatabase()

  const table_name = 'currency_rates'

  const url = new URL('/v1/latest', 'https://api.freecurrencyapi.com')
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('base_currency', base_currency)
  url.searchParams.set('currencies', currencies.join(','))

  const fetchLatest = async (): Promise<{ data: Record<string, number> }> => {
    const response = await fetch(url.toString())
    return response.json()
  }

  const storeLatest = async () => {
    const created_at = new Date().toISOString().split('T')[0]
    const exists = await db(table_name).where('created_at', created_at).first()
    if (exists)
      return

    const { data } = await fetchLatest()

    for (const quote_currency in data) {
      await db.from(table_name).insert({
        base_currency,
        quote_currency,
        rate: data[quote_currency],
        created_at,
      })
    }
    // delete old records - keep only the x days from variable keep
    // today - keep days
    const date = new Date()
    date.setDate(date.getDate() - Number(keep))

    // delete from database older than date
    await db(table_name).where('created_at', '<', date.toISOString().split('T')[0]).delete()
  }

  const getLatest = async () => {
    await storeLatest()
    // First, find the latest date in the database
    const data = await db<ICurrencyRate>(table_name)
      .select('created_at')
      .orderBy('created_at', 'desc')
      .first()

    if (!data || !data.created_at)
      return []

    return await db.from(table_name)
      .select('base_currency', 'quote_currency', 'rate', 'created_at')
      .where('created_at', data.created_at)
  }

  const getLatestRates = async (quote_currencies: string | string[]) => {
    quote_currencies = Array.isArray(quote_currencies) ? quote_currencies : [quote_currencies]
    const data = await db<ICurrencyRate>(table_name)
      .select('created_at')
      .orderBy('created_at', 'desc')
      .first()

    if (!data || !data.created_at)
      return null

    return await db.from(table_name)
      .select('base_currency', 'quote_currency', 'rate', 'created_at')
      .where('created_at', data.created_at)
      .whereIn('quote_currency', quote_currencies)
  }

  return {
    storeLatest,
    getLatest,
    getLatestRates,
  }
}

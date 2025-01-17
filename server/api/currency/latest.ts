import { useCurrencyService } from '~~/server/services/currency.service'

export default defineEventHandler(async (event) => {
  if (!event.context.user_id) {
    throw createError({
      status: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const { quote_currencies } = getQuery(event) as { quote_currencies: string | string[] | undefined }
  const currencyService = useCurrencyService()

  return quote_currencies ? await currencyService.getLatestRates(quote_currencies) : await currencyService.getLatest()
})

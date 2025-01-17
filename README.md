# Setup Env Vars
Create your own .env file (check .env.example)

# Start Server
``pnpm dev`` or ``pnpm build && node .output/server/index.mjs``

Check console for your api_key

# Fetch Latest Rates
### Fetch All
```
curl --location 'http://localhost:3000/api/currency/latest?quote_currencies=CHF' \
--header 'Authorization: your_api_key' \
```
### Fetch USD, ZAR and CHF only
```
curl --location 'http://localhost:3000/api/currency/latest?quote_currencies=USD&quote_currencies=ZAR&quote_currencies=CHF' \
--header 'Authorization: your_api_key'
```

# Planed
ui for managing api keys?!

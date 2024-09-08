### Steps for configuring project

1. npm i

2. add env values

- DATABASE_URL (pool uri also add `npm exec prisma generate`)
- DIRECT_URL
- AUTH_SECRET (generate using `npx auth secret`)
- AUTH_GOOGLE_ID
- AUTH_GOOGLE_SECRET

3. setup prisma

- npm exec prisma migrate dev
- npm exec prisma generate

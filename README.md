# prisma-string-datetime

This is a minimal reproduction for inserting an array containing a mixture of regular strings and ISO 8601 formatted strings into a field of type `String[]`.

As of Prisma Client `v3.0.2`, executing such a query throws a type validation error.

## Running the reproduction

1. Starting the database with `docker-compose up`.
2. Apply the schema with `npx prisma migrate dev`
3. Seed the database with `npx prisma db seed`.
4. An error should be thrown.

## The seed data

The file `prisma/seed.ts` contains 4 posts:

```js
[
  {
    id: 1,
    words: ["hello", "world"],
  },
  {
    id: 2,
    words: ["2021-09-14T00:00:00.000Z"],
  },
  {
    id: 3,
    words: ["2021-09-14T00:00:00.000Z", "2021-09-20T12:00:00.000Z"],
  },
  {
    id: 4,
    words: ["hello", "2021-09-14T00:00:00.000Z"],
  },
];
```

Each post contains a different mixture of regular strings and ISO 8601 formatted strings.

- Post 1 only has regular strings, this is of type `List<String>`
- Post 2 contains a single datetime string, this is of type `List<DateTime>`
- Post 3 contains multiple datetime strings, this is also of type `List<DateTime>`
- Post 4 contains one of each, this is of type `List<String | DateTime>`

The first 3 posts are inserted successfully, and only post 4 fails.

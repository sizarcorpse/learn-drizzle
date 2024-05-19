# Learn Drizzle

## Chapters

- [Learn Drizzle](#learn-drizzle)
  - [Chapters](#chapters)
  - [TODO](#todo)
  - [Folder Structure](#folder-structure)
  - [Main Commands](#main-commands)
  - [Configuration](#configuration)
    - [\[Official Link\] drizzle.config.ts](#official-link-drizzleconfigts)
    - [Basic](#basic)
    - [Multiple Schemas in different directories](#multiple-schemas-in-different-directories)
    - [Multiple Schemas in the same directory](#multiple-schemas-in-the-same-directory)
    - [Migration Directory](#migration-directory)
    - [Options](#options)
      - [`dialect`](#dialect)
      - [`schema`](#schema)
      - [`out`](#out)
      - [`dbCredentials`](#dbcredentials)
      - [`verbose`](#verbose)
      - [`strict`](#strict)
  - [Drizzle Commands](#drizzle-commands)
    - [\[Official Link\] drizzle-kit commands](#official-link-drizzle-kit-commands)
    - [`drizzle-kit generate` | `drizzle-kit generate <option>`](#drizzle-kit-generate--drizzle-kit-generate-option)
    - [`drizzle-kit migrate` | `drizzle-kit migrate <option>`](#drizzle-kit-migrate--drizzle-kit-migrate-option)
    - [`drizzle-kit introspect` | `drizzle-kit introspect <option>`](#drizzle-kit-introspect--drizzle-kit-introspect-option)
    - [`drizzle-kit push` | `drizzle-kit push <option>`](#drizzle-kit-push--drizzle-kit-push-option)
    - [`drizzle-kit drop` | `drizzle-kit drop <option>`](#drizzle-kit-drop--drizzle-kit-drop-option)
    - [`drizzle-kit up` | `drizzle-kit up <option>`](#drizzle-kit-up--drizzle-kit-up-option)
    - [`drizzle-kit check` | `drizzle-kit check <option>`](#drizzle-kit-check--drizzle-kit-check-option)
    - [`drizzle-kit studio` | `drizzle-kit studio <option>`](#drizzle-kit-studio--drizzle-kit-studio-option)
  - [Schema | Column Types](#schema--column-types)
    - [\[Official Link\] drizzle-kit schema - column type](#official-link-drizzle-kit-schema---column-type)
    - [`integer` | `int` | `int4`](#integer--int--int4)
    - [`smallint` | `int2`](#smallint--int2)
    - [`bigint` | `int8`](#bigint--int8)
    - [`serial` | `serial4` | `smallserial` | `serial2` | `bigserial` | `serial8`](#serial--serial4--smallserial--serial2--bigserial--serial8)
    - [`boolean`](#boolean)
    - [`text`](#text)
    - [`varchar`](#varchar)
    - [`char`](#char)
    - [`numeric` | `decimal`](#numeric--decimal)
    - [`real` | `float4` | `doublePrecision` | `float8`](#real--float4--doubleprecision--float8)
    - [`json` | `jsonb`](#json--jsonb)
    - [`time`](#time)
    - [`timestamp`](#timestamp)
    - [`date`](#date)
    - [`interval`](#interval)
    - [`enum` | `pgEnum`](#enum--pgenum)
    - [`.$default()` | `$defaultFn()`](#default--defaultfn)
    - [`$onUpdate()` or `$onUpdateFn()`](#onupdate-or-onupdatefn)
    - [Primary key `.primaryKey()`](#primary-key-primarykey)
  - [Indexes \& Constraints](#indexes--constraints)
    - [\[Official Link\] drizzle-kit schema - indexes \& constraints](#official-link-drizzle-kit-schema---indexes--constraints)
    - [`.default()` | `.defaultRandom()` | `.defaultNow()`](#default--defaultrandom--defaultnow)
    - [`.notNull()`](#notnull)
    - [`.unique()`](#unique)
      - [Composite Unique](#composite-unique)
      - [`NULL NOT DISTINCT`](#null-not-distinct)
    - [`.primaryKey()`](#primarykey)
      - [Composite Primary Key](#composite-primary-key)
    - [`.references()` | `FOREIGN KEY`](#references--foreign-key)
    - [Foreign key actions | `onDelete` | `onUpdate`](#foreign-key-actions--ondelete--onupdate)
      - [Self-referencing](#self-referencing)
      - [Multi-column foreign keys](#multi-column-foreign-keys)
    - [`index` | `uniqueIndex`](#index--uniqueindex)
  - [Relations](#relations)
    - [One-to-One](#one-to-one)
    - [One-to-Many](#one-to-many)
    - [Many-to-Many](#many-to-many)
  - [`insert`](#insert)
    - [\[Official Link\] insert](#official-link-insert)
    - [infer types](#infer-types)
    - [Insert returning](#insert-returning)
    - [On conflict `onConflictDoNothing` | `onConflictDoUpdate`](#on-conflict-onconflictdonothing--onconflictdoupdate)
  - [`select`](#select)
    - [\[Official Link\] select](#official-link-select)
    - [Conditional select](#conditional-select)
    - [Filtering | `.where()`](#filtering--where)
      - [`eq` |`.where(eq(table.column, 5))` | `.where(eq(table.column1, table.column2))`](#eq-whereeqtablecolumn-5--whereeqtablecolumn1-tablecolumn2)
      - [`ne` |`.where(ne(table.column, 5))`](#ne-wherenetablecolumn-5)
      - [`gt` |`.where(gt(table.column, 5))`](#gt-wheregttablecolumn-5)
      - [`gte` |`.where(gte(table.column, 5))`](#gte-wheregtetablecolumn-5)
      - [`lt` |`.where(lt(table.column, 5))`](#lt-wherelttablecolumn-5)
      - [`lte` |`.where(lte(table.column, 5))`](#lte-whereltetablecolumn-5)
      - [`isNull` | `.where(isNull(table.column))`](#isnull--whereisnulltablecolumn)
      - [`isNotNull` | `.where(isNotNull(table.column))`](#isnotnull--whereisnotnulltablecolumn)
      - [`inArray` | `.where(inArray(table.column, [1, 2, 3]))`](#inarray--whereinarraytablecolumn-1-2-3)
      - [`notInArray` | `.where(notInArray(table.column, [1, 2, 3]))`](#notinarray--wherenotinarraytablecolumn-1-2-3)
      - [`exists` | `.where(exists(query))`](#exists--whereexistsquery)
      - [`notExists` | `.where(notExists(query))`](#notexists--wherenotexistsquery)
      - [`between` | `.where(between(table.column, 1, 5))`](#between--wherebetweentablecolumn-1-5)
      - [`notBetween` | `.where(notBetween(table.column, 1, 5))`](#notbetween--wherenotbetweentablecolumn-1-5)
      - [`like` | `.where(like(table.column, "%llo wor%"))`](#like--whereliketablecolumn-llo-wor)
      - [`ilike` | `.where(ilike(table.column, "%llo wor%"))`](#ilike--whereiliketablecolumn-llo-wor)
      - [`notIlike` | `.where(notIlike(table.column, "%llo wor%"))`](#notilike--wherenotiliketablecolumn-llo-wor)
      - [`not` | `.where(not(eq(table.column, 5)))`](#not--wherenoteqtablecolumn-5)
      - [`and` | `.where(and(eq(table.column1, 5), eq(table.column2, 10)))`](#and--whereandeqtablecolumn1-5-eqtablecolumn2-10)
      - [`or` | `.where(or(eq(table.column1, 5), eq(table.column2, 10)))`](#or--whereoreqtablecolumn1-5-eqtablecolumn2-10)
      - [`arrayContains`](#arraycontains)
      - [`arrayContained`](#arraycontained)
      - [`arrayOverlaps`](#arrayoverlaps)
      - [Combining filters](#combining-filters)
    - [Distinct | `.distinct()`](#distinct--distinct)
    - [`.limit()`](#limit)
    - [`.offset()`](#offset)
    - [`.orderBy()` | `.asc()` | `.desc()`](#orderby--asc--desc)
    - [`.$with()`](#with)
    - [Select from sub-query](#select-from-sub-query)
    - [Aggregations](#aggregations)
      - [`count` | `.count()` | `.countDistinct()`](#count--count--countdistinct)
      - [`avg` | `.avg()` | `.avgDistinct()`](#avg--avg--avgdistinct)
      - [`sum` | `.sum()` | `.sumDistinct()`](#sum--sum--sumdistinct)
      - [`max` | `.max()` | `min` | `.min()`](#max--max--min--min)
  - [Query](#query)
    - [Declaring relations `relations()`](#declaring-relations-relations)
      - [One-to-self](#one-to-self)
      - [One-to-one](#one-to-one-1)
      - [One-to-many](#one-to-many-1)
      - [Many-to-many](#many-to-many-1)
    - [Disambiguating relations / Naming relations](#disambiguating-relations--naming-relations)
    - [`.query()`](#query-1)
      - [`.findMany()`](#findmany)
      - [`.findFirst()`](#findfirst)
      - [`with` | Include relations](#with--include-relations)
      - [`columns` | Select specific columns](#columns--select-specific-columns)
    - [`filters` | Filtering](#filters--filtering)
    - [`limit` \& `offset`](#limit--offset)
    - [`orderBy`](#orderby)
  - [Prepared statement `.prepare()` | `.execute()` | `.placeholder()`](#prepared-statement-prepare--execute--placeholder)
  - [Set Operations](#set-operations)
  - [Transactions](#transactions)
  - [Batch API](#batch-api)
  - [Dynamic query building](#dynamic-query-building)
  - [Typescript | type](#typescript--type)

## TODO

- <https://www.postgresql.org/docs/current/functions-string.html>

## Folder Structure

```
📦<project root>
|-...
📂-src
|-  |-📂drizzle
|-    |-📂migrations
|-    |-📄db.ts
|-    |-📄migrate.ts
|-    |-📄schema.ts
|-...
|-📄drizzle.config.ts
|-📄package.json
```

## Main Commands

```bash
npx drizzle-kit generate
npx drizzle-kit migrate

npx drizzle-kit introspect
npx drizzle-kit push
npx drizzle-kit
npx drizzle-kit up
npx drizzle-kit check
npx drizzle-kit studio
```

## Configuration

### [[Official Link] drizzle.config.ts](https://orm.drizzle.team/kit-docs/conf)

### Basic

```typescript
// drizzle.config.ts

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config);
```

### Multiple Schemas in different directories

```typescript
// drizzle.config.ts

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/**/schema.ts",
  //or
  schema: ["./src/user/schema.ts", "./src/posts/schema.ts"],
});
```

### Multiple Schemas in the same directory

```typescript
// drizzle.config.ts

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/schema/*",
});
```

### Migration Directory

`out` param lets you define folder for your migrations, it’s optional and `drizzle` by default.

Migration folder contains`.sql` migration files and `_meta` folder which is used by `drizzle-kit`

```typescript
// drizzle.config.ts

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/drizzle/migrations",
});
```

### Options

#### `dialect`

The dialect parameter is responsible for explicitly providing a database dialect you are using for all the commands.

- type: '`postgresql' | 'mysql' | 'sqlite'`

#### `schema`

The schema parameter is responsible for providing a path to the schema file or an array of paths to the schema files.

- type: `string | string[]`
- command: `generate`, `check`, `up`, `push`, `drop`
- uses: [single schema](#basic), [multiple schemas in different directories](#multiple-schemas-in-different-directories), [multiple schemas in the same directory](#multiple-schemas-in-the-same-directory)

#### `out`

The `out` parameter allows you to define the folder for your migrations.

- type: `string` | `string[]`
- default: `./drizzle`
- command: `generate`, `check`, `up`, `drop`, `introspect`, `migration`
- uses: [Migration Directory](#migration-directory)

#### `dbCredentials`

The `dbCredentials` parameter is responsible for providing the database credentials.

- type: `PostgresCredentials`, `MySQLCredentials`, `SQLiteCredentials`, `TursoCredentials`
- command: `push`, `introspect`

  ```typescript
  // drizzle.config.ts
  // PostgresCredentials
  import { defineConfig } from "drizzle-kit";
  export default defineConfig({
    dbCredentials: {
      url: "",
    },
  });
  ```

  ```typescript
  // drizzle.config.ts
  // PostgresCredentials
  import { defineConfig } from "drizzle-kit";
  export default defineConfig({
    dbCredentials: {
      host: "",
      port: "",
      user: "",
      password: "",
      database: "",
    },
  });
  ```

#### `verbose`

The `verbose` parameter is responsible for providing additional information about the process.

- type: `boolean`
- default: `false`
- command: `push`

#### `strict`

The `strict` parameter is responsible for providing additional information about the process.

- type: `boolean`
- default: `false`
- command: `push`

## Drizzle Commands

### [[Official Link] drizzle-kit commands](https://orm.drizzle.team/kit-docs/commands)

### `drizzle-kit generate` | `drizzle-kit generate <option>`

- `dialect`, `--dialect` : Database dialect you are using. `postgresql` | `mysql` | `sqlite`
- `schema`, `--schema` : Path to the schema file or an array of paths to the schema files.
- `out`, `--out` : Folder for your migrations. default `./drizzle`
- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`
- `name`, `--name` : Generate migration with custom name.

```bash
// custom name migration
npx drizzle-kit generate --name custom_migration

// custom name config file
npx drizzle-kit generate --config=custom.config.ts

// all params as one
$ drizzle-kit generate --schema=./src/schema.ts --out=./drizzle
```

### `drizzle-kit migrate` | `drizzle-kit migrate <option>`

- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`

### `drizzle-kit introspect` | `drizzle-kit introspect <option>`

- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`
- `dialect`, `--dialect` : Database dialect you are using. `postgresql` | `mysql` | `sqlite`
- `out`, `--out` : Folder for your migrations. default `./drizzle` -`url`, `--url` : Database connection url.
- `user`, `--user` : Database user.
- `password`, `--password` : Database password.
- `host`, `--host` : Database host.
- `port`, `--port` : Database port.
- `database`, `--database` : Database name.
- `schemaFilter`, `--schemaFilter` : Filter schemas by name.

```bash
// pull and generate schema from different database and save it to the different directory

npx drizzle-kit introspect --dialect=postgresql --out=test_pull/ --url="postgresql://postgres:ImaBatmanGotham007@localhost:5432/joker"

npx drizzle-kit introspect --out=migrations/ --connectionString=postgresql://user:pass@host:port/db_name

npx drizzle-kit introspect --out=migrations/ --host=0.0.0.0 --port=5432 --user=postgres --password=pass --database=db_name --ssl
```

### `drizzle-kit push` | `drizzle-kit push <option>`

- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`
- `dialect`, `--dialect` : Database dialect you are using. `postgresql` | `mysql` | `sqlite`
- `schema`, `--schema` : Path to the schema file or an array of paths to the schema files.
- `driver`, `--driver` : driver to use for querying`(aws-data-api`, `d1-http`, `turso`, `expo`)
- `tablesFilter`, `--tablesFilter` : Filter tables by name.
- `schemaFilter`, `--schemasFilter` : Filter schemas by name. Default: `["public"]`

```bash
npx drizzle-kit push --config=custom.config.ts

drizzle-kit push --schema=src/schema.ts --url=postgresql://user:pass@host:port/db_name

drizzle-kit push --schema=src/schema.ts --host=0.0.0.0 --port=5432 --user=postgres --password=pass --database=db_name --ssl
```

### `drizzle-kit drop` | `drizzle-kit drop <option>`

- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`
- `out`, `--out` : Folder for your migrations. default `./drizzle`

```bash
npx drizzle-kit drop --config=custom.config.ts

npx drizzle-kit drop --out=drizzle
```

### `drizzle-kit up` | `drizzle-kit up <option>`

This a utility command to keep all metadata up to date.

- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`
- `out`, `--out` : Folder for your migrations. default `./drizzle`

```bash
npx drizzle-kit up --config=custom.config.ts

npx drizzle-kit up --out=drizzle
```

### `drizzle-kit check` | `drizzle-kit check <option>`

This command is used to check the current state of the database and the state of the migrations.

- `config`, `--config` : Path to the configuration file. default `drizzle.config.ts`
- `out`, `--out` : Folder for your migrations. default `./drizzle`
- `dialect`, `--dialect` : Database dialect you are using. `postgresql` | `mysql` | `sqlite`

```bash
npx drizzle-kit check
```

### `drizzle-kit studio` | `drizzle-kit studio <option>`

- `port`, `--port` : Port to run the studio on. default `3000`
- `host`, `--host` : Host to run the studio on. default `localhost`
- `verbose`, `--verbose` : Verbose mode. default `false`

```bash
npx drizzle-kit studio

npx drizzle-kit studio --port=3000 --host=localhost --verbose
```

## Schema | Column Types

### [[Official Link] drizzle-kit schema - column type](https://orm.drizzle.team/docs/column-types/pg)

### `integer` | `int` | `int4`

Signed 4-byte integer. The integer type is the most common integer type in PostgreSQL. It is a signed 4-byte integer that has a range from -2147483648 to 2147483647.

```typescript
import { integer, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  age: integer("age"),
  money: integer("money").default(0),
});
```

### `smallint` | `int2`

Signed 2-byte integer. The smallint type is a signed 2-byte integer that has a range from -32768 to 32767.

```typescript
import { smallint, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  age: smallint("age"),
  money: smallint("money").default(0),
});
```

### `bigint` | `int8`

Signed 8-byte integer. The bigint type is a signed 8-byte integer that has a range from -9223372036854775808 to 9223372036854775807.

```typescript
import { bigint, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  money: bigint("money"),
});

// will be inferred as `number`
bigint: bigint("bigint", { mode: "number" });
// will be inferred as `bigint`
bigint: bigint("bigint", { mode: "bigint" });
```

### `serial` | `serial4` | `smallserial` | `serial2` | `bigserial` | `serial8`

Auto-incrementing 4-byte integer. The serial type is a 4-byte integer that is automatically incremented. The serial type is commonly used to create a unique identifier for a table.

```typescript
import { serial, smallserial, bigserial, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  id: serial("id"),
  smallId: smallserial("smallId"),
  bigId: bigserial("bigId", { mode: number }),
});
```

### `boolean`

Boolean type. The boolean type is a true or false value.

```typescript
import { boolean, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  isTrue: boolean("isTrue"),
  isFalse: boolean("isFalse").default(false),
});
```

### `text`

Variable-length(unlimited) character string.

```typescript
import { text, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  description: text("description").default(""),
});

  // will be inferred as text: "value1" | "value2" | null.
  // 🚨 it won’t check runtime values.
  text: text("text", { enum: ["value1", "value2"] }),
```

### `varchar`

Variable-length character string, can store strings up to `n` characters (not bytes).

```typescript
import { varchar, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).default(""),
});
```

### `char`

Fixed-length character string, can store strings up to `n` characters (not bytes).

```typescript
import { char, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  name: char("name", { length: 255 }),
  email: char("email", { length: 255 }).default(""),
});
```

### `numeric` | `decimal`

Fixed-point number. The numeric type is a fixed-point number that has a user-specified precision and scale.

```typescript
import { numeric, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  price: numeric("price", { precision: 10, scale: 2 }),
  tax: numeric("tax", { precision: 10, scale: 2 }).default(0),
});
```

### `real` | `float4` | `doublePrecision` | `float8`

Floating-point number. The real type is a 4-byte floating-point number that has a range from 1.18E-38 to 3.40E+38.

Double precision floating-point number. The double precision type is an 8-byte floating-point number that has a range from 2.23E-308 to 1.79E+308.

```typescript
import {
  real,
  float4,
  doublePrecision,
  float8,
  pgTable,
} from "drizzle-orm/pg-core";

export const table = pgTable({
  price: real("price"),
  tax: float4("tax").default(10.5),
  discount: doublePrecision("discount").default(0),
  total: float8("total").default(0),
});
```

### `json` | `jsonb`

JSON data type. The json type is used to store JSON data.

```typescript
import { json, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable({
  data: json("data"),
  config: json("config").default({ foo: "bar" }),
  content: jsonb("content").default({}),
});
```

specify `.$type<..>()` for json object inference, it won’t check runtime values.

```typescript
// will be inferred as { foo: string }
json: json("json").$type<{ foo: string }>();
// will be inferred as string[]
json: json("json").$type<string[]>();
// won't compile
json: jsonb("json").$type<string[]>().default({});
```

### `time`

```typescript
import { time, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  time1: time("time1"), // 15:04:05
  time2: time("time2", { withTimezone: true }), // 15:04:05+00
  time3: time("time3", { precision: 6 }), // 15:04:05.123456
  time4: time("time4", { precision: 6, withTimezone: true }), // 15:04:05.123456+00
});
```

### `timestamp`

```typescript
import { timestamp, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  timestamp1: timestamp("timestamp1"), // 2021-01-01 15:04:05
  timestamp2: timestamp("timestamp2", { precision: 6, withTimezone: true }), // 2021-01-01 15:04:05.123456+00
  timestamp3: timestamp("timestamp3").defaultNow(), // now()
});

// will be inferred as Date
timestamp: timestamp('timestamp', { mode: "date" }),

// will be inferred as string
timestamp: timestamp('timestamp', { mode: "string" }),
```

### `date`

Calendar date (year, month, day)

```typescript
import { date, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  date: date("date"),
});
```

### `interval`

```typescript
import { interval, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  interval: interval("interval"),
});
```

### `enum` | `pgEnum`

```typescript
import { pgEnum, pgTable } from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role", ["admin", "user"]);

const table = pgTable("table", {
  role: roleEnum("role"),
});
```

### `.$default()` | `$defaultFn()`

When using `$default()` or `$defaultFn()`, which are simply different aliases for the same function, you can generate defaults at runtime and use these values in all insert queries.

```typescript
import { text, pgTable } from "drizzle-orm/pg-core";
import { createId } from "@some/cuid2";

const table = pgTable("table", {
  id: text("id").$defaultFn(() => createId()),
});
```

### `$onUpdate()` or `$onUpdateFn()`

### Primary key `.primaryKey()`

```typescript
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  id: integer("id").primaryKey(),
});
```

## Indexes & Constraints

### [[Official Link] drizzle-kit schema - indexes & constraints](https://orm.drizzle.team/docs/indexes-constraints)

### `.default()` | `.defaultRandom()` | `.defaultNow()`

```typescript
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  age: integer("age").default(0),
  money: integer("money").defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow(),
});
```

### `.notNull()`

```typescript
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  integer: integer("integer").notNull(),
});
```

### `.unique()`

```typescript
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  integer: integer("integer").unique(),
});

const table = pgTable("table", {
  integer: integer("integer").unique("unique_name"),
});
```

#### Composite Unique

```typescript
import { varchar, pgTable, unique } from "drizzle-orm/pg-core";

const userTable = pgTable(
  "user",
  {
    name: varchar("name"),
    email: varchar("email"),
  },
  (table) => {
    return {
      uniqueNameEmail: unique("uniqueNameEmail").on(table.name, table.email),
    };
  }
);
```

#### `NULL NOT DISTINCT`

```typescript
export const userNulls = pgTable("user_nulls_example", {
  id: integer("id").unique("custom_name", { nulls: "not distinct" }),
});

export const userNulls = pgTable(
  "user_nulls_example",
  {
    id: integer("id"),
  },
  (t) => ({
    unq: unique().on(t.id).nullsNotDistinct(),
  })
);
```

### `.primaryKey()`

```typescript
import { integer, pgTable } from "drizzle-orm/pg-core";

const table = pgTable("table", {
  id: integer("id").primaryKey(),
});
``;
```

#### Composite Primary Key

```typescript
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

const userTable = pgTable(
  "user",
  {
    name: varchar("name"),
    email: varchar("email"),
  },
  (table) => {
    return {
      pkNameEmail: primaryKey("pkNameEmail").on(table.name, table.email),
    };
  }
);
```

### `.references()` | `FOREIGN KEY`

_The table with the foreign key is called the child table, and the table with the primary key is called the referenced or parent table._

```typescript
import { integer, pgTable, references } from "drizzle-orm/pg-core";

const userTable = pgTable("user", {
  id: integer("id").primaryKey(),
  name: varchar("name"),
});

const profileTable = pgTable("profile", {
  id: integer("id").primaryKey(),
  userId: integer("userId").references(() => userTable.id),
});
```

### Foreign key actions | `onDelete` | `onUpdate`

- `CASCADE` | `cascade`: When the referenced row is deleted, also delete the rows that reference it.
- `SET NULL` | `set null`: When the referenced row is deleted, set the referencing columns to NULL.
- `NO ACTION` | `no action`: Do nothing when the referenced row is deleted.
- `RESTRICT` | `restrict`: Prevent the deletion of a referenced row.
- `SET DEFAULT` | `set default`: Set the referencing columns to their default values.

```typescript
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  name: text("name"),
  author: integer("author")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});
```

#### Self-referencing

```typescript
export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  parentId: integer("parent_id").references((): AnyPgColumn => user.id),
});

// or

export const user = pgTable(
  "user",
  {
    id: serial("id"),
    name: text("name"),
    parentId: integer("parent_id"),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "custom_fk",
      }),
    };
  }
);
```

#### Multi-column foreign keys

If the table you are referencing has a composite primary key (a primary key made up of multiple columns), then you would need to use a multi-column foreign key in the referencing table. This multi-column foreign key would need to have the same number of columns as the composite primary key, and the data types of the corresponding columns must also match.

```typescript

import { serial, text, foreignKey, pgTable, AnyPgColumn } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  firstName: text("firstName"),
  lastName: text("lastName"),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.firstName, table.lastName]}),
  };
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  userFirstName: text("user_first_name"),
  userLastName: text("user_last_name"),
}, (table) => {
  return {
    userReference: foreignKey({
      columns: [table.userFirstName, table.userLastName],
      foreignColumns: [user.firstName, user.lastName]
      name: "custom_fk"
    })
  }
})
```

### `index` | `uniqueIndex`

```typescript
import { serial, text, index, uniqueIndex, pgTable } from "drizzle-orm/pg-core";
export const user = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  }
);
```

## Relations

### One-to-One

In a parent-child relationship, the child table should hold the foreign key. This foreign key references the primary key of the parent table. This establishes a relationship where each record in the child table is related to a record in the parent table.

- **Indexing:** Always create an index on the foreign key column to improve query performance.
- **uniqueness:** The foreign key column should be defined with `UNIQUE` constraint to ensure one-to-one relationship.
- **Nullability:** If every record in the first table must have a corresponding record in the second table, the foreign key column should be defined as `NOT NULL`.
- **onUpdate:** Use `ON UPDATE CASCADE` if you want to update the related record in the second table when a record in the first table is updated.
- **onDelete:** Use `ON DELETE CASCADE` if you want to delete the related record in the second table when a record in the first table is deleted.
- If both tables are equally important and have a one-to-one relationship, you can choose either table to hold the foreign key.

```typescript
export const OrganizationTable = pgTable(
  "organization",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", {
      length: 33,
    }).notNull(),
  },
  (table) => ({
    uqOrganizationName: unique("uq_organization_name").on(table.name),
  })
);

export const SpaceTable = pgTable(
  "space",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", {
      length: 33,
    })
      .notNull()
      .unique("uniqueSpaceName"),
    organizationId: uuid("organizationId")
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .unique("uq_space_organizationId")
      .notNull(),
  },
  (table) => ({
    idxSpaceOrganizationId: index("idx_space_organizationId").on(
      table.organizationId
    ),
  })
);
```

### One-to-Many

- **Foreign Key:** In a one-to-many relationship, the table that is on the "many" side of the relationship should hold the foreign key.
- **Indexing:** Always create an index on the foreign key column to improve query performance.
- **Nullability:** If every record in the "many" side table must have a corresponding record in the "one" side table, the foreign key column should be defined as `NOT NULL`
- if it's possible for a record in the "many" side table to not have a related record in the "one" side table, the foreign key column should allow `NULL` values.
- **onUpdate:** Use `ON UPDATE CASCADE` if you want to update the related records in the "many" side table when a record in the "one" side table is updated.
- **onDelete:** Use `ON DELETE CASCADE` if you want to delete the related records in the "many" side table when a record in the "one" side table is deleted.

```typescript
export const OrganizationTable = pgTable(
  "organization",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", {
      length: 33,
    }).notNull(),
  },
  (table) => ({
    uqOrganizationName: unique("uq_organization_name").on(table.name),
  })
);

export const SpaceTable = pgTable(
  "space",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", {
      length: 33,
    })
      .notNull()
      .unique("uniqueSpaceName"),
    organizationId: uuid("organizationId")
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(), // 🚨 IF MUST HAVE USE .notNull(), REMOVE IT IF FIELD IS OPTIONAL
  },
  (table) => ({
    idxSpaceOrganizationId: index("idx_space_organizationId").on(
      table.organizationId
    ),
  })
);
```

### Many-to-Many

- **Join Table:** In a many-to-many relationship, you need to create a join table that holds the foreign keys of both tables.
- **Primary Key:** The primary key of the join table should be a **composite key** made up of the foreign keys of both tables.
- **Foreign Key:** The foreign keys in the join table should reference the primary keys of the two tables.
- **Indexing:** Always create an index on the foreign key columns to improve query performance.

```typescript
export const CollectionTagTable = pgTable(
  "collectionTag",
  {
    collectionId: uuid("collectionId")
      .references(() => CollectionTable.id, { onDelete: "cascade" })
      .notNull(),
    tagId: uuid("tagId")
      .references(() => TagTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    pkCollectionTag: primaryKey({
      name: "pk_collectionTag",
      columns: [table.collectionId, table.tagId],
    }),
    idxCollectionTagCollectionId: index("idx_collectionTag_collectionId").on(
      table.collectionId
    ),
    idxCollectionTagTagId: index("idx_collectionTag_TagId").on(table.tagId),
  })
);
```

## `insert`

### [[Official Link] insert](https://orm.drizzle.team/docs/insert)

```typescript
const organization = await db
  .insert(OrganizationTable)
  .values({
    name: entry.name,
    logo: entry.logo,
  })
  .returning();

// multiple insert
const organizations = await db
  .insert(OrganizationTable)
  .values([
    {
      name: "Organization 1",
      logo: "logo1",
    },
    {
      name: "Organization 2",
      logo: "logo2",
    },
  ])
  .returning();
```

### infer types

```typescript
type NewUser = typeof users.$inferInsert;
```

### Insert returning

```typescript
await db.insert(users).values({ name: "Dan" }).returning();

// partial return
await db
  .insert(users)
  .values({ name: "Partial Dan" })
  .returning({ insertedId: users.id });
```

### On conflict `onConflictDoNothing` | `onConflictDoUpdate`

```typescript
await db.insert(users).values({ id: 1, name: "John" }).onConflictDoNothing();

// explicitly specify conflict target
await db
  .insert(users)
  .values({ id: 1, name: "John" })
  .onConflictDoNothing({ target: users.id });

// update on conflict
await db
  .insert(users)
  .values({ id: 1, name: "Dan" })
  .onConflictDoUpdate({ target: users.id, set: { name: "John" } });
```

## `select`

### [[Official Link] select](https://orm.drizzle.team/docs/select)

```typescript
const organizations = await db.select().from(OrganizationTable);
return organizations;

// partial select
const organizations = await db
  .select({
    name: OrganizationTable.name,
    logo: OrganizationTable.logo,
  })
  .from(OrganizationTable);
```

### Conditional select

`...(condition ? { property: value } : {})`

```typescript
async function selectUsers(withName: boolean) {
  return db
    .select({
      id: users.id,
      ...(withName ? { name: users.name } : {}),
    })
    .from(users);
}
const users = await selectUsers(true);
```

### Filtering | `.where()`

```typescript
import { eq, ne, gt, gte, ... } from "drizzle-orm";

await db.select().from(table).where(eq(table.column, 5));
```

#### `eq` |`.where(eq(table.column, 5))` | `.where(eq(table.column1, table.column2))`

#### `ne` |`.where(ne(table.column, 5))`

#### `gt` |`.where(gt(table.column, 5))`

#### `gte` |`.where(gte(table.column, 5))`

#### `lt` |`.where(lt(table.column, 5))`

#### `lte` |`.where(lte(table.column, 5))`

#### `isNull` | `.where(isNull(table.column))`

#### `isNotNull` | `.where(isNotNull(table.column))`

#### `inArray` | `.where(inArray(table.column, [1, 2, 3]))`

#### `notInArray` | `.where(notInArray(table.column, [1, 2, 3]))`

#### `exists` | `.where(exists(query))`

```typescript
const query = db.select().from(table2);
db.select().from(table).where(exists(query));
```

#### `notExists` | `.where(notExists(query))`

#### `between` | `.where(between(table.column, 1, 5))`

#### `notBetween` | `.where(notBetween(table.column, 1, 5))`

#### `like` | `.where(like(table.column, "%llo wor%"))`

```typescript
// Find any values that start with "A"
db.select().from(users).where(like(users.name, "A%"));

// Find any values that end with "A"
db.select().from(users).where(like(users.name, "%A"));

// Find any values that contain "A" anywhere
db.select().from(users).where(like(users.name, "%A%"));

// Find any values that start with "A" and are at least 2 characters in length
db.select().from(users).where(like(users.name, "A_%"));

// Find any values that start with "A" and followed by exactly 5 characters
db.select().from(users).where(like(users.name, "A_____"));

// Find any values that start with "A" and end with "o"
db.select().from(users).where(like(users.name, "A%o"));
```

#### `ilike` | `.where(ilike(table.column, "%llo wor%"))`

#### `notIlike` | `.where(notIlike(table.column, "%llo wor%"))`

#### `not` | `.where(not(eq(table.column, 5)))`

All conditions must return `false`.

#### `and` | `.where(and(eq(table.column1, 5), eq(table.column2, 10)))`

All conditions must return `true`.

#### `or` | `.where(or(eq(table.column1, 5), eq(table.column2, 10)))`

At least one condition must return `true`.

#### `arrayContains`

#### `arrayContained`

#### `arrayOverlaps`

#### Combining filters

```typescript
await db
  .select()
  .from(users)
  .where(and(eq(users.id, 42), eq(users.name, "Dan")));

await db
  .select()
  .from(users)
  .where(or(eq(users.id, 42), eq(users.name, "Dan")));
```

### Distinct | `.distinct()`

You can use `.selectDistinct()` instead of `.select()` to retrieve only unique rows from a dataset:

```typescript
await db.selectDistinct().from(users).orderBy(usersTable.id, usersTable.name);

await db.selectDistinct({ id: users.id }).from(users).orderBy(usersTable.id);
```

### `.limit()`

```typescript
await db.select().from(users).limit(10);
```

### `.offset()`

```typescript
await db.select().from(users).offset(10);
```

### `.orderBy()` | `.asc()` | `.desc()`

```typescript
await db.select().from(users).orderBy(users.id);
await db.select().from(users).orderBy(asc(users.id));
await db.select().from(users).orderBy(desc(users.id));
```

### `.$with()`

Using the `with` clause can help you simplify complex queries by splitting them into smaller sub-queries called common table expressions (CTEs):

```typescript
const sq = db.$with("sq").as(db.select().from(users).where(eq(users.id, 42)));

const result = await db.with(sq).select().from(sq);
```

### Select from sub-query

```typescript
const sq = db.select().from(users).where(eq(users.id, 42)).as("sq");
const result = await db.select().from(sq);
```

### Aggregations

```typescript
import { max } from "drizzle-orm";
```

#### `count` | `.count()` | `.countDistinct()`

```typescript
await db.select({ value: count() }).from(users);
await db.select({ value: count(users.id) }).from(users);

await db.select({ value: countDistinct(users.id) }).from(users);
```

#### `avg` | `.avg()` | `.avgDistinct()`

```typescript
await db.select({ value: avg(users.id) }).from(users);

await db.select({ value: avgDistinct(users.id) }).from(users);
```

#### `sum` | `.sum()` | `.sumDistinct()`

```typescript
await db.select({ value: sum(users.id) }).from(users);

await db.select({ value: sumDistinct(users.id) }).from(users);
```

#### `max` | `.max()` | `min` | `.min()`

```typescript
await db.select({ value: max(users.id) }).from(users);

await db.select({ value: min(users.id) }).from(users);
```

## Query

### Declaring relations `relations()`

#### One-to-self

- An example of a one-to-one relation between users and users, where a user can invite another.

```typescript
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  invitedBy: integer('invited_by'),
});

export const usersRelations = relations(users, ({ one }) => ({
  invitee: one(users, {
    fields: [users.invitedBy],
    references: [users.id],
  }),

```

#### One-to-one

- In one-to-one `relations`, The table with the foreign key set up the mapping.

```typescript
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const profileInfo = pgTable("profile_info", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
});

export const usersRelations = relations(users, ({ one }) => ({
  profileInfo: one(profileInfo),
}));

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}));
```

#### One-to-many

```typescript
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  content: text("content"),
  authorId: integer("author_id"),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

#### Many-to-many

```typescript
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const usersToGroups = pgTable(
  "users_to_groups",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    groupId: integer("group_id")
      .notNull()
      .references(() => groups.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  })
);

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}));
```

### Disambiguating relations / Naming relations

```typescript
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
    relationName: "author",
  }),
  reviewer: one(users, {
    fields: [posts.reviewerId],
    references: [users.id],
    relationName: "reviewer",
  }),
}));
```

### `.query()`

```typescript
await db.query.users.findMany(...);
```

#### `.findMany()`

#### `.findFirst()`

#### `with` | Include relations

`With` operator lets you combine data from multiple related tables and properly aggregate results.

```typescript
const posts = await db.query.posts.findMany({
  with: {
    comments: true,
  },
});
```

- Nested relations

```typescript
const users = await db.query.users.findMany({
  with: {
    posts: {
      with: {
        comments: true,
      },
    },
  },
});
```

#### `columns` | Select specific columns

```typescript
const posts = await db.query.posts.findMany({
  columns: {
    id: true,
    content: true,
    status: false,
  },
  with: {
    comments: true,
  },
});
```

- Only include columns from nested relations:

```typescript
const res = await db.query.users.findMany({
  columns: {},
  with: {
    posts: true,
  },
});
```

```typescript
const posts = await db.query.posts.findMany({
  columns: {
    id: true,
    content: true,
  },
  with: {
    comments: {
      columns: {
        authorId: false,
      },
    },
  },
});
```

### `filters` | Filtering

```typescript
import { eq } from "drizzle-orm";

const users = await db.query.users.findMany({
  where: eq(users.id, 1),
});
```

or

```typescript
const users = await db.query.users.findMany({
  where: (users, { eq }) => eq(users.id, 1),
});
```

```typescript
await db.query.posts.findMany({
  where: (posts, { eq }) => eq(posts.id, 1),
  with: {
    comments: {
      where: (comments, { lt }) => lt(comments.createdAt, new Date()),
    },
  },
});
```

### `limit` & `offset`

- `offset` is only available for top level query.

```typescript
await db.query.posts.findMany({
  limit: 5,
  offset: 2, // correct ✅
  with: {
    comments: {
      offset: 3, // incorrect ❌
      limit: 3,
    },
  },
});
```

### `orderBy`

```typescript
import { desc, asc } from "drizzle-orm";

await db.query.posts.findMany({
  orderBy: [asc(posts.id)],
});

await db.query.posts.findMany({
  orderBy: (posts, { asc }) => [asc(posts.id)],
});
```

## Prepared statement `.prepare()` | `.execute()` | `.placeholder()`

```typescript
// Prepare a statement

const prepared = db.select().from(customers).prepare("statement_name");
```

```typescript
// Placeholder

import { sql } from "drizzle-orm";
const p1 = db
  .select()
  .from(customers)
  .where(eq(customers.id, sql.placeholder("id")))
  .prepare("p1");

await p1.execute({ id: 10 });
```

```typescript
const prepared = db.query.users
  .findMany({
    limit: placeholder("uLimit"),
    offset: placeholder("uOffset"),
    where: (users, { eq, or }) =>
      or(eq(users.id, placeholder("id")), eq(users.id, 3)),
    with: {
      posts: {
        where: (users, { eq }) => eq(users.id, placeholder("pid")),
        limit: placeholder("pLimit"),
      },
    },
  })
  .prepare("query_name");

const usersWithPosts = await prepared.execute({
  pLimit: 1,
  uLimit: 3,
  uOffset: 1,
  id: 2,
  pid: 6,
});
```

## Set Operations

## Transactions

## Batch API

## Dynamic query building

## Typescript | type

```typescript
import { serial, text, pgTable } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
type SelectUser = typeof users.$inferSelect;
type InsertUser = typeof users.$inferInsert;
// or
type SelectUser = typeof users._.$inferSelect;
type InsertUser = typeof users._.$inferInsert;
// or
type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
```

- `drizzle-zod`

```typescript
npm i drizzle-zod
```

```typescript
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role", { enum: ["admin", "user"] }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Schema for inserting a user - can be used to validate API requests
const insertUserSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
const selectUserSchema = createSelectSchema(users);

// Overriding the fields
const insertUserSchema = createInsertSchema(users, {
  role: z.string(),
});

// Refining the fields - useful if you want to change the fields before they become nullable/optional in the final schema
const insertUserSchema = createInsertSchema(users, {
  id: (schema) => schema.id.positive(),
  email: (schema) => schema.email.email(),
  role: z.string(),
});

// Usage

const user = insertUserSchema.parse({
  name: "John Doe",
  email: "johndoe@test.com",
  role: "admin",
});

// Zod schema type is also inferred from the table schema, so you have full type safety
const requestSchema = insertUserSchema.pick({ name: true, email: true });
```

# Learn Drizzle

## Chapters

- [Learn Drizzle](#learn-drizzle)
  - [Chapters](#chapters)
  - [Drizzle](#drizzle)
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
      - [Self-referencing](#self-referencing)
      - [Multi-column foreign keys](#multi-column-foreign-keys)
    - [`index` | `uniqueIndex`](#index--uniqueindex)

## Drizzle

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

--DataBase name 'count_a_dram'
--user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
--whiskey table
CREATE TABLE "whiskey" (
	"id" SERIAL PRIMARY KEY,
	"whiskey_name" varchar(80),
	"whiskey_proof" FLOAT NOT NULL,
	"whiskey_type" varchar(80) NOT NULL,
	"user_id" integer REFERENCES "user" NOT NULL
);
--junction table 
CREATE TABLE "dram" (
    "id" SERIAL PRIMARY KEY,
    "user_id" integer REFERENCES "user" NOT NULL,
	"whiskey_id" integer REFERENCES "whiskey" NOT NULL,
	"dram_epoch" BIGINT not null,
	"dram_quantity" FLOAT NOT NULL,
	"dram_calories" integer NOT NULL
);
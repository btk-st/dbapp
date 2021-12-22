
CREATE TABLE IF NOT EXISTS houses
(
    id serial NOT NULL PRIMARY KEY,
    region character varying(50) NOT NULL,
    flat_number integer,
    type character varying(50) NOT NULL,
    area integer,
    floor integer,
    floors_count integer,
    year_of_construction integer,
    comment character varying(300),
    has_garbage_chute boolean,
    kitchen_area integer,
    has_underground_parking boolean,
    has_swimming_pool boolean,
    ceiling_height integer,
    has_balcony boolean
);

CREATE TABLE IF NOT EXISTS agents
(
    agent_id serial NOT NULL PRIMARY KEY,
    fio character varying(100)
);

CREATE TABLE IF NOT EXISTS orders
(
    order_id serial NOT NULL PRIMARY KEY,
    house_id integer NOT NULL REFERENCES houses (id),
    is_sold boolean NOT NULL,
    dollar_price numeric(15, 2),
    ruble_price numeric(15, 2),
    sales_agent integer REFERENCES agents (agent_id),
    UNIQUE(house_id)
);
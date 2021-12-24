create table houses
(
    id                      serial
        primary key,
    region                  varchar(50) not null,
    flat_number             integer,
    type                    varchar(50) not null,
    area                    integer,
    floor                   integer,
    floors_count            integer,
    year_of_construction    integer,
    comment                 varchar(300),
    has_garbage_chute       boolean,
    kitchen_area            integer,
    has_underground_parking boolean,
    has_swimming_pool       boolean,
    ceiling_height          integer,
    has_balcony             boolean,
    street_name             varchar(100),
    rooms_count             integer
);

alter table houses
    owner to root;

create table agents
(
    agent_id serial
        primary key,
    fio      varchar(100)
);

alter table agents
    owner to root;

create table orders
(
    order_id      serial
        primary key,
    house_id      integer     not null
        unique
        references houses,
    is_sold       boolean     not null,
    dollar_price  numeric(15, 2),
    ruble_price   numeric(15, 2),
    sales_agent   integer
        references agents,
    dollar_profit numeric(15, 2),
    order_type    varchar(50) not null
);

alter table orders
    owner to root;

create table const
(
    name  varchar(100) not null
        constraint const_pk
            primary key,
    value numeric(15, 2)
);

alter table const
    owner to root;

create unique index const_name_uindex
    on const (name);


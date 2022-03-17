create table post
(
    id              varchar(36) primary key,
    poster          varchar(44) not null references profile (id),
    owner           varchar(44) not null references profile (id),
    title           varchar(50) not null,
    image           varchar(100) not null,
    description     varchar(255),
    likes           varchar(500) not null,
    on_sale         boolean not null default false,
    price           decimal(19, 4),
    date_posted     timestamp not null,
    tags            varchar(500)
)
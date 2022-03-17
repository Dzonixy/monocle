create table profile
(
    id              varchar(44) primary key,
    user_name       varchar(50) not null unique,
    handle          varchar(20) not null unique,
    profile_image   varchar(255),
    role            varchar(10),
    following       varchar(500)
)
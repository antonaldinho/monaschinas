create table serie (
	serie_ID varchar(50) NOT NULL UNIQUE,
	nombre varchar(100)
);
create table personaje (
	nombre varchar(100),
	serie_id varchar(100) references serie(serie_id),
	PRIMARY KEY (nombre, serie_id)
);
create table imagen (
	imagen_id serial primary key,
	nombre varchar(200),
	nombre_imagen varchar(200)
);
create table producto (
	producto_id bigint NOT NULL UNIQUE,
	nombre_producto varchar(100),
	nombre_personaje,
	serie_id varchar(100),
	stock int NOT NULL,
	precio decimal,
	imagen_id int references imagen(imagen_id),
	descuento decimal,
	altura decimal,
	marca varchar(100),
	foreign key (nombre_personaje, serie_id) references personaje (nombre, serie_id),
	check(descuento >= 0 and descuento <= 100)
);
create table usuario (
	usuario_id varchar(40) NOT NULL UNIQUE,
	nombre varchar(100),
	email varchar(100) NOT NULL,
	direccion varchar(200),
	ciudad varchar(60),
	estado varchar(60),
	cp varchar(20),
	contrasena varchar(80),
	rol varchar(20),
	primary key (usuario_id)
);
create table ticket (
	ticket_id serial,
	usuario_id varchar(40) references usuario(usuario_id),
	producto_id int references producto(producto_id),
	cantidad int,
	total decimal,
	fecha date,
	comentarios varchar(200)
);

insert into usuario values (
	'antonaldinho',
	'Jose Antonio Aleman Salazar',
	'antonio.9714@gmail.com',
	'Santa Fatima 225',
	'Guadalupe',
	'Nuevo Leon',
	'67184',
	'ayylmao',
	'admin'
);
insert into usuario values (
	'cuckarlos',
	'Carlos Miranda',
	'carlosmiranda@gmail.com',
	'Filosofos 778',
	'Monterrey',
	'Nuevo Leon',
	'64354',
	'okcuck',
	'cliente'
);
insert into serie values ('boku-no-hero-academia', 'Boku no Hero Academia');
insert into serie values ('monogatari-series', 'MONOGATARI Series');
insert into serie values ('kimi-ni-todoke', 'Kimi ni Todoke');
insert into serie values ('little-witch-academia', 'Little Witch Academia');
insert into serie values ('love-live', 'Love Live!');
insert into personaje values ('Hitagi Senjougahara', 'monogatari-series');
insert into personaje values ('Momo Yaoyorozu', 'boku-no-hero-academia');
insert into personaje values ('Sawako Kuronuma', 'kimi-ni-todoke');
insert into personaje values ('Tsubasa Hanekawa', 'monogatari-series');
insert into personaje values ('Nadeko Sengoku', 'monogatari-series');
insert into personaje values ('Shinobu Oshino', 'monogatari-series');
insert into producto values (
	123456789123,
	'Senjougahara Hitagi Madoka',
	'Hitagi Senjougahara',
	'monogatari-series',
	3,
	799,
	null,
	0,
	20,
	'Banpresto'
);
insert into producto values (
	987654321345,
	'Sucy Manbavaran Chibi',
	'Sucy Manbavaran',
	'little-witch-academia',
	2,
	299,
	null,
	0,
	10,
	'Banpresto'
);
insert into producto values (
	738293678908,
	'Sucy Manbavaran Nendoroid',
	'Sucy Manbavaran',
	'little-witch-academia',
	3,
	299,
	null,
	10,
	10,
	'Banpresto'
);
insert into producto values (
	879065789756,
	'Maki Nishikino Maid',
	'Maki Nishikino',
	'love-live',
	5,
	699,
	null,
	0,
	18,
	'Banpresto'
);
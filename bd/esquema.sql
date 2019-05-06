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
	imagen_id serial PRIMARY KEY,
	nombre varchar(200),
	nombre_imagen varchar(200)
);
create table producto (
	producto_id bigint NOT NULL UNIQUE,
	nombre_producto varchar(100),
	nombre_personaje varchar(100),
	serie_id varchar(100),
	stock int NOT NULL,
	precio decimal,
	imagen_id int references imagen(imagen_id),
	descuento decimal,
	altura decimal,
	marca varchar(100),
	foreign key (nombre_personaje, serie_id) references personaje (nombre, serie_id),
	check(descuento >= 0 and descuento <= 100),
	PRIMARY KEY (producto_id)
);
create table usuario (
	usuario_id varchar(40) NOT NULL UNIQUE,
	nombre varchar(100),
	email varchar(100) NOT NULL,
	direccion varchar(200),
	ciudad varchar(60),
	estado varchar(60),
	cp varchar(20),
	contrasena varchar(200),
	rol varchar(20),
	PRIMARY KEY (usuario_id)
);
create table ticket (
	ticket_id bigint NOT NULL UNIQUE,
	usuario_id varchar(40) references usuario(usuario_id),
	total decimal,
	fecha date,
	comentarios varchar(200),
	PRIMARY KEY (ticket_id)
);

create table productoticket (
	productoticket_id serial PRIMARY KEY,
	ticket_id bigint NOT NULL, 
	producto_id bigint NOT NULL, 
	cantidad bigint NOT NULL, 
	foreign key (ticket_id) references ticket (ticket_id), 
	foreign key (producto_id) references producto (producto_id)
);


----------------------- insercion de datos ----------------------------------
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
insert into personaje values ('Koyomi Araragi', 'monogatari-series');
insert into personaje values ('Sucy Manbavaran', 'little-witch-academia');
insert into personaje values ('Lotte Janson', 'little-witch-academia');
insert into personaje values ('Atsuko Kagari', 'little-witch-academia');
insert into personaje values ('Diana Cavendish', 'little-witch-academia');
insert into personaje values ('Maki Nishikino', 'love-live');
insert into personaje values ('Nozomi Toujou', 'love-live');
insert into personaje values ('Eli Ayase', 'love-live');
insert into personaje values ('Nico Yazawa', 'love-live');
insert into producto values (
	123456789123,
	'Senjougahara Hitagi Madoka',
	'Hitagi Senjougahara',
	'monogatari-series',
	3,
	799,
	1,
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
	'Banpresto');
insert into ticket values (1, 'cuckarlos', 9388, '04/27/2019', 'puta que oferton');
insert into ticket values (2, 'cuckarlos', 299, '04/27/2019', 'nice!' );
insert into productoticket (producto_id, ticket_id, cantidad) values (123456789123, 1, 10);
insert into productoticket (producto_id, ticket_id, cantidad) values (879065789756, 1, 2);
insert into productoticket (producto_id, ticket_id, cantidad) values (738293678908, 2, 1);
insert into imagen(nombre, nombre_imagen) values ('Senjougahara Hitagi Madoka', 'senjo.png');
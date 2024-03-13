
DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	telefono VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	contrasena VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL	
);


DROP TABLE IF EXISTS roles
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(180) NOT NULL,
	imagen VARCHAR(255) NULL,
	ruta VARCHAR (255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL		
);


DROP TABLE IF EXISTS usuarios_tiene_roles CASCADE;
CREATE TABLE usuarios_tiene_roles(
	id_usuario BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_usuario, id_rol)
);

-------------------------------------------------->
INSERT INTO roles(
	nombre,
	imagen,
	ruta,
	created_at,
	update_at
)
VALUES(
	'CLIENTE',
	'https://cdn-icons-png.flaticon.com/512/6009/6009864.png',
	'cliente/home',
	'2024-01-30',
	'2024-01-30'	
);

INSERT INTO roles(
	nombre,
	imagen,
	ruta,
	created_at,
	update_at
)
VALUES(
	'REPARTIDOR',
	'https://cdn-icons-png.flaticon.com/512/2644/2644555.png',
	'administrativo/home',
	'2024-01-30',
	'2024-01-30'	
);

INSERT INTO roles(
	nombre,
	imagen,
	ruta,
	created_at,
	update_at
)
VALUES(
	'RESTAURANTE',
	'https://cdn-icons-png.freepik.com/256/2075/2075450.png',
	'soporte/home',
	'2024-01-30',
	'2024-01-30'	
);


DROP TABLE IF EXISTS categorias CASCADE;

CREATE TABLE categorias(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
	
);

DROP TABLE IF EXISTS productos CASCADE;
CREATE TABLE productos(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(180) NOT NULL UNIQUE,
	descripcion VARCHAR(255) NOT NULL,
	precio DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_categoria BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_categoria) REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE CASCADE
);
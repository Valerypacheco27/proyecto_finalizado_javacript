create database DB_LaSoledad;
use DB_LaSoledad;
create table usuarios(
    id int not null PRIMARY KEY auto_increment,
    nombre varchar (50) not null, 
    apellido varchar (50) not null,
    correo varchar (255) not null,
    telefono int (15) not null,
    pass varchar (255) not null,
    grupo varchar(255) not null
    );
    describe usuarios; 

    create table contactanos (
        id int not null PRIMARY KEY auto_increment,
        nombre_completo varchar (50) not null,
        correo varchar (50) not null,
        telefono int (50) not null,
        mensaje varchar (255) not null
        );
        describe contactanos;

    create table grupo (
        id int not null PRIMARY KEY auto_increment,
        nombre_completo varchar (50) not null,
        correo varchar (50) not null,
        grupo varchar (50) not null
    );
        describe grupo;

    CREATE TABLE IF NOT  EXISTS r_usuarios_grupo(
        id_usuarios_grupo  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT(11) NOT NULL,
        id_grupo INT (11) NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_grupo) REFERENCES grupo (id) ON DELETE CASCADE ON UPDATE CASCADE
    );
        describe r_usuarios_grupo;
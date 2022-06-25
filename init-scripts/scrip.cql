CREATE KEYSPACE baseDatos

WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 2
};

CREATE TABLE baseDatos.paciente(
    id UUID, 
    nombre text,
    apellido text,
    rut text,
    email text,
    fecha_nacimiento text,
    PRIMARY KEY(id)
);

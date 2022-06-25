CREATE KEYSPACE baseDatos1

WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 3
};

CREATE TABLE baseDatos1.receta(
    id UUID PRIMARY KEY, 
    id_paciente UUID,
    comentario text,
    farmacos text,
    doctor text
);
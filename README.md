# Tarea03SistemasDistribuidos

## Objetivo
El objetivo de la tarea consiste en que los estudiantes entiendan las principales features y caracter ́ısticas de Cassandra,
haciendo las configuraciones pertinentes, programando una REST API con operaciones CRUD y levantando un cluster.
## Enunciado
Usted como trabajador de Fruitter, ha logrado escalar puestos debido a su gran conocimiento de tecnolog ́ıas utilizadas
en los sistemas distribuidos. El d ́ıa de hoy, Melon Musk le ha comentado que tiene un nuevo emprendimiento: la venta
de f ́armacos y que debe rigurosamente cumplir ciertas reglas.  ́El ha encargado a usted una de las partes m ́as
importantes, la consistencia de datos de las recetas de los pacientes.

Como usted es un prodigio de los sistemas distribuidos, ha de primero demostrar el funcionamiento de la soluci ́on
que se prevee, la cual consiste en la utilizaci ́on de Cassandra.
Para esto ha de usar (una vez m ́as) contenedores1, generando un Cluster de manera local con el fin de presentar la
tecnolog ́ıa. El cl ́uster de Cassandra deber ́a contener la siguiente estructura:

- Tres nodos de Cassandra2 , para la demostraci ́on.
- Dependiendo de las tablas que se deseen guardar, se deber ́a tener un factor de replicaci ́on seg ́un se especifique en ellas.

![image](https://user-images.githubusercontent.com/69988825/175790921-c1011d2c-6c45-4a7f-9b47-632237b00f69.png)

Por otro lado, uno de los ingenieros que trabajan para Melon Musk, le ha dicho a usted que debe utilizar la estructura
mostrada en la figura 2.

**Nota**: Sabemos que Cassandra es una base de datos NoSQL. El diagrama de la figura 2 tiene el fin de que usted
pueda entender la relaci ́on que se pide.

Adem ́as, es importante considerar que la tabla paciente debe estar replicada en 2 nodos, mientras que la tabla
recetas debe estar replicada en los 3 nodos. Finalmente, usted debe crear una API REST donde se puedan crear, editar
y eliminar datos de la base de datos.

## Preguntas
Además, en base al trabajo desarrollado en esta tarea debe investigar y responder las siguientes preguntas:

1. Explique la arquitectura que Cassandra maneja. Cuando se crea el cl ́uster ¿C ́omo los nodos se conectan? ¿Qué ocurre cuando un cliente realiza una petici ́on a uno de los nodos? ¿Qu ́e ocurre cuando uno de los nodos se desconecta? ¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?

2. Cassandra posee principalmente dos estrategias para mantener redundancia en la replicaci ́on de datos. ¿Cu ́ales son
estos? ¿Cu ́al es la ventaja de uno sobre otro? ¿Cu ́al utilizar ́ıa usted para en el caso actual y por qu ́e? Justifique
apropiadamente su respuesta.

3. Teniendo en cuenta el contexto del problema ¿Usted cree que la soluci ́on propuesta es la correcta? ¿Qu ́e ocurre
cuando se quiere escalar en la soluci ́on? ¿Qu ́e mejoras implementar ́ıa? Oriente su respuesta hacia el Sharding (la
replicaci ́on/distribuci ́on de los datos) y comente una estrategia que podr ́ıa seguir para ordenar los datos.

## Sobre este repositorio
En el presente repositorio se encontra el código de utilizado para solucionar la problemática del enunciado, las instrucciones necesarias para su instalacion y la resolucion a las preguntas solucitadas . 

## Instalación
El repositorio debe de ser clonado en alguna carpeta mediante el comando 
```
$ git clone https://github.com/SConcha99/Tarea3SistemasDistribuidos.git
```

## Resolución Preguntas

1.

2.

3.

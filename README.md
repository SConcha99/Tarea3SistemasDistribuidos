# Tarea03SistemasDistribuidos Sebastián Gonzales y Sebastián Concha (duo dinámico)

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
Una vez clonado el proyecto, se deben inicializar los contenedores con el siguiente comando:
 ```
 docker-compose up --build
 ```

## Resolución Preguntas

1.

Cassandra implementa una arquitectura de tipo Peer to Peer, esto lo hace 
con la intencion de ser tolerante a fallos, escalable y alto rendimiento
de entrada y salida de datos. Los datos están distribuidos y replicados 
a lo largo de los nodos del cluster. A un conjunto de nodos se le denomina 
centro de datos, y a una colección de centros de datos se le llama
cluster el cual, a su vez se le denomina *Ring*.

Los nodos se comunican mediante el protocolo gossip (chisme), mediante él 
intercambian periodicamente informacion de si mismos y los nodos
que conozcan, logrando así sincronía y consistencia del estado de la red. 
Por otro lado, gracias a la arquitectura de *anillo de hash*, Cassandra es 
capaz de incluir nodos actualizando dicha tabla, avisandole a
los nodos del anillo y enviar la data requerida al nuevo nodo y cuando su estatus
sea "disponible", añadirlo al cluster junto con el resto de los nodos.

Al momento de realizarse una consulta a uno de los nodos, este actua como 
coordinador entre él y el resto de los nodos con datos relacionados con la
consulta.

Puesto que Cassandra posee los datos replicados entre distintos nodos, al 
desconectarse uno de ellos, se puede acceder a su información desde otro nodo.
Así mismo, cada nodo tiene un  fichero donde registra de las acciones que ha 
realizado (*Commit log*) este sirve para recuperar los datos en caso de un fallo 
en el sistema

La red que generada por los nodos variará según el tipo de particionador que Cassandra esté utilizando (RandomPartitioner u Order Preserving Partitioners).
Cada uno de ello provee distintos beneficios, como una mejor distribucion de los nodos o mantener el orden en el que se distribuyen las claves.
Visto desde esta punto de vista, la eficiencia de la aplicación variará de como esten distribuidos los datos
y la forma en la que se realicen las consultas.

Cassandra implementa politicas de balanceo de cargas las cuales determinan
caracteristicas tales como con qué nodos se va a comunicar el driver, y por cada
query cual coordinador debe elegir y qué nodos usar como respaldos en caso de fallos.




2.

Las principales estrategias de replicación de Cassandra son la SimpleStategy y 
NetworkTopologyStrategy. La primera consiste en colocar replicas en nodos consecutivos
alrededor del anillo, en cambio la segunda permite utilizar diferentes factores de 
replicación en distintos centro de datos. 
La ventaja principal de NetworkTopologyStrategy por sobre SimpleStategy es la capacidad
de generar multiples replicas de nodos en diferentes centros de datos, así mismo que 
estas son asignadas a diferentes **racks** maximizando así la disponibilidad de los datos.
En el caso actual es apropiado utilizar SimpleStategy, principalmente porque se está utilizando
un solo datacenter, y el hecho de implementar más no sería beneficioso dada la pequeña escala
de la solución implementada.

3. 
El problema que se nos ha encargado solucionar es el de implementar una solución que proporcione
consistencia de datos de las recetas de los pacientes (y aunque no literalmente, tambien una alta
disponibilidad). Es por ello que se ha planeado utilizar Cassandra, dado lo escrito anteriormente
en las otras preguntas, se puede decir que esta herramientas es una solución adecuada para la
problemática. 

La solucion como está implementada actualmente no funcionaría en caso de escalar a un caso real (con cientos de usuarios realizando consultas a la vez).

En caso de escalar la solución, se deberian de modificar la cantidad de memoria asignada por nodo,
así como el número de ellos dentro del datacenter. Incluyendo tambien otro cluster (según sea
necesario) y modificar las politicas de replicacion a una de NetworkTopologyStrategy puesto que se
replicarian los datos dentro de distintos datacenters así como aumentaría la disponibilidad de los
datos. Por otro lado, utilizando tecnicas de **Sharding** se pueden crear disitntas instancias de bases de
datos, más pequeñas mejorando así situaciones de optimizacion y escalabilidad horizontal. Asimilando la 
situación entregada, podremos asumir que van a existir un mayor número de recetas que de pacientes, es por 
ello que sería eficiente el implementar un mayor número de **shards** de dichos datos. Así mismo, la 
replicacion de los datos y la presencia de distintos datacenters ayudarán a la disponibilidad de 
la aplicación.


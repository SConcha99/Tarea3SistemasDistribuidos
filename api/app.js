const express = require('express');
const cors = require("cors");
const idAutoIncrement = require("id-auto-increment");
const { v4: uuidv4 } = require('uuid');

const cassandra = require('cassandra-driver');

const app = express();
app.use(express.json())
const port=3000;

const client = new cassandra.Client({
  contactPoints: ['cassandra-node1','cassandra-node2'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'password123'),
  keyspace: 'basedatos'
});

const client1 = new cassandra.Client({
    contactPoints: ['cassandra-node1','cassandra-node2'],
    localDataCenter: 'datacenter1',
    authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'password123'),
    keyspace: 'basedatos1'
});

app.post ("/create", async (req,res)=>{
  try {
    const query = 'SELECT * FROM paciente WHERE rut=? ALLOW FILTERING';
    const query1= 'INSERT INTO paciente (id,nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?)'
    const query2= 'INSERT INTO receta (id,id_paciente,comentario,farmacos,doctor) VALUES(?,?,?,?,?)'
    var id = uuidv4()
    
    const nombre=req.body.nombre
    const apellido=req.body.apellido
    const rut=req.body.rut
    const email=req.body.email
    const fechaNacimiento=req.body.fecha_nacimiento
    
    var id1=uuidv4()
    const comentarios=req.body.comentarios
    const farmaco=req.body.farmaco
    const doctor=req.body.doctor
    
    await client.execute(query, [rut]).then(result => {
      //console.log('QUE ES ESTO?  %s', result)
      console.log('que es 2: ', result.rows[0])
      if(result.rows[0]==undefined){
        client.execute(query1,[id,nombre,apellido,rut,email,fechaNacimiento]).then(result1 =>{
          console.log("paciente: ",result1)
        })
        client1.execute(query2,[id1,id,comentarios,farmaco,doctor]).then(result2 =>{
          console.log("receta: ",result2)
        })
        res.send("paciente Agregado. id paciente: ",id )
        console.log("Paciente agregado")

      }else{
        console.log("Usuario ya existe")
        res.send("usuario ya existe")
      }

    });
    //console.log(req.body)
  } catch (error) {
    console.log(error)
  }
})
app.get("/algo", async ()=>{
  try {
    //const query = 'INSERT INTO paciente (id,nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?,?)';
    //await client.execute(query, [ uuidv4(),'benja','peres','4','1','abril' ]).then(result => {
    //  console.log('User with email %s', result)
    //});
    const query1= 'SELECT * FROM paciente WHERE id=? ALLOW FILTERING';
    const query = "DELETE FROM paciente WHERE id=?;";
    //await client.execute(query, ['273ec806-0d74-4095-bdef-ac89f698dfa7']).then(result => {
    //  console.log('QUE ES ESTO?  %s', result.rows[0])
    //});
    await client.execute(query1, ['273ec806-0d74-4095-bdef-ac89f698dfa7']).then(result => {
      console.log('QUE ES ESTO?  %s', result)
      console.log('que es 2: ', result.rows[0])
    });
    /*client.execute(query).then(result => {
      console.log(' que es esto', result.rows[0])
        
    });*/
   
  } catch (error) {
    console.log(error)
  }

  /*
  const query = 'INSERT INTO recetas (id, nombre,apellido,rut,email,fecha_nacimiento) VALUES(?,?,?,?,?)';
  */
})
/*
const query = 'SELECT name, email FROM users WHERE key = ?';

client.execute(query, [ 'someone' ])
  .then(result => console.log('User with email %s', result.rows[0].email));



*/
app.listen(port, ()=>{
    console.log(`Express listening at http://localhost:${port}`)
})
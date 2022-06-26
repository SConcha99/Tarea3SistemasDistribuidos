const express = require('express');
const cors = require("cors");
const idAutoIncrement = require("id-auto-increment");
const uuidBuffer = require('uuid-buffer');
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
    const comentarios=req.body.comentario
    const farmaco=req.body.farmacos
    const doctor=req.body.doctor
    
    await client.execute(query, [rut]).then(result => {
      //console.log('QUE ES ESTO?  %s', result)
      console.log('que es 2: ', result.rows[0])
      if(result.rows[0]==undefined){
        client.execute(query1,[id,nombre,apellido,rut,email,fechaNacimiento]).then(result1 =>{
          //console.log("paciente: ",result1)
        })
        client1.execute(query2,[id1,id,comentarios,farmaco,doctor]).then(result2 =>{
          //console.log("receta: ",result2)
        })
        res.send("paciente Agregado. id paciente: " )
        console.log("Paciente agregado ",id ," - ", id1)
        console.log("id paciente: ",id ," - id receta: ", id1)

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

app.post("/edit", async (req,res)=>{
  const query = 'SELECT * FROM receta WHERE id=? ALLOW FILTERING';
  const query1 = 'UPDATE receta SET comentario = ?, farmacos = ?, doctor = ?  WHERE id=?';

  const id=req.body.id
  const comentarios=req.body.comentario
  const farmaco=req.body.farmacos
  const doctor=req.body.doctor

  await client1.execute(query, [id]).then(result => {
    if (result.rows[0]==undefined){
      res.send("No existe id, no se puede editar")
    }else{
      client1.execute(query1,[comentarios,farmaco,doctor,id]).then(result1=>{
        console.log("que sale aca: ",result1)
      })
      res.send("editado")
    }
  });

})

app.post("/delete", async(req,res)=>{
  const query = 'SELECT * FROM receta WHERE id=? ALLOW FILTERING';
  const query1 = 'DELETE FROM receta WHERE id=?';
  const query2 = 'DELETE FROM paciente WHERE id=?';
  const id=req.body.id
  
  await client1.execute(query, [id]).then(result => {
    console.log(result.rows)
    if (result.rows[0]==undefined || result.rows.lenght==0){
      res.send("No existe id, no se puede editar")
    }else{
      const idReceta=uuidBuffer.toString(result.rows[0].id.buffer)
      const idPaciente=uuidBuffer.toString(result.rows[0].id_paciente.buffer)
      client1.execute(query1,[idReceta]).then(result1 =>{
        console.log(result1)
      })
      client.execute(query2,[idPaciente]).then(result2 =>{
        console.log(result2)
      })
      res.send("eliminado")
    }
  });
})

app.get("/mostrar",async(req,res)=>{
  const query = 'SELECT * FROM paciente WHERE id=? ALLOW FILTERING';
  const query1= 'SELECT * FROM receta WHERE id=? ALLOW FILTERING';
  await client1.execute(query1, [req.body.id]).then(result => {
    client.execute(query, [req.body.id]).then(result1 =>{
      console.log("lista de pacientes: ",result.rows)
      console.log("lista de recetas: ",result1.rows)
    })
  });
})
app.get("/",()=>{
  console.log("algo")
})
app.listen(port, ()=>{
    console.log(`Express listening at http://localhost:${port}`)
})
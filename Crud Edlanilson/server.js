const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb+srv://extridph:bola25251@cluster0.ug4xq.gcp.mongodb.net/Desafio1?retryWrites=true&w=majority"
MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Desafio1') // coloque o nome do seu DB
   
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true}))
app.set('views', './view');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('Pedro/index');
  var cursor = db.collection('data').find()
})

app.get('/data/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Pedro/shows', { data: results })
 
    })
})

app.get('/data/registra', (req, res) => {
  db.collection('data').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Pedro/registra', { data: results })

  })
})

app.get('/data/edit', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Pedro/edit', { data: results })

    })
})

app.get('/data/delete', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Pedro/edit', { data: results })

    })
})

app.post('/data/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/data/show')
    })
})

////
app.route('/data/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('Pedro/edit', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var datadenascimento = req.body.datadenascimento
  var cpf = req.body.cpf
  var cidade = req.body.cidade
  var estado = req.body.estado
  var email = req.body.email
  var telefone = req.body.telefone
 
  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname,
      datadenascimento: datadenascimento,
      cpf: cpf,
      cidade: cidade,
      estado: estado,
      email: email,
      telefone: telefone
      
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/data/show')
    console.log('Atualizado no Banco de Dados')
  })
})
app.route('/data/delete/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/data/show')
  })
})

//------------Amanda----
app.get('/amand/show', (req, res) => {
  db.collection('amand').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Amanda/shows', { data: results })

  })
})
app.get('/amand/cadastramento', (req, res) => {
  db.collection('amand').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Amanda/cadastramento.ejs', { data: results })

  })
})

app.get('/amand/edit', (req, res) => {
  db.collection('amand').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Amanda/edit', { data: results })

  })
})

app.get('/amand/delete', (req, res) => {
  db.collection('amand').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Amanda/edit', { data: results })

  })
})

app.post('/amand/show', (req, res) => {
  db.collection('amand').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('Salvo no Banco de Dados')
      res.redirect('/amand/show')
  })
})
app.route('/amand/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('amand').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('Amanda/edit', { data: result })
  })
//-----------------Variaveis de Amanda--------------------------------------
})
    .post ((req, res) => {
      var id = req.params.id
      var nome= req.body.nome
      var datadenascimento = req.body.datadenascimento
      var cpf = req.body.cpf
      var rg = req.body.rg
      var jogofavorito = req.body.jogofavorito
      var jogofavorito2 = req.body.jogofavorito2
      var generodejogo = req.body.generodejogo
      var escolha = req.body.escolha
      db.collection('amand'). updateOne(
        {
          _id: ObjectId(id)
        },
      {
        $set:{
          nome: nome,
          datadenascimento: datadenascimento,
          cpf: cpf,
          rg: rg,
          jogofavorito:jogofavorito,
          jogofavorito2: jogofavorito2,
          generodejogo: generodejogo,
          escolha: escolha
        }
      
      }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/amand/show')
        console.log('Atualizado no Banco de Dados')
      })
    })
    app.route('/amand/delete/:id')
    .get((req, res) => {
      var id = req.params.id
     
      db.collection('amand').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/amand/show')
      })
    })

    //---------------------Crud de Edlanilson---------
    app.get('/Ed/show', (req, res) => {
      db.collection('Ed').find().toArray((err, results) => {
          if (err) return console.log(err)
          res.render('Edlanilson/shows', { data: results })
   
      })
  })
  app.get('/Ed/cadastra', (req, res) => {
    db.collection('Ed').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Edlanilson/cadastra', { data: results })
  
    })
  })
  app.get('/Ed/edit', (req, res) => {
    db.collection('Ed').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Edlanilson/edit', { data: results })
  
    })
  })
  
  app.get('/Ed/delete', (req, res) => {
    db.collection('Ed').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Edlanilson/edit', { data: results })
  
    })
  })
  
  app.post('/Ed/show', (req, res) => {
    db.collection('Ed').save(req.body, (err, result) => {
        if (err) return console.log(err)
  
        console.log('Salvo no Banco de Dados')
        res.redirect('/Ed/show')
    })
  })
  app.route('/Ed/edit/:id')
  .get((req, res) => {
    var id = req.params.id
   
    db.collection('Ed').find(ObjectId(id)).toArray((err, result) => {
      if (err) return res.send(err)
      res.render('Edlanilson/edit', { data: result })
    })
  })
//----------------Variaves do curd
  .post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var sobrenome = req.body.sobrenome
    var cpf = req.body.cpf
    var genero = req.body.genero
    var filme = req.body.filme
    var ano = req.body.ano
    var email = req.body.email
    var opiniao = req.body.opiniao
   
    db.collection('Ed').updateOne({_id: ObjectId(id)}, {
      $set: {
        name: name,
        sobrenome: sobrenome,
        cpf: cpf,
        genero: genero,
        filme: filme,
        ano: ano,
        email: email,
        opiniao: opiniao
        
      }
    }, (err, result) => {
      if (err) return res.send(err)
      res.redirect('/Ed/show')
      console.log('Atualizado no Banco de Dados')
    })
  })
  app.route('/Ed/delete/:id')
  .get((req, res) => {
    var id = req.params.id
   
    db.collection('Ed').deleteOne({_id: ObjectId(id)}, (err, result) => {
      if (err) return res.send(500, err)
      console.log('Deletado do Banco de Dados!')
      res.redirect('/Ed/show')
    })
  })
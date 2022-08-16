var express = require('express')
const { ObjectId } = require('mongodb')
var app=express()
var MongoClient = require('mongodb').MongoClient
app.set('view engine','hbs')
var url ='mongodb://localhost:27017'
app.use(express.urlencoded({extended:true}))
// var url='mongodb+srv://buiduccanh10:canhit27102002@cluster0.vnczvvu.mongodb.net/test'

app.post('/addToy',async(req,res)=>{
    let product = {
        name : req.body.name,
        brand: req.body.brand,
        img: req.body.img,
        inf: req.body.inf,
        price: Number(req.body.price)
    }
    let client = await MongoClient.connect(url);
    let dbo = client.db("ToyDB")
    await dbo.collection("ToyProduct").insertOne(product)
    res.redirect('allToy')
})

app.post('/addToy',async(req,res)=>{
    let product = {
        name : req.body.name,
        brand: req.body.brand,
        img: req.body.img,
        inf: req.body.inf,
        price: Number(req.body.price)
    }
    let client = await MongoClient.connect(url);
    let dbo = client.db("ToyDB")
    await dbo.collection("ToyProduct").insertOne(product)
    res.redirect('home')
})

app.get('/allToy',async(req,res)=>{
    let client= await MongoClient.connect(url)
    let dbo = client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").find().toArray()
    console.log(prods)
    res.render('allToy',{'prods':prods})
})
/////////////////////////////////////////////////////////////////////
app.get('/',async(req,res)=>{
    let client= await MongoClient.connect(url)
    let dbo = client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").find().toArray()
    console.log(prods)
    res.render('home',{'prods':prods})
})
/////////////////////////////////////////////////////////////////////
//sort desc, asc
app.get('/sortDesc',async(req,res)=>{
    let client= await MongoClient.connect(url)
    let dbo = client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").find().sort({name:1}).toArray()
    console.log(prods)
    res.render('allToy',{'prods':prods})
})

app.get('/sortAsc',async(req,res)=>{
    let client= await MongoClient.connect(url)
    let dbo = client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").find().sort({name:-1}).toArray()
    console.log(prods)
    res.render('allToy',{'prods':prods})
})

app.get('/delete',async(req,res)=>{
    let id = req.query.id
    console.log(id)
    let objectId = ObjectId(id)
    let client= await MongoClient.connect(url)
    let dbo=client.db("ToyDB")
    await dbo.collection("ToyProduct").deleteOne({_id:objectId})
    res.redirect('/allToy')
})

app.get('/edit',async(req,res)=>{
    let id = req.query.id
    let objectId = ObjectId(id)
    let client= await MongoClient.connect(url)
    let dbo=client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").findOne({_id:objectId})
    console.log(prods)
    res.render('edit',{'prods':prods})
})

app.post('/update',async(req,res)=>{
    let id = req.body.id
    let name = req.body.name
    let brand = req.body.brand
    let img = req.body.img
    let inf = req.body.inf
    let price = Number(req.body.price) 
    let product = {
        'name' : name,
        'brand': brand,
        'img': img,
        'inf': inf,
        'price': price
    }
    let client = await MongoClient.connect(url);
    let dbo = client.db("ToyDB")
    await dbo.collection("ToyProduct").updateOne({_id:ObjectId(id)},{$set:product})
    res.redirect('/allToy')
})

app.post('/search',async(req,res)=>{
    let name = req.body.search
    let client= await MongoClient.connect(url)
    let dbo = client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").find({'name':new RegExp(name,'i')}).toArray()
    console.log(prods)
    res.render('allToy',{'prods':prods})
})

app.post('/searchHome',async(req,res)=>{
    let name = req.body.search
    let client= await MongoClient.connect(url)
    let dbo = client.db("ToyDB")
    let prods = await dbo.collection("ToyProduct").find({'name':new RegExp(name,'i')}).toArray()
    console.log(prods)
    res.render('home',{'prods':prods})
})

app.get('/addToy',(req,res)=>{
    res.render('addToy')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is running")
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const port = 4000;
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAM22SUgsxPmyPx9G9wKbsABOY6u2CrWNo",
    authDomain: "australia-handbook.firebaseapp.com",
    databaseURL: "https://australia-handbook.firebaseio.com",
    projectId: "australia-handbook",
    storageBucket: "australia-handbook.appspot.com",
    messagingSenderId: "772324184653"
  };
// var path = require('path');
// var public = path.join(__dirname, 'public');
firebase.initializeApp(config);
const app =  express();

function getData(itemID){
    const ref = firebase.database().ref('Items/'+ itemID);
    return ref.once('value').then(snap=> snap.val());
}

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');
// app.use('/mua-ban', express.static(public))
app.use("/mua-ban/:itemID", express.static(__dirname + '/public'));
// app.use("/", express.static(__dirname + '/public'));
app.get('/', (request, respond)=> {
    respond.set('Cache-Control', "public, max-age=300, s-maxage=600")
    respond.render('index');
})
app.get('/tim-kiem', (request, respond)=> {
    respond.set('Cache-Control', "public, max-age=300, s-maxage=600")
    respond.render('productView.hbs');
})
app.get('/mua-ban/:itemID', (request, respond) => {
    // res.set('Cache-Control', "public, max-age=30, s-maxage=600")
    console.log(request.params.itemID, 'itemID');
    
    getData(request.params.itemID).then((data)=>{
        const {imageURL} = data;
        const images = Object.keys(imageURL).map((key)=> {
            return imageURL[key];
        });
        console.log(images, 'images');
        
        // respond.set('Cache-Control', "public, max-age=30, s-maxage=600")
        respond.render('detailItem.hbs', {data:data, images:images});
    }).catch((err)=> {
        console.log(err);
    })
  });
app.get('/sign-up', (request, respond)=> {
    respond.render('signUp.hbs');
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
exports.app = functions.https.onRequest(app);

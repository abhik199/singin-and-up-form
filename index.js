const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const con = require('./models/singup')
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static("public"))
app.get('/',(req,res)=>{
    res.render('signup')

})
app.get('/index',(req,res)=>{
    res.render('index')
})
mongoose.connect("mongodb://localhost:27017/Enter_form",()=>{
    console.log("db connteded")
})
app.post("/signup_form", (req,res)=>{
    try{
        const password = (req.body.password)
        const confirm_password = (req.body.confirm_password)
        
        if(password == confirm_password){
            const data = con.create(req.body)
            res.redirect('login')
        }
        else{
            res.send("you password is not match")
        }
        res.end()
    }catch (e){
        console.log(e)
    }


    
})
app.get('/login',(req,res)=>{
    res.render('login')
    
})
app.post("/login_form", async(req,res)=>{
    try {
        const email = (req.body.email)
        const password = (req.body.password)
        
        const usermail = await con.findOne({email:email})
        if(usermail.password == password){
           res.redirect('index')

        }
        else {
            res.status(404).send("not matching")
            res.redirect('singnup')
        }
    } catch (error) {
        console.log(error)
    }
    res.end()
})
app.set("view engine","hbs")


app.listen(9888)
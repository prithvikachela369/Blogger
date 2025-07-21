import express from "express"
import bodyParser from "body-parser";
import morgan from "morgan"

const app = express();
const port = 3000;
app.use(morgan('combined'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
var used =false;
var title;
var content;
var titles = [];
var contents = [];
var viewCurrent;
var editCurrent;
app.get("/",(req,res) =>{
    if(used === false){
        res.render("index.ejs");
    }else{
        res.render("main.ejs",{
            titles,contents,viewCurrent
                    }); 
    }
});
app.post("/",(req,res) =>{
    if(used === false){
        res.render("index.ejs");
    }else{
        res.render("main.ejs",{
titles,contents,viewCurrent
        }); 
    }
});
app.post("/create",(req,res)=>{
    res.render("create.ejs");
});
app.post("/about",(req,res)=>{
    res.render("about.ejs");
});
app.post("/submit",(req,res)=>{
    console.log(req.body.title);
    console.log(req.body["content"]);
    title = req.body["title"];
    content=req.body["content"];
    if(req.body["title"]!=null){
        titles.push(title);
        contents.push(content);
        res.redirect("/");
        res.render("main.ejs",{
    titles,contents,viewCurrent
        });  
        used = true;
    }else{
        alert("Please fill out the required fields!!!");
        used=false;
    }
    });
        app.post("/view/:id",function(req,res){
            console.log(req.params.id);
            viewCurrent = req.params.id;
    res.render("view.ejs",{
        titles,contents,viewCurrent
    });
        });
    app.post("/edit/:id",function(req,res){
    editCurrent = req.params.id;
    res.render("edit.ejs",{
    titles,contents,editCurrent
    });
    });
        app.post("/save/:id",function(req,res){
        titles[req.params.id]=req.body["title"];
        contents[req.params.id]=req.body["content"];
        viewCurrent = req.params.id;
        res.render("view.ejs",{
            titles,contents,viewCurrent
        });
        });
app.post("/delete/:id",function(req,res){
    console.log(req.params.id);
titles.splice(req.params.id,1);
contents.splice(req.params.id,1);
if(titles.length===0){
    used=false;
}else{
    used=true;
}
res.redirect("/");
});
app.listen(port, function(){
    console.log("Server running on PORT", port);
});
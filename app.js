const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

// create item variable here so that it can use anywhere
const items = ["Morning Routine", "Work Routine", "Daily Task"];
//  create array for workItem
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // ejs


app.get("/", (req, res) => {
    var today = new Date();
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = today.toLocaleDateString("en-Us", option); 

    // res.render("list", { listTitle: day }); -- before adding newListItem
    res.render('list', {listTitle: day, newListItem: items}); 
});

app.post("/", (req, res) => {

    let item = req.body.newItem;

    // for work
    if(req.body.button == "work"){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
    
    // items array  is initialse at top we add item in items array 
    items.push(item);


    // firsty we us to add list using ejs template res.render method but website crash so use this 
    res.redirect('/');
}

});

// work route
app.get("/work", (req,res) =>{
    res.render('list', {listTitle: "work List", newListItem: workItems});
});

app.post('/work', (req,res) =>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})


app.listen(3000, () => {
    console.log("server is running at port 3000");
});

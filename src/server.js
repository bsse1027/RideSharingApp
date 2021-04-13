const express = require("express");


const app = express();
const port =3000;

app.use(
    express.urlencoded({
      extended: true
    })
  );

app.use(express.json());

//Routes

app.get("/",(req,res)=>{

    res.send("HELLO").status(200);

});



app.listen(port,()=>{

    console.log(`Server started on port ${port}`);
});
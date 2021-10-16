/* Dependencies */
import  express from 'express';
const pasrser = require("body-parser");
const app = express();
const axios = require("axios").default;
const sqlite3 = require("sqlite3").verbose();

/* Middlewares */
app.use(express.json());
app.use(pasrser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

/* Create Database Con */
const db = new sqlite3.Database("./movie.db", (err: Error) => {if (err) return console.log("Error when creating the database" + err); console.log("Database Connected!");});
app.get("/", (req:any, res:any) => res.render("index"));
app.get("/insert", (req:any , res:any ) => res.render("insert"));
app.get("/crud", (req:any , res:any ) => res.render("crud"));
app.get("/insertRandom", (req:any , res:any ) => res.render("insertRandom"));

/* Create */
app.get("/create", (req:any, res:any) => db.run("SELECT name FROM sqlite_master WHERE type='table' AND name='table_name';",(err: Error, row:any) => {if (err) {res.render("create", {table: false,});} else {res.render("create", {table: true,});}}));
app.post("/create", async (req:any, res:any) => {
  const check = await req.body.check; const drop = await req.body.drop; const create = await req.body.create;
  if (check)
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='database'",(err: Error, row:any) => {if (err) res.render("create", { check: err });else if (row)res.render("create", { check: "Table movie.db Exists", table: true });else res.render("create", { check: "Table does not exist" });});
    else if (drop)
      db.run("DROP TABLE database", (err: Error) => {if (err) {res.render("create", { drop: err.message });} else res.render("create", { drop: "Table Dropped" });});
        else if (create)
          db.run("CREATE TABLE IF NOT EXISTS database(movie VARCHAR(50),actor VARCHAR(50), actress VARCHAR(50), director VARCHAR(50),year INT, rating INT, trailor VARCHAR(100) );",(err: Error) => {if (err) {res.render("create", { create: err.message });} else res.render("create", { create: "Table Created" });});
});

app.post("/insert", async (req:any, res:any) => {
  const  movie = await req.body.movie, actor = await req.body.actor, actress = await req.body.actress, director = await req.body.director, year = await req.body.year, rating = await req.body.rating, trailer = `https://www.youtube.com/results?search_query=${movie.replace(" ","+")}+trailer`;
  try {await db.run("INSERT INTO database VALUES('" +movie +"','" +actor +"','" +actress +"','" +director +"','" +year +"','" +rating +"', '" +trailer +"');");console.log("Inserted");}
  catch (err: any) {console.log("Post /insert Error"+ err);res.render("insert", { error: err });}
  res.render("insert", { success: "Inserted" });
});

const inserting = async (movie: string, actor: string, actress: string, director: string, year: number, rating: number, trailer: string) => {
  try {
    await db.run("INSERT INTO database VALUES('" +movie +"','" +actor +"','" +actress +"','" +director +"','" +year +"','" +rating+"', '" +trailer +"');");console.log("Inserted");}
  catch
  (err: any) {
    console.log("Post /insert Error"+ err);
    return err;
  }
};

app.get("/insertRand",async(req:any,res:any )=>{
  const movie = [ "Interstellar", "Uri", "The Avengers", "Doctor Strange", "Aquaman" ]
  const actor = ["Matthew McConaughey", "Vickey Koshal", "Chris Evans", "Benedict Cumberbatch", "Jason Momoa"];
  const actress = ["Ellen Page", "Yamini Gautham", "Cobie Smulders", "Jessica Chastain", "Zoe Saldana"];
  const director = ["Christopher Nolan", "Adithya Dhar", "Joss Whedon", "Scott Derrickson", "James Gunn"];
  const year = [2014, 2017, 2012, 2016, 2014];
  const rating = [9,8,7,9,8];
  let i=0;
  const trailer = [`https://www.youtube.com/results?search_query=${movie[0].replace(" ","+")}+trailer`,`https://www.youtube.com/results?search_query=${movie[1].replace(" ","+")}+trailer`, `https://www.youtube.com/results?search_query=${movie[2].replace(" ","+")}+trailer`, `https://www.youtube.com/results?search_query=${movie[3].replace(" ","+")}+trailer`, `https://www.youtube.com/results?search_query=${movie[4].replace(" ","+")}+trailer`];
  for(i=0;i<5;i++){
   try{
   await inserting( movie[i], actor[i], actress[i], director[i], year[i], rating[i], trailer[i])
   }catch(err){
     console.log("Post /insert Error"+ err);
     res.render("insertRandom", { error: err });
   }

  }
  res.render("insertRandom", { success: "Inserted" });
});

app.get("/print", async (req: any , res: any ) => {const data :any = [];try {await db.all("SELECT * FROM database",  (err:any, rows:any) =>{rows.forEach((row:any)=> {data.push(row);});res.render("print", { data });});}catch (err) {console.log("Get Print error" + err);}});

app.get("/year", (req: any , res: any ) => res.render("year"));
app.post("/year", async (req: any , res: any ) => {const year = await req.body.year,data :any = [];try {await db.all("SELECT * FROM database WHERE year = '" + year + "'", (err: Error, rows:any) => {rows.forEach((row:any)=> {data.push(row);});console.log("Data is " + data);res.render("year", { data });});}catch (err) {console.log("year" +err);}});

app.get("/actor", (req: any , res: any ) => res.render("actor"));
app.post("/actor", async (req: any , res: any ) => {const actor = await req.body.actor,data :any = [];try {await db.all("SELECT * FROM database WHERE actor = '" + actor + "'",(err: Error, rows:any) =>{rows.forEach((row:any)=> {data.push(row);});console.log(data);res.render("actor", { data });});}catch (err) {console.log("Actor"+ err);}});

app.get("/actress", (req: any , res: any ) => res.render("actress"));
app.post("/actress", async(req: any , res: any ) => {const actress = await req.body.actress,data :any = [];try {await db.all("SELECT * FROM database WHERE actress = '" + actress + "'",(err: Error, rows:any)=> {rows.forEach((row:any) =>{data.push(row);});console.log(data);res.render("actress", { data });});}catch (err) {console.log("Actress" + err);}});

app.get("/rating", (req: any , res: any ) => res.render("rating"));
app.post("/rating", async(req: any , res: any ) => {const rating = await req.body.rating;const data :any = [];try {await db.all("SELECT * FROM database WHERE rating = '" + rating + "'",(err: Error, rows:any)=> {rows.forEach((row:any) =>{data.push(row);});console.log(data);res.render("rating", {data}); });} catch (err) {console.log("Rating "+ err);}});

app.get("/director", (req: any , res: any ) => res.render("director"));
app.post("/director", async (req: any , res: any ) => {const director = await req.body.director,data :any = [];try {await db.all("SELECT * FROM database WHERE director = '" + director + "'",(err: Error, rows:any) =>{rows.forEach( (row:any)=> {data.push(row);});console.log(data);res.render("director", { data });});}catch (err) {console.log(err);}});

app.get("/delete", (req:any , res:any ) => res.render("delete"));
app.post("/delete", async (req:any , res:any ) => {const movie = await req.body.movie,  data = [];try {await db.all("SELECT * FROM database WHERE movie = '" + movie + "'",(err: Error, rows:any)=> {rows.forEach((row: any)=> {data.push(row);});if (data.length === 0)res.render("delete", { error: "Movie not found" });else {db.run("DELETE FROM database WHERE movie = '" + movie + "'",(err: Error) =>{if (err) res.render("delete", { error: err });else res.render("delete", { success: "Deleted" });});}});} catch (err) {console.log("Delete" +err);res.render("delete", { error: err });}});

app.get("/deleteAll", (req:any , res:any) => res.render("deleteAll"));
app.post("/deleteAll", async (req:any , res:any ) => {db.run("DELETE FROM database",  (err:any)=> {if (err) res.render("deleteAll", { error: err });else res.render("deleteAll", { success: "Deleted" });});});


const key = "aeba4c51843f8a4cdc04a74b1486d964";
app.get("/:id", async (req:any, res:any) => {let id = await req.params.id, data:any =[];id = decodeURIComponent(JSON.stringify(id));try {await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${id}`).then((response:any) => {if(response.data.results[0]){data = response.data.results[0];data.poster_path = `https://image.tmdb.org/t/p/original${data.poster_path}`;const id = data.id; console.log("Data" + data);res.render("movie", { data });res.end();}});} catch (err) {console.log("ID error" + err);res.render("movie", { error: err });res.end();}});
app.listen(3000, () => {console.log("Server started at port 3000") });
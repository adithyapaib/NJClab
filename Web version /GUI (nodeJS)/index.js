var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/* Dependencies */
var express = require('express');
var pasrser = require("body-parser");
var app = express();
var axios = require("axios")["default"];
var sqlite3 = require("sqlite3").verbose();
/* Middlewares */
app.use(express.json());
app.use(pasrser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
/* Create Database Con */
var db = new sqlite3.Database("./movie.db", function (err) { if (err)
    return console.log("Error when creating the database" + err); console.log("Database Connected!"); });
app.get("/", function (req, res) { return res.render("index"); });
app.get("/insert", function (req, res) { return res.render("insert"); });
app.get("/crud", function (req, res) { return res.render("crud"); });
app.get("/insertRandom", function (req, res) { return res.render("insertRandom"); });
/* Create */
app.get("/create", function (req, res) { return db.run("SELECT name FROM sqlite_master WHERE type='table' AND name='table_name';", function (err, row) { if (err) {
    res.render("create", { table: false });
}
else {
    res.render("create", { table: true });
} }); });
app.post("/create", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var check, drop, create;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.body.check];
            case 1:
                check = _a.sent();
                return [4 /*yield*/, req.body.drop];
            case 2:
                drop = _a.sent();
                return [4 /*yield*/, req.body.create];
            case 3:
                create = _a.sent();
                if (check)
                    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='database'", function (err, row) { if (err)
                        res.render("create", { check: err });
                    else if (row)
                        res.render("create", { check: "Table movie.db Exists", table: true });
                    else
                        res.render("create", { check: "Table does not exist" }); });
                else if (drop)
                    db.run("DROP TABLE database", function (err) { if (err) {
                        res.render("create", { drop: err["message"] });
                    }
                    else
                        res.render("create", { drop: "Table Dropped" }); });
                else if (create)
                    db.run("CREATE TABLE IF NOT EXISTS database(movie VARCHAR(50),actor VARCHAR(50), actress VARCHAR(50), director VARCHAR(50),year INT, rating INT, trailor VARCHAR(100) );", function (err) { if (err) {
                        res.render("create", { create: err["message"] });
                    }
                    else
                        res.render("create", { create: "Table Created" }); });
                return [2 /*return*/];
        }
    });
}); });
app.post("/insert", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var movie, actor, actress, director, year, rating, trailer, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.body.movie];
            case 1:
                movie = _a.sent();
                return [4 /*yield*/, req.body.actor];
            case 2:
                actor = _a.sent();
                return [4 /*yield*/, req.body.actress];
            case 3:
                actress = _a.sent();
                return [4 /*yield*/, req.body.director];
            case 4:
                director = _a.sent();
                return [4 /*yield*/, req.body.year];
            case 5:
                year = _a.sent();
                return [4 /*yield*/, req.body.rating];
            case 6:
                rating = _a.sent(), trailer = "https://www.youtube.com/results?search_query=" + movie.replace(" ", "+") + "+trailer";
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, db.run("INSERT INTO database VALUES('" + movie + "','" + actor + "','" + actress + "','" + director + "','" + year + "','" + rating + "', '" + trailer + "');")];
            case 8:
                _a.sent();
                console.log("Inserted");
                return [3 /*break*/, 10];
            case 9:
                err_1 = _a.sent();
                console.log("Post /insert Error" + err_1);
                res.render("insert", { error: err_1 });
                return [3 /*break*/, 10];
            case 10:
                res.render("insert", { success: "Inserted" });
                return [2 /*return*/];
        }
    });
}); });
var inserting = function (movie, actor, actress, director, year, rating, trailer) { return __awaiter(_this, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.run("INSERT INTO database VALUES('" + movie + "','" + actor + "','" + actress + "','" + director + "','" + year + "','" + rating + "', '" + trailer + "');")];
            case 1:
                _a.sent();
                console.log("Inserted");
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log("Post /insert Error" + err_2);
                return [2 /*return*/, err_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
app.get("/insertRand", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var movie, actor, actress, director, year, rating, i, trailer, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movie = ["Interstellar", "Uri", "The Avengers", "Doctor Strange", "Aquaman"];
                actor = ["Matthew McConaughey", "Vickey Koshal", "Chris Evans", "Benedict Cumberbatch", "Jason Momoa"];
                actress = ["Ellen Page", "Yamini Gautham", "Cobie Smulders", "Jessica Chastain", "Zoe Saldana"];
                director = ["Christopher Nolan", "Adithya Dhar", "Joss Whedon", "Scott Derrickson", "James Gunn"];
                year = [2014, 2017, 2012, 2016, 2014];
                rating = [9, 8, 7, 9, 8], i = 0;
                trailer = ["https://www.youtube.com/results?search_query=" + movie[0].replace(" ", "+") + "+trailer", "https://www.youtube.com/results?search_query=" + movie[1].replace(" ", "+") + "+trailer", "https://www.youtube.com/results?search_query=" + movie[2].replace(" ", "+") + "+trailer", "https://www.youtube.com/results?search_query=" + movie[3].replace(" ", "+") + "+trailer", "https://www.youtube.com/results?search_query=" + movie[4].replace(" ", "+") + "+trailer"];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 5)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, inserting(movie[i], actor[i], actress[i], director[i], year[i], rating[i], trailer[i])];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.log("Post /insert Error" + err_3);
                res.render("insertRandom", { error: err_3 });
                return [3 /*break*/, 5];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6:
                res.render("insertRandom", { success: "Inserted" });
                return [2 /*return*/];
        }
    });
}); });
app.get("/print", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var data, err_4; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            data = [];
            _a.label = 1;
        case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, db.all("SELECT * FROM database", function (err, rows) { rows.forEach(function (row) { data.push(row); }); res.render("print", { data: data }); })];
        case 2:
            _a.sent();
            return [3 /*break*/, 4];
        case 3:
            err_4 = _a.sent();
            console.log("Get Print error" + err_4);
            return [3 /*break*/, 4];
        case 4: return [2 /*return*/];
    }
}); }); });
app.get("/year", function (req, res) { return res.render("year"); });
app.post("/year", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var year, data, err_5; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.body.year];
        case 1:
            year = _a.sent(), data = [];
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, db.all("SELECT * FROM database WHERE year = '" + year + "'", function (err, rows) { rows.forEach(function (row) { data.push(row); }); console.log("Data is " + data); res.render("year", { data: data }); })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_5 = _a.sent();
            console.log("year" + err_5);
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.get("/actor", function (req, res) { return res.render("actor"); });
app.post("/actor", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var actor, data, err_6; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.body.actor];
        case 1:
            actor = _a.sent(), data = [];
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, db.all("SELECT * FROM database WHERE actor = '" + actor + "'", function (err, rows) { rows.forEach(function (row) { data.push(row); }); console.log(data); res.render("actor", { data: data }); })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_6 = _a.sent();
            console.log("Actor" + err_6);
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.get("/actress", function (req, res) { return res.render("actress"); });
app.post("/actress", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var actress, data, err_7; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.body.actress];
        case 1:
            actress = _a.sent(), data = [];
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, db.all("SELECT * FROM database WHERE actress = '" + actress + "'", function (err, rows) { rows.forEach(function (row) { data.push(row); }); console.log(data); res.render("actress", { data: data }); })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_7 = _a.sent();
            console.log("Actress" + err_7);
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.get("/rating", function (req, res) { return res.render("rating"); });
app.post("/rating", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var rating, data, err_8; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.body.rating];
        case 1:
            rating = _a.sent();
            data = [];
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, db.all("SELECT * FROM database WHERE rating = '" + rating + "'", function (err, rows) { rows.forEach(function (row) { data.push(row); }); console.log(data); res.render("rating", { data: data }); })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_8 = _a.sent();
            console.log("Rating " + err_8);
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.get("/director", function (req, res) { return res.render("director"); });
app.post("/director", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var director, data, err_9; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.body.director];
        case 1:
            director = _a.sent(), data = [];
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, db.all("SELECT * FROM database WHERE director = '" + director + "'", function (err, rows) { rows.forEach(function (row) { data.push(row); }); console.log(data); res.render("director", { data: data }); })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_9 = _a.sent();
            console.log(err_9);
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.get("/delete", function (req, res) { return res.render("delete"); });
app.post("/delete", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var movie, data, err_10; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.body.movie];
        case 1:
            movie = _a.sent(), data = [];
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, db.all("SELECT * FROM database WHERE movie = '" + movie + "'", function (err, rows) { rows.forEach(function (row) { data.push(row); }); if (data.length == 0)
                    res.render("delete", { error: "Movie not found" });
                else {
                    db.run("DELETE FROM database WHERE movie = '" + movie + "'", function (err) { if (err)
                        res.render("delete", { error: err });
                    else
                        res.render("delete", { success: "Deleted" }); });
                } })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_10 = _a.sent();
            console.log("Delete" + err_10);
            res.render("delete", { error: err_10 });
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.get("/deleteAll", function (req, res) { return res.render("deleteAll"); });
app.post("/deleteAll", function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    db.run("DELETE FROM database", function (err) { if (err)
        res.render("deleteAll", { error: err });
    else
        res.render("deleteAll", { success: "Deleted" }); });
    return [2 /*return*/];
}); }); });
var key = "aeba4c51843f8a4cdc04a74b1486d964";
app.get("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () { var id, data, err_11; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, req.params.id];
        case 1:
            id = _a.sent(), data = [];
            id = decodeURIComponent(JSON.stringify(id));
            _a.label = 2;
        case 2:
            _a.trys.push([2, 4, , 5]);
            return [4 /*yield*/, axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + id).then(function (response) { if (response["data"]["results"][0]) {
                    data = response["data"]["results"][0];
                    data["poster_path"] = "https://image.tmdb.org/t/p/original" + data["poster_path"];
                    var id_1 = data["id"];
                    console.log("Data" + data);
                    res.render("movie", { data: data });
                    res.end();
                } })];
        case 3:
            _a.sent();
            return [3 /*break*/, 5];
        case 4:
            err_11 = _a.sent();
            console.log("ID error" + err_11);
            res.render("movie", { error: err_11 });
            res.end();
            return [3 /*break*/, 5];
        case 5: return [2 /*return*/];
    }
}); }); });
app.listen(3000, function () { return console.log("Server started at port 3000"); });

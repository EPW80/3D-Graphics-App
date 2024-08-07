"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 3000;
// Serve static files from the 'public' directory in 'dist'
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/public")));
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../dist/public/index.html"));
});
app.get("/shape-data", function (req, res) {
    // Generate random shape data
    var shapesData = [];
    for (var i = 1; i <= 50; i++) {
        shapesData.push({
            id: i,
            type: ["box", "sphere", "cylinder"][Math.floor(Math.random() * 3)], // Randomly choose a shape type
            color: Math.floor(Math.random() * 16777215),
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            z: Math.random() * 100 - 50,
            rotationX: Math.random() * Math.PI * 2,
            rotationY: Math.random() * Math.PI * 2,
            rotationZ: Math.random() * Math.PI * 2,
            scaleX: Math.random() * 2 + 0.5,
            scaleY: Math.random() * 2 + 0.5,
            scaleZ: Math.random() * 2 + 0.5,
        });
    }
    res.json(shapesData);
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});

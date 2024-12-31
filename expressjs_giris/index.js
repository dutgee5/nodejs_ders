const express = require("express");
const aktorleRouter = require("./routers/aktorleRouter"); 
const logger = require("./middlewares/logger"); // logger middleware'ini import ettik.
const errorHandling = require("./middlewares/errorHandling"); // error handling middleware'ini import ettik.


const server = express(); //server oluşturuldu
server.use(express.json()); // request body'sini json formatında okumak için kullanılır.

server.use(logger); // logger middleware'ini tüm requestler için kullan.

server.use("/aktorler", aktorleRouter); // aktorleRouter'ı /aktorler rotası için kullan.

server.get("/", (req, res) => {
  res.send("Merhaba Dünya!"); // response body
});

server.use(errorHandling); // error handling middleware'ini tüm requestler için kullan. en sona yazılmalıdır.

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
}); // server dinlemeye başladı. 3000 portu üzerinden.S

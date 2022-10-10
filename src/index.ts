/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express"
import { selectAll, update, remove, recount } from "./utilities/db"
import { urlencoded } from "body-parser"
import dotenv from "dotenv"
import * as path from "path"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(urlencoded({ extended: false }))

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.post("/add", (req: Request, res: Response) => {
  if (!Number(req.body.AddProductNumber)) {
    void update(req.body.AddProductName.toLowerCase(), 1)
  } else {
    void update(req.body.AddProductName.toLowerCase(), Number(req.body.AddProductNumber))
  }
})

app.post("/recount", (req: Request, res: Response) => {
  void recount(req.body.RecountProductName.toLowerCase(), Number(req.body.RecountProductNumber))
})

app.post("/remove", (req: Request, res: Response) => {
  void remove(req.body.RemoveProductName.toLowerCase())
})

app.post("/delete", (req: Request, res: Response) => {
  if (!Number(req.body.DeleteProductNumber)) {
    void update(req.body.DeleteProductName.toLowerCase(), -1)
  } else {
    void update(req.body.DeleteProductName.toLowerCase(), -1 * Math.abs(Number(req.body.DeleteProductNumber)))
  }
})

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("<h1>Risorsa non trovata</h1>")
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at localhost:${port}`)
})
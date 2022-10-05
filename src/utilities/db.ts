export { selectAll, update, remove, recount }

import dotenv from "dotenv"
import { Pool } from "pg"
import { Prodotti } from "./index"

dotenv.config()

const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 1000
})

const selectAll = async function(): Promise<Prodotti> {
  const data = await pool.query("SELECT (name, count) FROM prodotti")
  return data.rows as Prodotti
}

const update = async function(productName: string, productNumber: number): Promise<Prodotti> {
  const check = await pool.query("SELECT count, id FROM prodotti WHERE name = $1", [productName])
  if (Number(check.rowCount)) {
    const newCount = check.rows[0].count + productNumber
    const res = await pool.query("UPDATE prodotti SET count = $1 WHERE id = $2", [newCount, check.rows[0].id])
    return res.rows as Prodotti
  } else {
    const res = await pool.query("INSERT INTO prodotti (name, count) VALUES ($1, $2) RETURNING id, name, count", [productName, productNumber])
    return res.rows as Prodotti
  }
}

const remove = async function(productName: string): Promise<Prodotti | string> {
  const check = await pool.query("SELECT count, id FROM prodotti WHERE name = $1", [productName])
  if (Number(check.rowCount)) {
    const data = await pool.query("DELETE FROM prodotti WHERE id = $1", [check.rows[0].id])
    return data.rows as Prodotti
  } else {
    return `${productName} non è presente`
  }
}

const recount = async function(productName: string, productNumber: number): Promise<Prodotti> {
  const check = await pool.query("SELECT count, id FROM prodotti WHERE name = $1", [productName])
  if (Number(check.rowCount)) {
    const res = await pool.query("UPDATE prodotti SET count = $1 WHERE id = $2", [productNumber, check.rows[0].id])
    return res.rows as Prodotti
  } else {
    const res = await pool.query("INSERT INTO prodotti (name, count) VALUES ($1, $2) RETURNING id, name, count", [productName, productNumber])
    return res.rows as Prodotti
  }
}
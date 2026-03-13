const express = require("express")
const Database = require("better-sqlite3")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// 連接 SQLite
const db = new Database("./database/app.db")

// API: 取得 contact 資料
app.get("/api/contact", (req, res) => {
  const rows = db.prepare("SELECT * FROM contact").all()
  res.json(rows)
})

app.get("/api/education", (req, res) => {
  const rows = db.prepare("SELECT * FROM education").all()
  res.json(rows)
})

app.get("/api/job", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM job").all()

    rows.forEach(r => {
      try {
        r.details = JSON.parse(r.details)
      } catch (e) {
        console.log("details parse failed:", r.details)
        r.details = []
      }
    })

    res.json(rows)
  } catch (err) {
    console.error("job api error:", err.message)
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/skills", (req, res) => {
  const rows = db.prepare("SELECT * FROM skills").all()
  res.json(rows)
})

app.listen(3000, () => {
  console.log("API running on http://localhost:3000")
})
const express = require("express")
const Database = require("better-sqlite3")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// 連接 SQLite
const db = new Database("./database/app.db")

/**
 * 聯絡資料
 */
app.get("/api/contact", (req, res) => {
  const rows = db.prepare("SELECT * FROM contact").all()
  res.json(rows)
})

/**
 * 工作經歷
 */
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

/**
 * 專業技能
 */
app.get("/api/skills", (req, res) => {
  const rows = db.prepare("SELECT * FROM skills").all()
  res.json(rows)
})

/**
 * 作品集
 */
app.get("/api/works", (req, res) => {
  const rows = db.prepare("SELECT * FROM works").all()
  res.json(rows)
})

//------------------------學歷------------------------
/**
 * 學歷
 */
app.get("/api/education", (req, res) => {
  const rows = db.prepare("SELECT * FROM education").all()
  res.json(rows)
})

/**
 * 修改學歷
 */
app.put("/api/education", (req, res) => {
  console.log("PUT /api/education hit")
  console.log("body =", req.body)

  try {
    const list = req.body

    if (!Array.isArray(list)) {
      return res.status(400).json({ error: "request body must be an array" })
    }

    const stmt = db.prepare(`
      UPDATE education
      SET startDate = ?, endDate = ?, school = ?, details = ?
      WHERE id = ?
    `)

    const updateMany = db.transaction((items) => {
      for (const item of items) {
        stmt.run(
          item.startDate,
          item.endDate,
          item.school,
          item.details,
          item.id
        )
      }
    })

    updateMany(list)

    res.json({ message: "batch update success" })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
});

/**
 * 新增學歷
 */
app.post("/api/education", (req, res) => {
  try {
    const { startDate, endDate, school, details } = req.body

    const stmt = db.prepare(`
      INSERT INTO education (startDate, endDate, school, details)
      VALUES (?, ?, ?, ?)
    `)

    const result = stmt.run(startDate, endDate, school, details)

    res.json({
      message: "create success",
      id: result.lastInsertRowid
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
});

/**
 * 刪除學歷
 */
app.delete("/api/education/:id", (req, res) => {
  try {
    const { id } = req.params

    const stmt = db.prepare(`
      DELETE FROM education
      WHERE id = ?
    `)

    const result = stmt.run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: "not found" })
    }

    res.json({ message: "delete success" })

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
});


//--------------------------------------------------------
app.listen(3000, () => {
  console.log("API running on http://localhost:3000")
})
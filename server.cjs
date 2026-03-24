/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

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
  try {
    const rows = db.prepare("SELECT * FROM contact").all()
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
})

/**
 * 作品集
 */
app.get("/api/works", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM works").all()
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
})

//------------------------學歷------------------------
app.get("/api/education", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM education").all()
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
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

//------------------------工作經歷------------------------
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
});

/**
 * 新增工作經歷
 */
app.post("/api/job", (req, res) => {
  try {
    const { startData, endData, company, job, details } = req.body

    if (!startData || !endData || !company || !job ||!details) {
      return res.status(400).json({
        error: "company, title, period 為必填"
      })
    }

    // details 格式處理
    let normalizedDetails = []

    if (Array.isArray(details)) {
      normalizedDetails = details
    } else if (typeof details === "string" && details.trim() !== "") {
      // 若前端只傳單一字串，也自動包成陣列
      normalizedDetails = [details.trim()]
    } else if (details == null) {
      normalizedDetails = []
    } else {
      return res.status(400).json({
        error: "details 必須是陣列或字串"
      })
    }

    const stmt = db.prepare(`
      INSERT INTO job (startData, endData, company, job, details)
      VALUES (?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      startData,
      endData,
      company,
      job,
      JSON.stringify(normalizedDetails)
    )

    res.json({
      success: true,
      id: result.lastInsertRowid
    })
  } catch (err) {
    console.error("job post error:", err.message)
    res.status(500).json({ error: err.message })
  }
});

/**
 * 修改工作經歷
 */
app.put("/api/job", (req, res) => {
  console.log("PUT /api/job hit")
  console.log("body =", req.body)

  try {
    const list = req.body

    if (!Array.isArray(list)) {
      return res.status(400).json({ error: "request body must be an array" })
    }

    const stmt = db.prepare(`
      UPDATE job
      SET startData = ?, endData = ?, company = ?, job = ?, details = ?
      WHERE id = ?
    `)

    const updateMany = db.transaction((items) => {
      for (const item of items) {
        let normalizedDetails = []

        if (Array.isArray(item.details)) {
          normalizedDetails = item.details
            .filter(d => typeof d === "string")
            .map(d => d.trim())
            .filter(d => d !== "")
        } else if (typeof item.details === "string" && item.details.trim() !== "") {
          normalizedDetails = [item.details.trim()]
        } else if (item.details == null) {
          normalizedDetails = []
        } else {
          throw new Error("details 必須是陣列或字串")
        }

        stmt.run(
          item.startData,
          item.endData,
          item.company,
          item.job,
          JSON.stringify(normalizedDetails),
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
 * 刪除工作經歷
 */
app.delete("/api/job/:id", (req, res) => {
  try {
    const { id } = req.params

    const stmt = db.prepare(`
      DELETE FROM job
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

//------------------------專業技能------------------------
app.get("/api/skills", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM skills").all()
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }

});

app.post("/api/skills", (req, res) => {
  try {
    const { skill } = req.body

    const stmt = db.prepare(`
      INSERT INTO skills (skill)
      VALUES (?)
    `)

    const result = stmt.run(skill)

    res.json({
      message: "create success",
      id: result.lastInsertRowid
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
});

//--------------------------------------------------------
app.listen(3000, () => {
  console.log("API running on http://localhost:3000")
})
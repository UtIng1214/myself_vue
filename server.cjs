/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const express = require("express")
const session = require("express-session");
const Database = require("better-sqlite3")
const cors = require("cors")

const app = express()

const allowlist = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(v => v.trim())
  .filter(Boolean);


app.use(express.json())

// app.use(cors())
// app.use(cors({
//   origin(origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowlist.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(new Error(`Not allowed by CORS: ${origin}`));
//   },
//   credentials: true
// }));
const allowedOrigins = [
  'https://kevinyaa.com',
  'http://localhost:8080'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
}));


app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,      // localhost 開發通常 false
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 小時
  },
}));

// 連接 SQLite
const db = new Database("./database/app.db")

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

//------------------------登出登入------------------------
app.get("/api/user", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM user").all()
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
});

app.get("/api/auth/me", (req, res) => {
  console.log("me session =", req.session);

  if (req.session && req.session.isAuthenticated) {
    return res.json({
      isAuthenticated: true,
      userId: req.session.userId,
    });
  }

  res.json({
    isAuthenticated: false,
  });
});

app.post("/api/user", (req, res) => {
  try {
    const { account, password } = req.body || {};

    if (!account || !password) {
      return res.status(400).json({ error: "account and password are required" });
    }

    const user = db.prepare("SELECT * FROM user WHERE account = ?").get(account);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "account or password incorrect" });
    }

    req.session.isAuthenticated = true;
    req.session.userId = user.id;

    console.log("login session =", req.session);

    res.json({ message: "login success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "logout failed" });
    }

    res.clearCookie("connect.sid");
    res.json({ message: "logout success" });
  });
});

//------------------------作品集------------------------
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

    if (!startData || !endData || !company || !job || !details) {
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

/**
 * 新增專業技能
 */
app.post("/api/skills", (req, res) => {
  try {
    const skills = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ error: "must be array" });
    }

    const stmt = db.prepare(`
      INSERT INTO skills (skill)
      VALUES (?)
    `);

    const insertMany = db.transaction((list) => {
      for (const item of list) {
        if (item.skill && item.skill.trim() !== "") {
          stmt.run(item.skill);
        }
      }
    });

    insertMany(skills);

    res.json({ message: "batch insert success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 修改專業技能
 */
app.put("/api/skills", (req, res) => {
  try {
    const skills = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ error: "must be array" });
    }

    const insertStmt = db.prepare(`
      INSERT INTO skills (skill)
      VALUES (?)
    `);

    const replaceAll = db.transaction((list) => {
      // 清空舊資料
      db.prepare("DELETE FROM skills").run();

      // 寫入新資料
      for (const item of list) {
        if (item.skill && item.skill.trim() !== "") {
          insertStmt.run(item.skill.trim());
        }
      }
    });

    replaceAll(skills);

    res.json({ message: "update success (replace all)" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

//------------------------聯絡資料------------------------
app.get("/api/contact", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM contact").all()
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
});

app.put("/api/contact", (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "invalid data" });
    }

    const { mail, phone, address } = data[0];

    const stmt = db.prepare(`
      UPDATE contact
      SET mail = ?, phone = ?, address = ?
    `);

    stmt.run(mail, phone, address);

    res.json({ message: "update success" });
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: err.message })
  }
})

//--------------------------------------------------------
app.listen(3000, () => {
  console.log("API running on http://localhost:3000")
})
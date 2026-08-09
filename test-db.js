require("dotenv").config();

const pool = require("./database");

async function testDatabase() {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
    await pool.end();
}

testDatabase();
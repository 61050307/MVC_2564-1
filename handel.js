const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "CPU",
  insecureAuth: true,
});



class CPU {
  insert_cpu(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let message = "";
        let use_cpu = req.use_cpu;
        let time = req.time;
        

        const checktime = new Promise(async(resolve,reject) => {
            if (time%5 !=0){
                let sum = time-1.0;
                if(sum > 0.5) 
                {
                    time = time%0.1 + 1
                    resolve (time)
                }
                else 
                {
                    time = time%0.1 - 0.5
                    resolve (time)
                }
                
            }
            
        })

       
        db.getConnection((err, conn) => {
          if (err) throw err;
          let sql = `INSERT INTO cpuuse (USE_CPU,Time) VALUES (?,?)`;
          let value = [use_cpu,checktime];
          conn.query(sql, value, (err, result) => {
            conn.release();
            if (err) {
              message = {
                message: "Error insertcpu()",
                error: err,
              };
              resolve(message);
            } else {
              message = {
                message: "Query insertcpu() success!",
                result,
              };
              resolve(message);
            }
          });
        });
      } catch (error) {
        let messageError = `Query insertcpu() failed! ${error}`;
        reject(messageError);
      }
    });
  }

  max(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let message = ""

            db.getConnection((err,conn) =>{
                if(err) throw err;
            let sql = `SELECT * FROM cpuuse ORDER BY Time DESC LIMIT 1`
            conn.query(sql,(err, result) => {
                conn.release()
                if (err) {
                    message = {
                        message: 'Error max()',
                        error: err
                    };
                    resolve(message);
                } else {
                    message = {
                        message: 'Query max() success!',
                        result
                    };
                    resolve(message);
                }
            })
        })
        } catch (error) {
            let messageError = `Query max() failed! ${error}`
            reject(messageError)
        }
    })
}
current(req) {
    return new Promise(async (resolve, reject) => {
        try {
            let message = ""

            db.getConnection((err,conn) =>{
                if(err) throw err;
            let sql = `SELECT * FROM cpuuse ORDER BY Time DESC LIMIT 15`
            conn.query(sql,(err, result) => {
                conn.release()
                if (err) {
                    message = {
                        message: 'Error max()',
                        error: err
                    };
                    resolve(message);
                } else {
                    message = {
                        message: 'Query max() success!',
                        result
                    };
                    resolve(message);
                }
            })
        })
        } catch (error) {
            let messageError = `Query max() failed! ${error}`
            reject(messageError)
        }
    })
}
}

module.exports = CPU;

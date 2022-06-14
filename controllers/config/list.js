const pool = require('../../helpers/mysql')

module.exports = (req, res) => {

    pool(`SELECT delay , delay_end FROM config WHERE id =?`, [1])
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })

}
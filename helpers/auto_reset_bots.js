const pool = require('./mysql')

module.exports = async () => {

    try {

        const getBots = await pool(`SELECT id , work_at FROM bots WHERE work =? ORDER BY work_at ASC LIMIT 1`, [1])

        //if (!getFacebook[0]) { console.log(`No working facebook.`) }

        if (getBots[0]) {

            const date = new Date()
            let getDay = date.getDate()
            getDay < 10 ? getDay = '0' + getDay : getDay
            let getMonth = date.getMonth()
            getMonth += +1
            getMonth < 10 ? getMonth = '0' + getMonth : getMonth
            const getYear = date.getFullYear()
            let getHour = date.getHours()
            getHour < 10 ? getHour = '0' + getHour : getHour
            let getMinute = date.getMinutes()
            getMinute < 10 ? getMinute = '0' + getMinute : getMinute

            const compareTime = String(getYear) + '/' + getMonth + '/' + getDay + ' ' + getHour + ':' + getMinute
            //console.log('moment time', compareTime)

            const work_time = new Date(getBots[0].work_at)
            let get_workDay = work_time.getDate()
            get_workDay < 10 ? get_workDay = '0' + get_workDay : get_workDay
            let get_workMonth = work_time.getMonth()
            get_workMonth += +1
            get_workMonth < 10 ? get_workMonth = '0' + get_workMonth : get_workMonth
            const get_workYear = work_time.getFullYear()
            let get_workHour = work_time.getHours()
            get_workHour < 10 ? get_workHour = '0' + get_workHour : get_workHour
            let get_workMinute = work_time.getMinutes() + 5
            get_workMinute < 10 ? get_workMinute = '0' + get_workMinute : get_workMinute

            const workDateTime = String(get_workYear) + '/' + get_workMonth + '/' + get_workDay + ' ' + get_workHour + ':' + get_workMinute
            //console.log('work time', workDateTime)

            if (workDateTime < compareTime) {

                await pool(`UPDATE bots SET work =? WHERE id =?`, [0, getBots[0].id])
                console.log(`Auto reset bots id ${getBots[0].id}`)

            }

        }

    } catch (err) {

        console.log(err)

    }

}
const express = require("express");
//.promises so we can retrieve the read/write methods as promise implementation
const fs = require("fs").promises;
const path = require("path");

const app = express();
const dataFile = path.join(__dirname, "data.json");

//support POSTing from data with encoded URL
app.use(express.urlencoded({extended:true}));

app.get('/poll', async (req, res) => {
    let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));
    const totalVotes = Object.values(data).reduce((total, n) => total += n, 0);

    //Object.entries gives a 2d array of the JSON data
    data = Object.entries(data).map(([guitarist, votes]) => {
        return{
            guitarist,
            votes,
            //or 0 to prevent our divide by 0 errors
            percentage: (((100 * votes) / totalVotes) || 0).toFixed(0) + '%'
        }
    })
    res.json(data);
})

app.listen(3000, () => console.log("Server is running..."));

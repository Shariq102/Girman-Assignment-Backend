const express = require('express');
const app = express();
var cors = require('cors')
const port = 3001;
const data = require('./data.json');

app.use(cors())

app.get('/users', (req, res) => {
    const {user} = req.query;
    let filteredUsers = {}
    let format = {
        data :data,
        message:'All Users Data'
    }
    if (user) {
      filteredUsers = data.filter(item => item.first_name.toLocaleLowerCase() === user || item?.last_name.toLocaleLowerCase() === user);
      if(filteredUsers.length > 0) {
        return res.status(200).json({
            data :filteredUsers,
            message:'Match Found'
        });
      }
      else {
        return res.status(200).json({
            data :[],
            message:'No Match Found'
        });
      }
    }
  
    return res.status(200).json(format);
  
  });
app.listen(process.env.port || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
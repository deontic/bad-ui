const express = require('express')
const app = express()

app.use(express.static('views'))

app.get('/', (req, res)=>{
	//{root:process.cwd()}
	res.sendFile(process.cwd()+'views/index.html')
})

app.listen(3000)

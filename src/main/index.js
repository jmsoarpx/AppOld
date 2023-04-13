const app = require('./config/app')
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server running on port ${port}!`))

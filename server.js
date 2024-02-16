const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const app = express();
let PORT = 3000;

app.engine('perscholas', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replaceAll('#title#', `${options.title}`)
      .replace('#content#', `${options.content}`);
    return callback(null, rendered);
  });
});

app.set('views', './views');
app.set('view engine', 'perscholas');

//Middleware
app.use(logger('dev'));
app.use(express.static('./styles'));

//Routes
app.get('/', (req, res)=>{
    const options = {
        title: `Dylans Website`,
        content: `Information about Dylan`
    }

    res.render(`index`, options)
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

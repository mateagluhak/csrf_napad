
const express = require('express')
const h = express()

h.use(express.static(__dirname + '/public'));
h.use(express.urlencoded({extended: true}))

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3001;



h.get("/", (req, res) => {
  if(externalUrl){
    res.sendfile(__dirname + '/public/hacker_render.html');
  }else{
    res.sendfile(__dirname + '/public/hacker.html');
  }
  
})

h.get("/safe", (req, res) => {
  if(externalUrl){
    res.sendfile(__dirname + '/public/hacker_render_safe.html');
  }else{
    res.sendfile(__dirname + '/public/hacker_safe.html');
  }
  
})

if (externalUrl) {
  const hostname = '127.0.0.1';
  h.listen(port, hostname, () => {
  console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
  }else {
    h.listen(3001, () => {
      console.log('Server listening on : 3001')
    })
    }

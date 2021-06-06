const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

// needed for POST or PUT requests
// not needed if third party libraries like axios is used in the client side
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

// make uploads/images folder public when /uploads/images route is hit
app.use('/uploads/images', express.static('uploads/images'));

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/images/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(new Error('Only accepts jpg and png files!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

app.post('/upload', upload.single('upload-image'), (req, res, next) => {
  if(!req.file){
    res.json({ error: 'Could not upload the file!'});
  }
  res.json({ url: req.file.path });
});

// send index.html on any route
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;

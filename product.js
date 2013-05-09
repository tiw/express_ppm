var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ppm');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

  var categorySchema = mongoose.Schema({
    name: String,
    subcategory: [
      {name: String}
    ]
  });

  var Category = mongoose.model('Category', categorySchema);

  var category = Category(
      {
        name: 'Watch',
        subcategory: [
          {name: 'G-Shock'},
          {name: 'Sheen'}
        ]
      }
  );



  var saveCb = function(err, silence) {
    console.log('finish saving ' + silence.name);
    if (err) {
      console.log('ops, can not save silence');
    }
  };

  category.save(saveCb);
  mongoose.connection.close();
});

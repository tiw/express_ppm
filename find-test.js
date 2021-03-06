var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

    var kittySchema = mongoose.Schema({
        name: String,
        age: Number
    });

    kittySchema.methods.speak = function() {
        var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
console.log(greeting);
    };

    var Kitten = mongoose.model('Kitten', kittySchema);
    var callback = function(err, kittens) {
        if (err) {
            console.log('ops! error');
        }
        console.log(kittens);
    };
    Kitten.find({ name: /^no|^si/ }, callback);

});

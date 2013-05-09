var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

    var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

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

    var silence = Kitten({name: 'silence'});

    var noName = Kitten({name: 'noname', age: 23});

    var saveCb = function(err, silence) {
        console.log('finish saving ' + silence.name);
        if (err) {
            console.log('ops, can not save silence');
        }
    }
    silence.save(saveCb);
    noName.save(saveCb);

    silence.speak();
    noName.speak();

});

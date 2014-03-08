module.exports.Search = Search;
var fs = require("fs");

function Search() {}

Search.prototype.scan = function (dir, depth, done) {
  depth--;
  var results = [];
  var self = this;
  fs.readdir(dir, function (err, list) {
    if (err) {
      return done(err);
    }

    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) {
        return done(null, results);
      }
      file = dir + "/" + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          if (depth !== 0) {
            var ndepth = (depth > 1) ? depth - 1 : 1;
            self.scan(file, ndepth, function (err, res) {
              results = results.concat(res);
              next();
            })
          } else {
            next();
          }
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

Search.prototype.match = function(query, files) {
	var matchs = [];
	files.forEach(function(name) {
		if(name.indexOf(query) !== -1) {
			matchs.push(name);
		}
	});

	return matchs;
}

module.exports.Tags = Tags;

function Tags() { }

Tags.prototype.parse = function (args, defaults, replacements) {
  var options = {};

  if (defaults) {
    options = defaults;
  }

  if (replacements) {
    for (var i in args) {
      var arg = args[i]
      if (arg.substr(0, 1) === "-") {
        arg = arg.substr(1);
        if (arg.indexOf("=") !== -1) {
          arg = arg.split("=");
          var keys = arg.shift();
          var value = arg[0];

          arg = keys.split("");
          var key = arg.pop();

          if (replacements.hasOwnProperty(key)) {
            key = replacements[key];
          }

          args.push("--" + key + "=" + value);
        } else {
          arg = arg.split("");
        }

        arg.forEach(function (key) {
          if (replacements.hasOwnProperty(key)) {
            key = replacements[key];
          };

          args.push("--" + key);
        })
      }
    }
  }

  for (var i in args) {
    var arg = args[i]
    if (arg.substr(0, 2) === "--") {
      arg = arg.substr(2);
      if (arg.indexOf("=") !== -1) {
        arg = arg.split("=");
        var key = arg.shift();
        var value = arg[0];

        if (/^[0-9]+$/.test(value)) {
          value = parseInt(value);
        }
        options[key] = value;
      } else {
        options[arg] = true;
      }
    }
  }

  return options;
}

var expect = require("chai").expect;
var Tags = require("../lib/tags.js");

describe("Tags", function () {
  var tags;
  beforeEach(function () {
    tags = new Tags();
  });

  describe("#parse()", function () {
    it("should parse long formed tags and onvert numbers", function () {
      var args = ["--depth=4", "--hello=world"];
      var results = tags.parse(args);

      expect(results).to.have.a.property("depth", 4);
      expect(results).property("hello", "world");
    });

    it("should fallback to defaults", function () {
      var args = ["--depth=4", "--hello=world"];
      var defaults = {
        depth: 2,
        foo: "bar"
      };
      var results = tags.parse(args, defaults);

      var expected = {
        depth: 4,
        foo: "bar",
        hello: "world"
      };

      expect(results).to.deep.equal(expected);
    });

    it("should accept tags without values as a boolean", function () {
      var args = ["--searchContents"];
      var results = tags.parse(args);

      expect(results).to.have.a.property("searchContents", true);
    });

    it("should accept shourt formed tags", function () {
      var args = ["-sd=4", "-h"];
      var replacements = {
        s: "searchContents",
        d: "depth",
        h: "hello"
      };

      var results = tags.parse(args, {}, replacements);

      var expected = {
        searchContents: true,
        depth: 4,
        hello: true
      };

      expect(results).to.deep.equal(expected);
    });
  })
});

var Qlobber = require("qlobber").Qlobber;
var util = require("util");

function Matcher() {
  Qlobber.call(this, { separator: "/", wildcard_one: "+" });
  this._topics = {};
}

util.inherits(Matcher, Qlobber);

Matcher.prototype.add = function (topic, clientId)
{
  if (!this._topics[clientId]) {
    this._topics[clientId] = [];
  }
  this._topics[clientId].push(topic);

  return Qlobber.prototype.add.call(this, topic, clientId);
};

Matcher.prototype.cleanClient = function (clientId)
{
  var that = this;
  if (this._topics[clientId]) {
    this._topics[clientId].forEach(function(topic) {
      that.remove(topic, clientId);
    });
    this._topics[clientId] = [];
  }
  return this;
};

module.exports = Matcher;

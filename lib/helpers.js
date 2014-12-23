
safeGetProp = function(obj, prop) {
  return obj && obj[prop];
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toSentence = function() {
  return this.replace(/^[a-z]|[A-Z]/g, function(v, i) {
    return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
  });
};

String.prototype.toProperName = function() {
  return this.replace(/^[a-z]|[A-Z]/g, function(v, i) {
    return i === 0 ? v.toUpperCase() : " " + v.toUpperCase();
  });
};

if(Meteor.isClient) {
  currentRouteName = function(route) {
    var current = Router.current().route.getName();
    if(!route) return current;
    else return route === current;
  }
}
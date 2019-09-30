export const server = {
  baseURL: "http://localhost:3000"
};

if (typeof String.prototype.insert !== "function") {
  String.prototype.insert = function(index, string) {
    if (index > 0)
      return (
        this.substring(0, index) + string + this.substring(index, this.length)
      );

    return string + this;
  };
}

if (typeof String.prototype.endsWith !== "function") {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

if (typeof String.prototype.startsWith !== "function") {
  String.prototype.startsWith = function(suffix) {
    return this.lastIndexOf(suffix, 0) === 0;
  };
}

export const server = {
  baseURL: "http://localhost:3000"
};

String.prototype.insert = function(index, string) {
  if (index > 0)
    return (
      this.substring(0, index) + string + this.substring(index, this.length)
    );

  return string + this;
};

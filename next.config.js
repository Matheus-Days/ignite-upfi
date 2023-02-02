module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/imgbb",
        destination: "https://api.imgbb.com/1/upload",
      },
    ];
  };
  return {
    rewrites,
  };
};
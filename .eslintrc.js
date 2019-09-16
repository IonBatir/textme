module.exports = {
  root: true,
  extends: ["airbnb", "plugin:prettier/recommended"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ]
  }
};

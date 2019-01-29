const assert = require("assert");
const { serveFile, login, signUp } = require("../src/requestsHandlers");

const files = {
  "./public/numbers": "0\n1\n2\n3\n4",
  "./public/alphabet": "abcd"
};

// -----------------------------------------serveFile-------------------------------------------

describe("serveFile", function() {
  const req = {};
  it("should serve the file content, status code as 200", function() {
    const res = {
      content: undefined,
      statusCode: undefined,
      write: function(x) {
        this.content = x;
      },
      end: function() {
        assert.equal(this.content, "0\n1\n2\n3\n4");
        assert.equal(this.statusCode, 200);
      }
    };

    req.url = "/numbers";
    serveFile(files, req, res);
  });

  it("should give status code as 404 and content as not found", function() {
    const res = {
      content: undefined,
      statusCode: undefined,
      write: function(x) {
        this.content = x;
      },
      end: function() {
        assert.equal(this.content, "404 Not found");
        assert.equal(this.statusCode, 404);
      }
    };

    req.url = "/abc";
    serveFile(files, req, res);
  });
});

// -----------------------------------------login-------------------------------------------

const res = {
  Location: undefined,
  writeHead: function(code, obj) {
    this.Location = obj.Location;
  }
};

const req = {
  body: undefined
};

describe("login", () => {
  const users = {
    "swagata@gmail.com": {
      name: "swagata",
      email: "swagata@gmail.com",
      password: "swagata",
      todoList: {}
    }
  };

  it("should redirect to signup.html if the given email is not registered", () => {
    res.end = function() {
      assert.equal(this.Location, "/signup.html");
    };

    req.body = "email=tushar&password=abc";

    login(users, req, res);
  });

  it("should redirect to login.html if the given password wrong", () => {
    res.end = function() {
      assert.equal(this.Location, "/login.html");
    };

    req.body = "email=swagata@gmail.com&password=abc";

    login(users, req, res);
  });

  it("should redirect to home page if login details are correct", () => {
    res.end = function() {
      assert.equal(this.Location, "/");
    };

    res.setHeader = function(key, val) {};

    req.body = "email=swagata@gmail.com&password=swagata";

    login(users, req, res);
  });
});

// -----------------------------------------signup-------------------------------------------

describe("signup", () => {
  it("should redirect to login.html", () => {
    req.body = "name=rahul&email=rahul@gmail.com&password=rahul";

    const expectedUser = {
      "rahul@gmail.com": {
        name: "rahul",
        email: "rahul@gmail.com",
        password: "rahul",
        todoList: {}
      }
    };

    const users = {};

    const fs = {
      writeFile: function(path, users, encoding, callback) {
        assert.deepEqual(users, JSON.stringify(expectedUser));
      }
    };

    res.end = function() {
      assert.equal(this.Location, "/login.html");
    };

    signUp(fs, users, req, res);
  });
});

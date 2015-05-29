import q from 'q'
import XMLHttpRequest from 'xhr2'

let baseUrl = "http://localhost:8080/api";

function fetchUrl(url, data, method) {
  return function() {
    var deferred = q.defer();

    let req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 200) {
          // if succeeded
          deferred.resolve(JSON.parse(req.responseText));
        } else {
          // if error
          deferred.reject(req.status, req.responseText);
        }
      }
    };

    // Launch request
    if(data === null) {
      req.send(null);
    } else {
      req.send(JSON.stringify(data));
    }

    return deferred.promise;
  }
};

function getUrl(url) { return fetchUrl(baseUrl+url, null, "GET")};

function postUrl(url, data) { return fetchUrl(baseUrl+url, data, "POST"); };

function putUrl(url, data) { return fetchUrl(baseUrl+url, data, "PUT"); };

function deleteUrl(url) { return fetchUrl(baseUrl+url, null, "DELETE") };

let FetchData = {
  auth: {
    currentUser: getUrl("/me"),
    login: function(user) { return postUrl("/login", user); },
    logout: postUrl("/logout"),
    register: function(user) { return postUrl("/register", user); }
  },
  users: {
    getUsers: getUrl("/users")
  }
};

export default FetchData;

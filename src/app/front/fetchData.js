import q from 'q'
import XMLHttpRequest from 'xhr2'

let baseUrl = "http://localhost:8080/api";

let _token;

function fetchUrl(url, method) {
  return function(data) {
    var deferred = q.defer();

    let req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    if(typeof _token !== "undefined" && _token !== "null") {
      req.setRequestHeader("Authorization", "Bearer "+_token);
    }
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 200) {
          // if succeeded
          deferred.resolve(JSON.parse(req.responseText));
        } else {
          // if error
          deferred.reject(JSON.parse(req.responseText));
        }
      }
    };

    setTimeout(function() {
      req.abort();
      deferred.reject();
    }, 5000);

    // Launch request
    if(data === null || typeof data === "undefined") {
      req.send(null);
    } else {
      req.send(JSON.stringify(data));
    }

    return deferred.promise;
  }
};

function getUrl(url) { return fetchUrl(baseUrl+url, "GET")};

function postUrl(url) { return fetchUrl(baseUrl+url, "POST"); };

function putUrl(url) { return fetchUrl(baseUrl+url, "PUT"); };

function deleteUrl(url) { return fetchUrl(baseUrl+url, "DELETE"); };

export function setToken(token) {
  _token = token;
}

let FetchData = {
  auth: {
    currentUser: getUrl("/me"),
    login: postUrl("/login"),
    logout: postUrl("/logout"),
    register: postUrl("/register")
  },
  users: {
    getUsers: getUrl("/users")
  }
};

export default FetchData;

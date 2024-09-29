#include <iostream>
#include "../lib/httplib.h"
#include "../lib/json.h"

#define JSON_RESPONSE(json) res.set_content(json.dump(), "application/json")

using json = nlohmann::json;

int counter = 0;

int main() {  
  httplib::Server app;

  app.Post("/*", [](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Headers", "*");
  });

  app.Get("/ping", [](const httplib::Request &req, httplib::Response &res){ json r;
    std::cout << "pong";   
  });

  std::cout << "server start";
  app.listen("0.0.0.0", 8080);
  return 0;
}

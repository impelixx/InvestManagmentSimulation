#include <iostream>
#include "httplib.h"
#include <json.h>

#define JSON_RESPONSE(json) res.set_content(json.dump(), "application/json")


int main() {
  httplib::Server srv;

  srv.set_post_routing_handler([](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Headers", "*");
  });

  srv.Get("/ping", [](const httplib::Request& req, httplib::Response& res) {
    json response = {
      {"ok", true}
    };

    JSON_RESPONSE(response);
  });

  app.Post("/increment", [](const auto& req, auto& res) {
    json response = {
      {"ok", true},
      {"counter", ++counter}
    };

    JSON_RESPONSE(response);
  });

  app.Get("/GetWallet", [](const auto& req, auto& res) {
    std::cout << "GetWallet" << std::endl;
    json response = {
      {"ok", true},
      {"wallet", "0x1234567890"}
    };
    JSON_RESPONSE(response);
  });

  std::cout << "Server started at http://localhost:8080" << std::endl;

  app.listen("localhost", 8080);

  return 0;
}


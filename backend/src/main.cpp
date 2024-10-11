#include <iostream>
#include "httplib.h"
#include <json.h>

#define JSON_RESPONSE(json) res.set_content(json.dump(), "application/json")

using json = nlohmann::json;

int counter = 0;

int main() {
  httplib::Server app;

  app.set_post_routing_handler([](const auto& req, auto& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Headers", "*");
  });

  app.Get("/ping", [](const auto& req, auto& res) {
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
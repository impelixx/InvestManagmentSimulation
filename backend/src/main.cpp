#include "../include/includes.h"
#include "../headers/wallet.h"


#define JSON_RESPONSE(json) res.set_content(json.dump(), "application/json")

int counter = 0;
Wallet* wallet = new Wallet;

int main() {
  httplib::Server app;

  app.set_post_routing_handler([](const auto& req, auto& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Headers", "*");
  });

  app.Get("/back/prices", [](const auto& req, auto& res) {
    std::cout << "Request #" << std::endl;
    json response;
    response.push_back(wallet->doCycle());
    JSON_RESPONSE(response);
  });

  app.Get("/api/price", [](const auto& req, auto& res) {
    json response;
    response["price"] = "penis";
    JSON_RESPONSE(response);
  });
  std::cout << "start" << std::endl;
  app.listen("localhost", 8080);
  return 0;
}




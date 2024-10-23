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

  app.Get("/api", [](const auto& req, auto& res) {
    json response;
    response.push_back(wallet->doCycle());
    JSON_RESPONSE(response);
  });

  app.listen("0.0.0.0", 8080);

  return 0;
}

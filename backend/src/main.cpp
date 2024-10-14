#include "../include/includes.h"
#include "../lib/httplib.h"
#include "../lib/json.h"
#include "../headers/active.h"
#include "../include/includes.h"

#define JSON_RESPONSE(json) res.set_content(json.dump(), "application/json")

using json = nlohmann::json;

int counter = 0;
int main() {
  httplib::Server app;
  app.set_post_routing_handler([](const auto& req, auto& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Headers", "*");
  });

  app.Post("/api", [](const auto& req, auto& res) {
    json response;
    response["counter"] = counter++;
    JSON_RESPONSE(response);
  });
  app.listen("0.0.0.0", 8080);

  return 0;
}

#include <iostream>
//? #include "../lib/httplib.h"
//? #include "../lib/json.h"
#include "../headers/active.h"
#include "../include/includes.h"

#define JSON_RESPONSE(json) res.set_content(json.dump(), "application/json")

// * using json = nlohmann::json;

int counter = 0;
int main() {
    Active act;
    act.setName("Apple");
    act.setPrice(2000);
    act.setAmount(100);
    act.setRisk(0.1);

    while (true) {
        std::cout << act.getPrice() << std::endl;
        act.changePrice();
		std::this_thread::sleep_for(std::chrono::seconds(1));
    }

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

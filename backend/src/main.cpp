#include <iostream>
#include "../lib/json.h"
#include "../lib/httplib.h"

using json = nlohmann::json;

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

  // kKostya tesk

  std::cout << "Server started" << std::endl;
  srv.listen("localhost", 8080);

  return 0;
}


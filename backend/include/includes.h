#ifndef INCLUDES_H
#define INCLUDES_H


#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <random>
#include <thread>

#include "../lib/httplib.h"
#include "../lib/json.h"

static inline std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
using json = nlohmann::json;

#endif // INCLUDES_H

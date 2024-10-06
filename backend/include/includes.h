#ifndef INCLUDES_H
#define INCLUDES_H


#include <string>
#include <vector>
#include <iostream>
#include <chrono>
#include <random>
#include <thread>

#include "../lib/httplib.h"
#include "../lib/json.h"

inline std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
using json = nlohmann::json;

#endif // INCLUDES_H

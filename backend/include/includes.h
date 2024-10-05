#ifndef INCLUDES_H
#define INCLUDES_H


#include <string>
#include <vector>
#include <iostream>

inline std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());

#endif // INCLUDES_H

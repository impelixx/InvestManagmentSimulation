#include "../headers/active.h"


// constructor / destructor
Active::Active(std::string& name, std::vector<int>& income, double amount, double price) {
  if (name.empty()) { // will better to rewrite this to try/catch
    throw std::length_error("No any name!");
    return;
  }
  if (income.empty()) {
    throw std::length_error("Income graph is empty!");
    return;
  }

  name_ = name;
  amount_ = amount;
  price_ = price;
  income_.reserve(income.capacity());
  for (auto el : income) {
    income_.push_back(el);
  }
}

Active::~Active() {
  name_ = "";
  amount_ = 0.0;
  price_ = 0.0;
  
  income_.clear();
}


// sets
void Active::setIncomeGraph(std::vector<int>& income) {
  if (income.empty()) {
    throw std::length_error("Income graph is empty!");
    return;
  }

  income_.reserve(income.capacity());
  for (auto el : income) {
    income_.push_back(el);
  }
}

void Active::setName(std::string& name) { 
  if (name.empty()) {
    throw std::length_error("No any name!");
    return;
  }

  name_ = name;
}

void Active::setAmount(double amount) {
  amount_ = amount;
}

void Active::setPrice(double price) {
  price_ = price;
}

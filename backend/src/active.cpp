#include "../headers/active.h"


// constructors
Active::Active(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk) {
  try {
    /*if (name.empty()) {
      throw std::length_error("No any name!");
    }
    if (income.empty()) {
      throw std::length_error("Income graph is empty!");
    }*/

    name_ = name;
    amount_ = amount;
    price_ = price;
    risk_ = risk;
    // income_.reserve(income.capacity());
    for (auto el : income) {
      income_.push_back(el);
    }
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
    throw;
  }
}

Active::Active(Active& rhs) {
  name_ = rhs.name_;
  amount_ = rhs.amount_;
  price_ = rhs.price_;
  risk_ = rhs.risk_;
  for (auto el : rhs.income_) {
    income_.push_back(el);
  }
}
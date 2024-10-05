#include "../headers/active.h"


// constructors / destructor
Active::Active(std::string& name, std::vector<int>& income, double amount, double price) {
  if (name.empty()) { // will better to rewrite this to try/catch
    throw std::length_error("Kill you");
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

Active::Active(Active& rhs) {
  name_ = rhs.name_;
  amount_ = rhs.amount_;
  price_ = rhs.price_;
  count_ = rhs.count_;
  risk_ = rhs.risk_;
  income_ = rhs.income_; // ??
}

Active::~Active() {
  name_ = "";
  amount_ = 0.0;
  price_ = 0.0;
  count_ = 0;
  risk_ = -1;
  income_.clear();
}


// setters
void Active::setIncomeGraph(std::vector<double>& income) {
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
    try {
        if (name.empty()) {
            throw std::length_error("No any name!");
            return;
        }
    }
    catch (...) {
        std::cout << "Empty active name\nPlease try again\n";
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

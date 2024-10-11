#include "../headers/active.h"


// constructors / destructor
Active::Active(std::string& name, std::vector<double>& income, double amount, double price, double risk) {
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
  risk_ = risk;
  for (auto el : income) {
    income_.push_back(el);
  }
}

Active::Active(Active& rhs) {
  name_ = rhs.name_;
  amount_ = rhs.amount_;
  price_ = rhs.price_;
  risk_ = rhs.risk_;
  setIncomeGraph(rhs.income_);
}

Active::~Active() {
  name_ = "";
  amount_ = 0.0;
  price_ = 0.0;
  risk_ = -1;
  income_.clear();
}


// setters
void Active::setIncomeGraph(std::vector<double>& income) {
  if (income.empty()) {
    throw std::length_error("Income graph is empty!");
    return;
  }

  for (auto el : income) {
    income_.push_back(el);
  }
}

void Active::setName(std::string name) { 
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

void Active::setRisk(double risk) {
  risk_ = risk;
}

void Active::changePrice() {
  double maxChange = price_ * risk_;
  std::uniform_int_distribution<> uid(1, int(maxChange * 100));
  double actualChange = uid(rng) / 100;
  if (!rng() % 2) {
    actualChange = -actualChange;
  }
  this->setPrice(price_ + actualChange);
  this->income_.push_back(actualChange * amount_);
}

json Active::returnCandleInfo() {
  json assetData;

  assetData["name"] = name_;
  assetData["value"] = price_;

  return assetData;
}

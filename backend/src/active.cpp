#include "../headers/active.h"


// constructors / destructor
Active::Active(std::string& name, std::vector<int>& income, double amount, double price, int count, int risk) {
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
  count_ = count;
  risk_ = risk;
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

void Active::setAmount(double price, int count) {
  amount_ = price * count;
}

void Active::setPrice(double price) {
  price_ = price;
}

void Active::setCount(int count) {
  count_ = count;
}

void Active::setRisk(int risk) {
  risk_ = risk;
}


int Active::generateRisk() {
  std::mt19937 gen(std::time(nullptr));
  std::uniform_int_distribution<> uid(1, 4); // 1 - no risk / 2 - low risk / 3 - middle risk / 4 - hight risk
  
  return uid(gen);
}

bool Active::plusMinus() {
  std::mt19937 gen(std::time(nullptr));
  std::uniform_int_distribution<> uid(-100, 100);

  int sign = uid(gen);

  return sign % 2 == 0;
}

void Active::changePrice(int risk) {
  std::mt19937 gen(std::time(nullptr));
  std::uniform_int_distribution<> uid(1, 5 * risk);

  int changingPriceInteger = uid(gen);
  int changePriceFractional = uid(gen);

  double changePrice = changingPriceInteger;
  changePrice += static_cast<double>(changePriceFractional) / 100;
  
  if (plusMinus()) {
    price_ += changePrice;
  } else {
    price_ -= changePrice;
  }

  setAmount(price_, count_);
}

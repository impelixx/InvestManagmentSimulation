#include "../headers/cryptocurrency.h"


// setters
void Cryptocurrency::setIncomeGraph(const std::vector<double>& income) {
  try {
    for (auto el : income) {
      income_.push_back(el);
    }
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
    std::cerr << "Income graph is empty!";
  }
}

void Cryptocurrency::setName(const std::string& name) {
  try {
    name_ = name;
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
    std::cerr << "No any name!";
  }
}

void Cryptocurrency::setAmount(double amount) {
  amount_ = amount;
}

void Cryptocurrency::setPrice(double price) {
  price_ = price;
}

void Cryptocurrency::setCount(int count) {
  count_ = count;
}

void Cryptocurrency::setRisk(double risk) {
  risk_ = risk;
}


void Cryptocurrency::changePrice() {
  double maxChange = price_ * risk_;
  std::uniform_int_distribution<> uid(1, int(maxChange * 100));
  double actualChange = uid(rng) / 100;
  if (!rng() % 2) {
    actualChange = -actualChange;
  }
  this->setPrice(price_ + actualChange);
  this->income_.push_back(actualChange * amount_);
}

json Cryptocurrency::returnActiveInfo() {
  json response;

  response["name"] = name_;
  response["price"] = price_;
  response["change"] = income_.back();

  return response;
}

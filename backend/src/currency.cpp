#include "../headers/currency.h"

Currency::Currency() {
  name_ = "Ruble";
  price_ = 0.0;
}

Currency::Currency(std::string& name, double price) {
  name_ = name;
  price_ = price;
}

Currency::Currency(Currency& rhs) {
  name_ = rhs.name_;
  price_ = rhs.price_;
}

void Currency::setName(std::string& name) {
  if (name.empty()) {
    throw std::length_error("No any name!");
    return;
  }
  
  name_ = name;
}

void Currency::setPrice(double price) {
  price_ = price;
}

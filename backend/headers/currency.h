#ifndef CURRENCY_H
#define CURRENCY_H


#include "../include/includes.h"
#include "active.h"


class Currency : public Active {
public:
  Currency();
  Currency(std::string& name, std::vector<int>& income, double price) : name_(name), income_(income), price_(price) {}
  Currency(Currency& rhs);
  ~Currency();
  
  // setters
  void setName(std::string& name);
  void setPrice(double price);

  // getters
  virtual std::string getName() override const { return name_; }
  virtual double getPrice() override const { return price_; }


private:
  std::string name_;
  std::vector<int> income_;
  double price_;
};


#endif // CURRENCY_H

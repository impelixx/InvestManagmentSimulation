#ifndef CURRENCY_H
#define CURRENCY_H


//#include "../include/includes.h"
#include "active.h"

class Currency : public Active {
public:
  Currency() { risk_ = 0.1; };
  Currency(const std::string& name, const std::vector<double>& income,
           double amount, double price, int count, double risk) :
           Active(name, income, amount, price, count, risk) {}
  Currency(Currency& rhs) = default;
  ~Currency() = default;
};


#endif // CURRENCY_H

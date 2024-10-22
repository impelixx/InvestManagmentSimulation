#ifndef WALLET_H
#define WALLET_H


#include "currency.h"
#include "precious_metal.h"
#include "cryptocurrency.h"
#include "oil.h"
#include "stock.h"
#include "bond.h"

#include "../include/includes.h"

// #include "active.h"


class Wallet {
public:
  Wallet() {
    Dollar = new Currency;
    Euro = new Currency;
    Yuan = new Currency;
    Dollar->setName("USD");
  } 
  ~Wallet() = default;
  json doCycle() {
  double open, close, max, min;
  open = Dollar->getPrice();
  json response;
  std::vector <double> tmp;
  for (int i = 0; i < 30; ++i) {
    tmp.push_back(Dollar->getPrice());
    Dollar->changePrice();
  }
  close = Dollar->getPrice();
  std::sort(tmp.begin(), tmp.end());
  min = tmp[0];
  max = tmp[29];
  response["Dollar"] = {open, close, max, min};
  return response;
}

private:
  Currency* Dollar;
  Currency* Euro;
  Currency* Yuan;
};


#endif // WALLET_H

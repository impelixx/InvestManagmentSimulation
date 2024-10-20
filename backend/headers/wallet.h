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
  Wallet();
  ~Wallet() = default;
  json doCycle();

private:
  Currency* Dollar;
  Currency* Euro;
  Currency* Yuan;
};


#endif // WALLET_H

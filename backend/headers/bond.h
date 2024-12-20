#ifndef BOND_H
#define BOND_H


//#include "../include/includes.h"
#include "active.h"


class Bond : public Active {
public:
  Bond() { risk_ = 0.2; };
  Bond(const std::string& name, const std::vector<double>& income,
       double amount, double price, int count, double risk) :
       Active(name, income, amount, price, count, risk) {}
  Bond(Bond& rhs) = default;
  ~Bond() = default;

  // setters
  // void setIncomeGraph(const std::vector<double>& income) override;
  // void setName(const std::string& name) override;
  // void setAmount(double amount) override;
  // void setPrice(double price) override;
  // void setCount(int count) override;
  // void setRisk(double risk) override;

  // getters
  /*[[nodiscard]] std::vector<double> getIncomeGraph() const { return income_; }
  [[nodiscard]] std::string getName() const { return name_; }
  [[nodiscard]] double getAmount() const { return amount_; }
  [[nodiscard]] double getPrice() const { return price_; }
  [[nodiscard]] int getCount() const { return count_; }
  [[nodiscard]] double getRisk() const { return risk_; }*/

  // void changePrice() override;
  // json returnActiveInfo() override;
};


#endif //BOND_H

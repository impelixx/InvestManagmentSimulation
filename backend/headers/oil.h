#ifndef OIL_H
#define OIL_H


//#include "../include/includes.h"
#include "active.h"


class Oil : public Active {
public:
  Oil() { risk_ = 0.1; };
  Oil(const std::string& name, const std::vector<double>& income,
      double amount, double price, int count, double risk) :
      Active(name, income, amount, price, count, risk) {}
  Oil(Oil& rhs) = default;
  ~Oil() = default;

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


#endif //OIL_H

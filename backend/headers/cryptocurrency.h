#ifndef CRYPTOCURRENCY_H
#define CRYPTOCURRENCY_H


//#include "includes.h"
#include "active.h"


class Cryptocurrency : public Active {
public:
  Cryptocurrency() = default;
  Cryptocurrency(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk);
  Cryptocurrency(Cryptocurrency& rhs);
  ~Cryptocurrency() = default;

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


#endif //CRYPTOCURRENCY_H

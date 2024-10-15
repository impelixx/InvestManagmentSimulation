#ifndef BACKEND_CRYPTOCURRENCY_H
#define BACKEND_CRYPTOCURRENCY_H


//#include "includes.h"
#include "active.h"


class Cryptocurrency : public Active {
public:
  Cryptocurrency() : name_("Cryptocurrency"), income_(std::vector<double>()), amount_(0.0), price_(0.0), count_(0), risk_(0.0) {}
  Cryptocurrency(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk);
  Cryptocurrency(Cryptocurrency& rhs);
  ~Cryptocurrency() override = default;

  // setters
  void setIncomeGraph(const std::vector<double>& income) override;
  void setName(const std::string& name) override;
  void setAmount(double amount) override;
  void setPrice(double price) override;
  void setCount(int count) override;
  void setRisk(double risk) override;

  // getters
  /*[[nodiscard]] std::vector<double> getIncomeGraph() const { return income_; }
  [[nodiscard]] std::string getName() const { return name_; }
  [[nodiscard]] double getAmount() const { return amount_; }
  [[nodiscard]] double getPrice() const { return price_; }
  [[nodiscard]] int getCount() const { return count_; }
  [[nodiscard]] double getRisk() const { return risk_; }*/

  void changePrice() override;
  json returnActiveInfo() override;


private:
  std::string name_;
  std::vector<double> income_;
  double amount_;
  double price_;
  int count_;
  double risk_;
};


#endif //BACKEND_CRYPTOCURRENCY_H
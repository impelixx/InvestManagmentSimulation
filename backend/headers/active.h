#ifndef ACTIVE_H
#define ACTIVE_H


#include "../include/includes.h"


class Active {
public:
	Active() : name_("Active"), amount_(0.0), price_(0.0), count_(0), risk_(0.0) {}
	Active(const std::string& name, const std::vector<double>& income, double amount, double price, int count, double risk);
	Active(Active& rhs);
	~Active() = default;

	// setters
  virtual void setIncomeGraph(const std::vector<double>& income);
  virtual void setName(const std::string& name);
  virtual void setAmount(double amount);
  virtual void setPrice(double price);
  virtual void setCount(int count);
  virtual void setRisk(double risk);

	// getters
	[[nodiscard]] std::vector<double> getIncomeGraph() const { return income_; }
	[[nodiscard]] std::string getName() const { return name_; }
	[[nodiscard]] double getAmount() const { return amount_; }
	[[nodiscard]] double getPrice() const { return price_; }
  [[nodiscard]] int getCount() const { return count_; }
	[[nodiscard]] double getRisk() const { return risk_; }
  
  virtual void changePrice();
  virtual json returnActiveInfo();
	
	
protected:
	std::string name_;
	std::vector<double> income_;
	double amount_;
	double price_;
  int count_;
	double risk_;
};


#endif // ACTIVE_H

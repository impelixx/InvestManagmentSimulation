#ifndef CURRENCY_H
#define CURRENCY_H


#include "../include/includes.h"
#include "active.h"


// better fix it
class Currency : public Active {
public:
  Currency() : name_(""), income_(std::vector<int>()), amount_(0.0), price_(0.0) {}
  Currency(std::string& name, std::vector<int>& income, double amount, double price);
  Currency(Currency& rhs);
  virtual ~Currency();
  
  // setters
  void setIncomeGraph(std::vector<int>& income);
	void setName(std::string& name);
	void setAmount(double amount);
	void setPrice(double price);

  // getters
  virtual std::vector<int> getIncomeGraph() const { return income_; }
	virtual std::string getName() const { return name_; }
	virtual double getAmount() const { return amount_; }
	virtual double getPrice() const { return price_; }


private:
  std::string name_;
	std::vector<int> income_;
	double amount_;
	double price_;
};


#endif // CURRENCY_H

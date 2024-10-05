#ifndef ACTIVE_H
#define ACTIVE_H


#include "../include/includes.h"


class Active {
public:
	Active() : name_(""), income_(std::vector<int>()), amount_(0.0), price_(0.0), risk_(1) {}
	Active(std::string& name, std::vector<int>& income, double amount, double price, int count, int risk);
	Active(Active& rhs);
	virtual ~Active();

	// setters
	void setIncomeGraph(std::vector<int>& income);
	void setName(std::string& name);
	void setAmount(double amount);
	void setAmount(double price, int count);
	void setPrice(double price);
	void setCount(int count);
	void setRisk(int risk);

	// getters
	virtual std::vector<int> getIncomeGraph() const { return income_; }
	virtual std::string getName() const { return name_; }
	virtual double getAmount() const { return amount_; }
	virtual double getPrice() const { return price_; }
	virtual int getCount() const { return count_; }
	virtual int getRisk() const { return risk_; }

	virtual int generateRisk();
	virtual bool plusMinus();
	virtual void changePrice(int risk);
	
	
private:
	std::string name_;
	std::vector<int> income_;
	double amount_;
	double price_;
	int count_;
	int risk_;
};


#endif // ACTIVE_H

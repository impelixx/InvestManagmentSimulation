#include "currency.h"

Class Yen : public Currency{
public:
	Yen() = default;
	~Yen() = default;
	void set_value(double value) { value_ = value; }
	double get_value() { return value_; }
	double get_risk() { return risk_; }
	void set_risk(double risk) { risk_ = risk; }
	void genNewPrice();
}
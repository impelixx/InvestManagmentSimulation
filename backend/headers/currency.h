#include "../include/includes.h"

const int defPriceForYen = 13;
const int defPriceForDollar = 96;
const int defPriceForEuro = 105;
const int defPriceForBelRuble =28;

Class Currency : public Active{
public:
	Currency() { name_ = "currency" };
	~Currency() = default;
protected:
	double risk_ = 0.0;
	double value_ = 0;
}
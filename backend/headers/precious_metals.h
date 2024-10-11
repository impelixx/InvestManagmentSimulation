#ifndef PRECIOUS_METALS_H
#define PRECIOUS_METALS_H


#include "../include/includes.h"
#include "active.h"


class PreciousMetals : public Active {
public:
	PreciousMetals() : name_(""), income_(std::vector<double>()), amount_(0.0), price_(0.0);
	~PreciousMetals() = default;
};



#endif // PRECIOUS_METALS_H

#ifndef BACKEND_CANDLE_H
#define BACKEND_CANDLE_H


#include "../include/includes.h"


struct CandleInfo { // base (unprepared structure)
  std::string name_;
  double min_;
  double max_;
  double open_;
  double close_;

  CandleInfo() : name_("Candle"), min_(0.0), max_(0.0), open_(0.0), close_(0.0) {}
  CandleInfo(const std::string& name, double min, double max, double open, double close);
  CandleInfo(const CandleInfo& rhs);
  ~CandleInfo() = default;

  // getters
  [[nodiscard]] std::string getName() const { return name_; }
  [[nodiscard]] double getMin() const { return min_; }
  [[nodiscard]] double getMax() const { return max_; }
  [[nodiscard]] double getOpen() const { return open_; }
  [[nodiscard]] double getClose() const { return close_; }
};

class Candle {
public:
  Candle() : name_("Candle"), risk_(0.0), candles_(std::vector<CandleInfo>()) {}
  Candle(const std::string& name, int risk, const std::vector<CandleInfo>& candles);
  Candle(const Candle& rhs);
  ~Candle() = default;

  // setters
  void setName(std::string& name);
  void setCandlesVector(std::vector<CandleInfo>& candles);
  void setRisk(int risk);

  // getters
  [[nodiscard]] std::string getName() const { return name_; }
  [[nodiscard]] int getRisk() const { return risk_; }
  [[nodiscard]] std::vector<CandleInfo> getCandles() const { return candles_; }

  json returnCandleInfo();


private:
  std::string name_;
  int risk_; // ?? using for what?
  std::vector<CandleInfo> candles_;
};


#endif //BACKEND_CANDLE_H

const MissionUtils = require("@woowacourse/mission-utils");
const {
  LOTTO_NUMBER,
  ERROR,
  RANK,
  WINNING_COUNT,
} = require("../utils/constants");

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    // 갯수
    if (numbers.length !== LOTTO_NUMBER.COUNT) {
      throw new Error(ERROR.COUNT);
    }

    // 중복 존재
    const set = new Set(numbers);
    if (set.size !== numbers.length) {
      throw new Error(ERROR.DUPLICATED);
    }

    // 범위
    numbers.forEach((num) => {
      if (num < LOTTO_NUMBER.MIN_RANGE || num > LOTTO_NUMBER.MAX_RANGE) {
        throw new Error(ERROR.RANGE);
      }
    });
  }

  printLotto() {
    MissionUtils.Console.print(`[${this.#numbers.join(", ")}]`);
  }

  getRank(winningNumbers, bonusNum) {
    const intersection = this.#numbers.filter((num) =>
      winningNumbers.includes(num)
    );

    if (intersection.length === WINNING_COUNT.SIX) return RANK.FIRST;

    if (intersection.length === WINNING_COUNT.FIVE) {
      if (Array.from(this.#numbers).includes(bonusNum)) return RANK.SECOND;
      return RANK.THIRD;
    }

    if (intersection.length === WINNING_COUNT.FOUR) return RANK.FOURTH;

    if (intersection.length === WINNING_COUNT.THREE) return RANK.FIFTH;

    return 0;
  }
}

module.exports = Lotto;

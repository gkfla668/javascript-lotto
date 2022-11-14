const MissionUtils = require("@woowacourse/mission-utils");
const Lotto = require("./model/Lotto");
const Lottos = require("./model/Lottos");
const checkLottoInput = require("./checkInput");
const { INPUT_MESSEGE, LOTTO_NUMBER, ERROR } = require("./utils/constants");

class App {
  constructor() {
    this.userLottos = null;
    this.winningNumbers = [];
    this.bonusNumber = 0;
  }

  play() {
    this.askPurchaseAmount();
  }

  askPurchaseAmount() {
    MissionUtils.Console.readLine(
      INPUT_MESSEGE.PURCHASE_AMOUNT,
      (purchaseAmount) => {
        this.userLottos = new Lottos(purchaseAmount);
        this.userLottos.printCount();
        this.userLottos.printLottos();

        this.askWinningLottoNumber();
      }
    );
  }

  askWinningLottoNumber() {
    MissionUtils.Console.readLine(
      INPUT_MESSEGE.WINNING_NUMBER,
      (winningNumber) => {
        const winningNumberArr = winningNumber
          .split(",")
          .map((num) => Number(num));
        checkLottoInput(winningNumberArr);

        this.winningNumbers = winningNumberArr;
        this.askBonusNumber();
      }
    );
  }

  askBonusNumber() {
    MissionUtils.Console.readLine(INPUT_MESSEGE.BONUS_NUMBER, (bonusNum) => {
      this.bonusNumber = Number(bonusNum);
      this.userLottos.printResult(this.winningNumbers, this.bonusNumber);
    });
  }
}

const app = new App();
app.play();

module.exports = App;

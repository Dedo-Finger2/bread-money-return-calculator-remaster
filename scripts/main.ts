import {
  btnCloseConfigModal,
  configModal,
  btnOpenConfigModal,
  formConfig,
  inputBredCostConfig,
  textBreadCostOutput,
  formMoneyToBread,
  inputUserMoney,
  inputUserWantingBreadCount,
  textUserBreadsCanBuy,
  textUserMoneyReturnOutput,
  textUserMoneyReturnWithSettingBreadsOutput,
} from "./elements.js";

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("breadCost")) {
    textBreadCostOutput.textContent = `Bread Cost: R$${localStorage.getItem(
      "breadCost"
    )}`;
  }
});

// Open and close config modal
if (configModal && btnOpenConfigModal && btnCloseConfigModal) {
  btnOpenConfigModal.addEventListener("click", () => {
    configModal.showModal();
  });

  btnCloseConfigModal.addEventListener("click", () => {
    configModal.close();
  });
}

// Config modal actions
if (formConfig && inputBredCostConfig && textBreadCostOutput) {
  formConfig.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const breadCostValue = inputBredCostConfig.value;

    if (localStorage.getItem("breadCost")) {
      localStorage.removeItem("breadCost");
    }

    if (!breadCostValue) {
      alert("Bread cost value must be higher than 0.");
      return;
    }

    if (breadCostValue) {
      localStorage.setItem("breadCost", breadCostValue);

      configModal.close();

      textBreadCostOutput.textContent = `Bread Cost: R$${breadCostValue}`;
    }
  });
}

// Money to bread form actions
if (
  formMoneyToBread &&
  inputUserMoney &&
  inputUserWantingBreadCount &&
  textUserBreadsCanBuy &&
  textUserMoneyReturnOutput &&
  textUserMoneyReturnWithSettingBreadsOutput
) {
  formMoneyToBread.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    if (
      !localStorage.getItem("breadCost") ||
      Number(localStorage.getItem("breadCost")) <= 0
    ) {
      alert("Set how much does 1 loaf cost first!");
      return;
    }

    const userMoney: number = Number(inputUserMoney.value);
    const manyBreadsUserWant: number = Number(inputUserWantingBreadCount.value);

    if (userMoney < Number(localStorage.getItem("breadCost"))) {
      alert("You can't buy loaves, too less money!");
      return;
    }

    function countManyBreadsCanByBought(userMoney: number): number {
      const breadCost: number = Number(localStorage.getItem("breadCost"));
      let breadCount: number = 0;

      while (userMoney >= breadCost) {
        breadCount++;
        userMoney -= breadCost;
      }

      return breadCount;
    }

    function countMoneyBack(userMoney: number): number {
      const breadCost = Number(localStorage.getItem("breadCost"));
      return Number((userMoney % breadCost).toFixed(2));
    }

    function countMoneyBackIfUserSayManyBreadsHeWant(
      userMoney: number,
      manyBreadsUserWant: number
    ): number {
      const breadCost: number = Number(localStorage.getItem("breadCost"));

      const howMuchItCost: number = manyBreadsUserWant * breadCost;

      console.log(userMoney);
      console.log(howMuchItCost);

      return Number((userMoney - howMuchItCost).toFixed(2));
    }

    textUserBreadsCanBuy.textContent = `You can buy: ${String(
      countManyBreadsCanByBought(userMoney)
    )} breads!`;

    textUserMoneyReturnOutput.textContent = `You'll get back: R$${String(
      countMoneyBack(userMoney)
    )}`;

    if (manyBreadsUserWant) {
      textUserMoneyReturnWithSettingBreadsOutput.textContent = `If you have R$${userMoney} and want to buy ${manyBreadsUserWant} breads, you'll get back: R$ ${countMoneyBackIfUserSayManyBreadsHeWant(
        userMoney,
        manyBreadsUserWant
      )}`;
    }
  });
}

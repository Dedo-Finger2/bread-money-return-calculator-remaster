import { btnCloseConfigModal, configModal, btnOpenConfigModal, formConfig, inputBredCostConfig, textBreadCostOutput, formMoneyToBread, inputUserMoney, inputUserWantingBreadCount, textUserBreadsCanBuy, textUserMoneyReturnOutput, textUserMoneyReturnWithSettingBreadsOutput, } from "./elements.js";
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("breadCost")) {
        textBreadCostOutput.textContent = "Bread Cost: R$".concat(localStorage.getItem("breadCost"));
    }
});
// Open and close config modal
if (configModal && btnOpenConfigModal && btnCloseConfigModal) {
    btnOpenConfigModal.addEventListener("click", function () {
        configModal.showModal();
    });
    btnCloseConfigModal.addEventListener("click", function () {
        configModal.close();
    });
}
// Config modal actions
if (formConfig && inputBredCostConfig && textBreadCostOutput) {
    formConfig.addEventListener("submit", function (event) {
        event.preventDefault();
        var breadCostValue = inputBredCostConfig.value;
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
            textBreadCostOutput.textContent = "Bread Cost: R$".concat(breadCostValue);
        }
    });
}
// Money to bread form actions
if (formMoneyToBread &&
    inputUserMoney &&
    inputUserWantingBreadCount &&
    textUserBreadsCanBuy &&
    textUserMoneyReturnOutput &&
    textUserMoneyReturnWithSettingBreadsOutput) {
    formMoneyToBread.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(localStorage.getItem("breadCost"));
        if (!localStorage.getItem("breadCost") ||
            Number(localStorage.getItem("breadCost")) <= 0) {
            alert("Set how much does 1 loaf cost first!");
            return;
        }
        var userMoney = Number(inputUserMoney.value);
        var manyBreadsUserWant = Number(inputUserWantingBreadCount.value);
        if (userMoney < Number(localStorage.getItem("breadCost"))) {
            alert("You can't buy loaves, too less money!");
            return;
        }
        function countManyBreadsCanByBought(userMoney) {
            var breadCost = Number(localStorage.getItem("breadCost"));
            var breadCount = 0;
            while (userMoney >= breadCost) {
                breadCount++;
                userMoney -= breadCost;
            }
            return breadCount;
        }
        function countMoneyBack(userMoney) {
            var breadCost = Number(localStorage.getItem("breadCost"));
            return Number((userMoney % breadCost).toFixed(2));
        }
        function countMoneyBackIfUserSayManyBreadsHeWant(userMoney, manyBreadsUserWant) {
            var breadCost = Number(localStorage.getItem("breadCost"));
            var howMuchItCost = manyBreadsUserWant * breadCost;
            console.log(userMoney);
            console.log(howMuchItCost);
            return Number((userMoney - howMuchItCost).toFixed(2));
        }
        textUserBreadsCanBuy.textContent = "You can buy: ".concat(String(countManyBreadsCanByBought(userMoney)), " breads!");
        textUserMoneyReturnOutput.textContent = "You'll get back: R$".concat(String(countMoneyBack(userMoney)));
        if (manyBreadsUserWant) {
            textUserMoneyReturnWithSettingBreadsOutput.textContent = "If you have R$".concat(userMoney, " and want to buy ").concat(manyBreadsUserWant, " breads, you'll get back: R$ ").concat(countMoneyBackIfUserSayManyBreadsHeWant(userMoney, manyBreadsUserWant));
        }
    });
}

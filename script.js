const startingBid = document.getElementById("startingbid");
const skills = document.getElementsByClassName("skills");
const age = document.getElementsByName("age");
const education = document.getElementById("education");
const networth = document.getElementById("networth");
const caste = document.getElementById("caste");
const reputation = document.getElementsByClassName("reputation");
const resultDiv = document.getElementById("result");
const calculate = () => {
    let name = document.getElementById("name").value.trim();
    let price = Number(startingBid.value);
    let loveLetter = document.getElementById("loveLetter").value.trim();

    if (!name || isNaN(price) || price <= 0) {
        alert('Dont forget to Enter the Name/Bid');
        return;
    }

    price = applySelectCoefficient(education, price);
    price = applySelectCoefficient(networth, price);
    price = applySelectBonus(caste, price);
    price = getCheckboxValuesFilterReduce(skills, price);

    price = getCheckboxValuesForLoop(reputation, price);

    price = getRadioValue(age, price);

    let person = {
        bride_name: name,
        bride_price: price,
        letter_to_bride: loveLetter
    };

    resultDiv.innerHTML = `The price for ${person.bride_name} is $${person.bride_price.toFixed(2)}. Your letter: ${person.letter_to_bride}`;
};
const applySelectCoefficient = (selectElement, price) => {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const coefficient = Number(selectedOption.value) || 1;
    return price * coefficient;
};
const applySelectBonus = (selectElement, price) => {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const bonus = Number(selectedOption.value) || 0;
    return price + bonus;
};
const getCheckboxValuesFilterReduce = (htmlCollection, price) => {
    const list = Array.from(htmlCollection).filter(item => item.checked);
    return list.reduce((acc, item) => acc + Number(item.value), price);
};
const getRadioValue = (nodeList, price) => {
    nodeList.forEach(item => {
        if (item.checked) {
            price *= Number(item.value);
        }
    });
    return price;
};
const getCheckboxValuesForLoop = (htmlCollection, price) => {
    for (let i = 0; i < htmlCollection.length; i++) {
        if (htmlCollection[i].checked) {
            const value = Number(htmlCollection[i].value);
            if (Number.isInteger(value)) {
                price += value;
            } else {
                price *= value;
            }
        }
    }
    return price;
};
document.getElementById("submit").addEventListener("click", calculate);
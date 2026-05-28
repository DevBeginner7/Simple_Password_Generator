const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');

const generateBtn = document.getElementById('generateBtn');

const passwordDisplay = document.getElementById('passwordDisplay');

const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const copyBtn = document.getElementById('copyBtn');
const copyMessage = document.getElementById('copyMessage');

const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');


lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    updateStrengthMeter();
});


uppercaseCheckbox.addEventListener('change', updateStrengthMeter);
numbersCheckbox.addEventListener('change', updateStrengthMeter);
symbolsCheckbox.addEventListener('change', updateStrengthMeter);


generateBtn.addEventListener('click', async () => {

    const response = await fetch('/generate/', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },

        body: JSON.stringify({
            length: lengthSlider.value,
            uppercase: uppercaseCheckbox.checked,
            numbers: numbersCheckbox.checked,
            symbols: symbolsCheckbox.checked
        })
    });

    const data = await response.json();

    passwordDisplay.textContent = data.password;

    updateStrengthMeter();
});


copyBtn.addEventListener('click', async () => {

    const password = passwordDisplay.textContent;

    if (!password || password === "Your password appears here") {
        return;
    }

    await navigator.clipboard.writeText(password);

    copyMessage.classList.remove('opacity-0');

    setTimeout(() => {
        copyMessage.classList.add('opacity-0');
    }, 1500);
});


function updateStrengthMeter() {

    const length = parseInt(lengthSlider.value);

    let charsetSize = 26;

    if (uppercaseCheckbox.checked) charsetSize += 26;
    if (numbersCheckbox.checked) charsetSize += 10;
    if (symbolsCheckbox.checked) charsetSize += 20;

    // Approximate entropy
    const entropy = length * Math.log2(charsetSize);

    if (entropy < 50) {
        strengthBar.style.width = '33%';
        strengthBar.className = 'h-full bg-red-500 transition-all duration-300';
        strengthText.textContent = 'Weak Password';
    }
    else if (entropy < 80) {
        strengthBar.style.width = '66%';
        strengthBar.className = 'h-full bg-yellow-500 transition-all duration-300';
        strengthText.textContent = 'Medium Password';
    }
    else {
        strengthBar.style.width = '100%';
        strengthBar.className = 'h-full bg-green-500 transition-all duration-300';
        strengthText.textContent = 'Strong Password';
    }
}

updateStrengthMeter();
function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!fname || !email) {
        alert('Gelieve minstens uw naam en e-mailadres in te vullen.');
        return;
    }

    document.getElementById('form-success').classList.add('show');

    const button = document.querySelector('.form-submit');

    if (button) {
        button.style.display = 'none';
    }
}
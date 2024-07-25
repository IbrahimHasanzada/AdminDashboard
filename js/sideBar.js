function bar(formNumber) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.classList.add('hidden');
    });

    const formToShow = document.getElementById(`form${formNumber}`);
    if (formToShow) {formToShow.classList.remove('hidden')}
}

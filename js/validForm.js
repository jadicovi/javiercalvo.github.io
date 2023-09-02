window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const nameInput = document.querySelector("input[name='name']");
  const emailInput = document.querySelector("input[name='email']");
  const subjectInput = document.querySelector("input[name='subject']");
  const messageInput = document.querySelector("textarea[name='message']");


  nameInput.isValid = () => isValidName(nameInput.value.trim() && nameInput.value.trim());
  emailInput.isValid = () => isValidEmail(emailInput.value.trim());
  subjectInput.isValid = () => isValidSubject(subjectInput.value.trim());
  messageInput.isValid = () => isValidMessage(messageInput.value.trim());

  const inputFields = [nameInput, emailInput, subjectInput, messageInput];

  const isValidName = (name) => {
    const re = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    return name.length >= 3 && re.test(String(name).toLowerCase());
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.length >= 6 && re.test(String(email).toLowerCase());
  };

  const isValidSubject = (subject) => {
    const re = /^[a-zA-ZÀ-ÿ\s]{1,60}$/;
    return subject.length >= 9 && re.test(String(subject).toLowerCase());
  };

  const isValidMessage = (message) => {
    const re = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ,.0-9\s]+$/;
    return message.length >= 13 && re.test(String(message).toLowerCase());
  };

  function clearInputs() {
    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
  }

  let shouldValidate = false;
  let isFormValid = false;

  const validateInputs = () => {
    if (!shouldValidate) return;

    isFormValid = inputFields.every((input) => {
      const isValid = input.isValid();
      input.classList.toggle("invalid", !isValid);
      input.nextElementSibling.classList.toggle("hide", isValid);
      return isValid;
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    shouldValidate = true;
    validateInputs();
    if (isFormValid) {
      const serviceID = 'default_service';
      const templateID = 'template_kd4z8ny';

      emailjs.sendForm(serviceID, templateID, form).then(
        () => {
          setTimeout(clearInputs, 2000);
          success.style.display = "block";
        },
        (err) => { 
          danger.style.display = "block";
          console.log(JSON.stringify(err));
        }
      );

      setTimeout(() => {
        danger.style.display = "none";
        success.style.display = "none";
      }, 4000);
    }
  });

  inputFields.forEach((input) =>
    input.addEventListener("input", validateInputs)
  );
});

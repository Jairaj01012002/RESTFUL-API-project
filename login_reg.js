const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const apiUrl = "http://localhost:8000";

const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");
})

const signInForm = document.querySelector(".sign-in-forms");

function isAllPresent(str) {
  // Regex to check if a string
  // contains uppercase, lowercase & numeric value
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"
  );

  // Print Yes If the string matches
  // with the Regex
  if (!(pattern.test(str))) {
    return false;
  }
  return true;
}

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const signInEmail = document.querySelector("#loginID");
  const signInPassword = document.querySelector("#loginPW");

  const email = signInEmail.value;
  const password = signInPassword.value;

  fetch(`${apiUrl}/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { token } = data;
      if (token) {
        localStorage.setItem("jwt", token);
        alert("Successfully Signed in!");
      } else {
        alert("SignUp invalid. Try Again!");
      }
    })
    .catch((err) => {
      alert("Error while sign in.... try again!");
      console.log(err);
    })
})

const signUpForm = document.querySelector(".sign-up-forms");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("Form submitted");
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#pw").value;

  // console.log(email, name, password);

  if (email.length == 0) {
    alert("Please, Enter a valid email_id!");
  }
  if (name.length == 0) {
    alert("Please, Enter a valid Username!");
  }
  if (password.length < 6) {
    alert("Password must have atleast 6 characters");
  }
  else {
    if (isAllPresent(password)) {
      fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      }).then(res => res.json())
        .then(data => {
          // console.log(data);
          const { token } = data;
          if (token) {
            localStorage.setItem("jwt", token);
            alert("Successfully Signed up!");
          } else {
            alert("SignUp invalid. Try Again!");
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      alert("Password should contain uppercase, lowercase, and numeric character");
    }
  }

})

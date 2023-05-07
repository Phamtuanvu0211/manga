// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiPFo2LzNHFOMxjP33nhlz5kC8DoDqCrw",
  authDomain: "vux0211.firebaseapp.com",
  databaseURL: "https://vux0211-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vux0211",
  storageBucket: "vux0211.appspot.com",
  messagingSenderId: "588108297048",
  appId: "1:588108297048:web:5359247774b3c452a1eb2d",
  measurementId: "G-BN94V1HYJJ"
};

firebase.initializeApp(firebaseConfig);

const userSignIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
      alert('Sign in successful');
      window.location.href = 'file:///C:/Users/PC/Desktop/JSI%20SPCK/manga-reader-master/index.html';
    })
    .catch(function (error) {
      alert(error.message)
    })
}

const userSignUp = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      alert("Sign up successful!");
    })
    .catch(function (error) {
      alert(error.message);
    });
};

// Lớp (class) Form
class Form {
  constructor(id, fields, onSubmit) {
    this.id = id;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.element = document.getElementById(id);
    this.element.addEventListener("submit", this.onSubmit);
  }

  getData() {
    const data = {};
    this.fields.forEach((field) => {
      if (field.element) {
        data[field.name] = field.getValue();
      }
    });
    return data;
  }

  clear() {
    this.fields.forEach((field) => {
      if (field.element) {
        field.setValue("");
      }
    });
  }

  isValid() {
    let isValid = true;
    this.fields.forEach((field) => {
      if (!field.isValid()) {
        isValid = false;
      }
    });
    return isValid;
  }
}

// Lớp (class) Field
class Field {
  constructor(name, validators) {
    this.name = name;
    this.element = document.getElementsByName(name)[0];
    this.validators = validators || [];
  }

  getValue() {
    return this.element.value;
  }

  isValid() {
    let isValid = true;
    if (this.element) {
      this.validators.forEach((validator) => {
        if (!validator(this.getValue())) {
          isValid = false;
        }
      });
    }
    return isValid;
  }
  setValue(value) {
    if (this.element) {
      this.element.value = value;
    }
  }
}

// Các hàm kiểm tra tính hợp lệ của dữ liệu
const isRequired = (value) => {
  return value.trim() !== "";
};

const isEmail = (value) => {
  // Kiểm tra định dạng email bằng regular expression
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
};

const isPasswordMatched = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Tạo form đăng ký
// const signupFields = [
//   new Field("username", [(value) => isRequired(value)]),
//   new Field("email", [(value) => isRequired(value), (value) => isEmail(value)]),
//   new Field("password", [(value) => isRequired(value)]),
//   new Field("confirm-password", [
//     (value) => isRequired(value),
//     (value) =>
//       isPasswordMatched(value, document.getElementsByName("password")[0].value),
//   ]),
// ];

// const signupForm = new Form("signup", signupFields, (event) => {
//   event.preventDefault();
//   if (signupForm.isValid()) {
//     const data = signupForm.getData();
//     console.log(data);
//     userSignUp(data.username, data.password);
//     signupForm.clear();
//   }
// });

// Tạo form đăng nhập
const loginFields = [
  new Field("username", [(value) => isRequired(value)]),
  new Field("password", [(value) => isRequired(value)]),
];

const loginForm = new Form("signin", loginFields, (event) => {
  event.preventDefault();
  if (loginForm.isValid()) {
    const data = loginForm.getData();
    userSignIn(data.username, data.password);
    loginForm.clear();
  }
});



# 🔐 Secure Password Generator (Django)

A modern, secure password generator built with Django, Python, and Vanilla JavaScript.
It generates cryptographically secure passwords with customizable options and real-time strength analysis.

---

## 🚀 Features

* 🔑 Secure password generation using Python `secrets` module
* 🎚️ Adjustable password length (8–24 characters)
* ✅ Options for:

  * Uppercase letters
  * Numbers
  * Symbols
* 🧠 Guaranteed inclusion of selected character types
* 📊 Real-time password strength meter (entropy-based)
* 📋 One-click copy to clipboard
* 🎨 Responsive dark-mode UI (Tailwind CSS + Vanilla JS)
* 🛡️ CSRF-protected backend (Django security best practices)

---

## 🧠 Tech Stack

* Backend: Django (Python)
* Frontend: HTML, Tailwind CSS, Vanilla JavaScript
* Security: Python `secrets` module, CSRF protection

---

## 📂 Project Structure

```

secure_password_generator/
├── manage.py
├── secure_password_generator/
├── generator/
│   ├── templates/
│   ├── static/
│   ├── views.py
│   └── urls.py

```

---

## ⚙️ How to Run Locally

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/secure-password-generator.git

# Move into directory
cd secure-password-generator

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Then open:

```
http://127.0.0.1:8000
```

---

## 🔐 Security Notes

* Uses Python’s `secrets` module for cryptographically secure randomness
* Enforces at least one character from selected categories
* Backend validation prevents parameter tampering
* CSRF protection enabled via Django middleware

---


## 👨‍💻 Author

Built as a learning project to explore Django, frontend integration, and secure password generation principles.

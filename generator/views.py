from django.shortcuts import render

# Create your views here.
import json
import secrets
import string

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST


def index(request):
    return render(request, 'generator/index.html')


@require_POST
def generate_password(request):
    data = json.loads(request.body)

    length = int(data.get('length', 12))

    use_uppercase = data.get('uppercase', False)
    use_numbers = data.get('numbers', False)
    use_symbols = data.get('symbols', False)

    lowercase_chars = string.ascii_lowercase
    uppercase_chars = string.ascii_uppercase
    number_chars = string.digits
    symbol_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    all_chars = lowercase_chars

    required_chars = []

    # Ensure at least one character from selected sets
    if use_uppercase:
        all_chars += uppercase_chars
        required_chars.append(secrets.choice(uppercase_chars))

    if use_numbers:
        all_chars += number_chars
        required_chars.append(secrets.choice(number_chars))

    if use_symbols:
        all_chars += symbol_chars
        required_chars.append(secrets.choice(symbol_chars))

    # Fill remaining password length
    remaining_length = length - len(required_chars)

    password_chars = required_chars.copy()

    for _ in range(remaining_length):
        password_chars.append(secrets.choice(all_chars))

    # Shuffle securely
    secrets.SystemRandom().shuffle(password_chars)

    password = ''.join(password_chars)

    return JsonResponse({
        'password': password
    })
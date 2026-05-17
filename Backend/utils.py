import re

def check_password_strength(password):

    if len(password) < 6:
        return "Weak"

    if re.search("[A-Z]", password) and re.search("[0-9]", password):
        return "Strong"

    return "Medium"
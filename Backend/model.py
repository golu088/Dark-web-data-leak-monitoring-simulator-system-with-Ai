def predict_risk(count):

    if count == 0:
        return "Safe"
    elif count <= 2:
        return "Low"
    elif count <= 4:
        return "Medium"
    else:
        return "High"
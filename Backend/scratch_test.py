import os
import re
import pandas as pd

dataset_path = os.path.join(os.path.dirname(__file__), 'data', 'breach_dataset.csv')
print(f"Dataset path: {dataset_path}")
try:
    df_breach = pd.read_csv(dataset_path)
    df_breach.columns = df_breach.columns.str.strip()
    print(f"Loaded dataset with {len(df_breach)} rows.")
except Exception as e:
    df_breach = pd.DataFrame()
    print(f"Error loading dataset: {e}")

user_message = "check this email wvallentine1@sfgate.com please"
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', user_message)
print(f"Extracted emails: {emails}")

context_message = ""
if emails and not df_breach.empty:
    breach_info = []
    for email in emails:
        match = df_breach[df_breach['email'].astype(str).str.lower() == email.lower()]
        print(f"Matches for {email}: {len(match)}")
        if not match.empty:
            for _, row in match.iterrows():
                breach_info.append(f"Email '{email}' was found in the `{row['source']}` breach in year {row['year']}.")
        else:
            breach_info.append(f"Email '{email}' was NOT found in the breach database. It appears safe.")
            
    if breach_info:
        context_message = "\n\n[System Data context to help answer the user:\n" + "\n".join(breach_info) + "\nEnd System Data]"

print(f"Context message: {context_message}")

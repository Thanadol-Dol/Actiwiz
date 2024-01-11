# Actiwiz

Mobile Application for KMUTT Activities and Clubs

## Run backend server

1. Downloading or cloning this repository to use on your local machine.

```bash
  git clone https://github.com/Thanadol-Dol/Actiwiz.git
```

2. Navigate to backend folder

```bash
  cd backend
```

3. Create a Virtual Environment
```bash
  python -m venv env
```

4. Activate a Virtual Environment
```bash
  env\Scripts\activate
```

5. Install project requirements
```bash
  pip install -r requirements.txt
```

6. Start the server with
```bash
  uvicorn src.main:app --reload
```

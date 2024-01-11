# Actiwiz

Mobile Application for KMUTT Activities and Clubs

## Run backend server

First, after downloading or cloning this repository to use on your local machine.

Navigate to backend folder

```bash
  cd backend
```

Create a Virtual Environment
```bash
  python -m venv env
```

Activate a Virtual Environment
```bash
  env\Scripts\activate
```

Install project requirements
```bash
  pip install -r requirements.txt
```

Start the server with
```bash
  uvicorn src.main:app --reload
```

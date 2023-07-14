

## Setup frontend

First, run :
```bash
npm install

npm run dev
```

## Setup backend

In another terminal window
```bash
cd backend

```
Setup virtual environment in this directory and activate it
```bash
python -m venv myvenv

cd myvenv/Scripts
./Activate.ps1

```
After virtual env activated
```bash
pip install -r requirements.txt

```
Go to directory containing manage.py file
```bash
python manage.py runserver

```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For commit messages

```bash
feat:     (addition of a new feature)
refactor: (refactoring the code: optimization/ different logic of existing code - output doesn't change, just the way of execution changes)
docs:     (documenting the code, be it readme, or extra comments)
fix:      (bug fixing)
chore:    (chore - beautifying code, indents, spaces, camelcasing, changing variable names to have an appropriate meaning)
patch:    (patches - small changes in code, mainly UI, for example color of a button, increasing size of tet, etc etc)
conf:     (configurational settings - changing directory structure, updating gitignore, add libraries, changing manifest etc)
```


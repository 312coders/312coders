# Setup
- Make sure you have [Python](https://www.python.org/downloads/) installed (~3.11)
- Create a [virtual environment](https://docs.python.org/3/library/venv.html) by running `python -m venv .venv`
  - Not a completely necessary step, but I would recommend this
  - Doesn't matter too much which directory you do this in, either the root of the repo or the /backend folder should work
- Install dependencies by running `pip install -r requirements.txt`
- Apply migrations by running `python manage.py migrate`
- Run the Django server by running `python manage.py runserver`

# Environments
__NOTE__: There are different environments in which this app can run in, if you look under /settings. (Base configs are stored in `base.py`)
- `local.py`: using SQLite database stored on the local filesystem _(default)_
- `dev.py`: connecting to hosted/remote PostgreSQL DB
  - in order to use this environment, you will need to set up an environment file (`db.env` in the root /backend directory)
  - Contact Kevin for the credentials
  - ___WARNING___: this is not a file you want to commit, it is in the gitignore

To run the app in `dev` mode and use the hosted DB (or apply migrations to the hosted DB) just change the `--settings` command-line argument: `python manage.py runserver --settings=settings.dev`

Eventually we can establish a production environment, and staging/testing if necessary
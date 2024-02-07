FROM python:3.11

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE="settings.prod" 

RUN mkdir /app
WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .

RUN python manage.py collectstatic
RUN python manage.py migrate

EXPOSE 8000

# CMD python manage.py runserver

CMD exec gunicorn wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 3 \
  --log-level=info \
  --capture-output \
  "$@"
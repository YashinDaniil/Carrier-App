# Dockerfile
FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN apt-get update

WORKDIR /app/backend
COPY requirements.txt /app/backend
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
FROM python:3.11-slim-buster

WORKDIR /usr/src/smart-hint

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFERED 1

RUN apt-get update \
    && apt-get -y install netcat gcc postgresql \
    && apt-get clean

COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

CMD [ "flask", "run" ]
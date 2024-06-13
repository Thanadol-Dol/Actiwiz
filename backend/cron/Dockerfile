FROM python:3.9.0b4-alpine3.12

COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt

COPY database.py /bin/database.py

COPY cron_utils.py /bin/cron_utils.py

COPY main /bin/main

COPY root /var/spool/cron/crontabs/root

RUN chmod +x /bin/main /bin/database.py /bin/cron_utils.py

CMD crond -l 2 -f
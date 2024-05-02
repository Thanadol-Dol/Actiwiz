FROM python:3.9.0b4-alpine3.12

COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt

COPY database.py /bin/database.py

COPY notification_utils.py /bin/notification_utils.py

COPY main /bin/main

COPY root /var/spool/cron/crontabs/root

RUN chmod +x /bin/main /bin/database.py /bin/notification_utils.py

CMD crond -l 2 -f
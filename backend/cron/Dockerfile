FROM python:3.9.0b4-alpine3.12

COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt

COPY database.py /bin/database.py

COPY notification_utils.py /bin/notification_utils.py

COPY main /bin/main

COPY root /var/spool/cron/crontabs/root

RUN chmod +x /bin/main /bin/database.py /bin/notification_utils.py

ENV NEO4J_URI=neo4j+s://5080eb70.databases.neo4j.io

ENV NEO4J_USERNAME=neo4j

ENV NEO4J_PASSWORD=r3JDTiQxTb65icxg6xVv0W9b9USvGNHzLFIlg2Rb-v0

CMD crond -l 2 -f
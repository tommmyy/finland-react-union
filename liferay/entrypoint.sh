#!/bin/bash 
echo -n "Waiting for $1 ."

KNOCK=1
while [ $KNOCK -gt 0 ]; do
    echo -n "."; sleep 1;
    curl -qs $2 2>/dev/null
    KNOCK=$?
done

echo "Starting liferay server ."

sh /opt/liferay/tomcat/bin/catalina.sh run

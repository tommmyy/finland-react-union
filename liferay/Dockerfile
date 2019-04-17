FROM docker.lnd.bz/liferay-base:1.0.0

ENV LIFERAY_HOME /opt/liferay
ENV TOMCAT_HOME ${LIFERAY_HOME}/tomcat

USER liferay:liferay

COPY --chown=liferay:liferay /bundle ${LIFERAY_HOME}

RUN mv ${LIFERAY_HOME}/tomcat-* ${TOMCAT_HOME}

EXPOSE 8000 8009 8080

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh","oracle DB","http://oracle:8080"]

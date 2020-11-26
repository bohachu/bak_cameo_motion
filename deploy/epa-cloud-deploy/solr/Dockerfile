FROM asia.gcr.io/epa-cloud/docker_solr:latest
MAINTAINER Open Knowledge

ENV SOLR_CORE ckan

RUN mkdir -p /opt/solr/server/solr-webapp/webapp/WEB-INF/classes

COPY schema.xml /opt/solr/server/solr/$SOLR_CORE/conf/
COPY IKAnalyzer2017_6_6_0.jar /opt/solr/server/solr-webapp/webapp/WEB-INF/lib
COPY IKAnalyzer.cfg.xml /opt/solr/server/solr-webapp/webapp/WEB-INF/classes
COPY ext.dic /opt/solr/server/solr-webapp/webapp/WEB-INF/classes
COPY stopword.dic /opt/solr/server/solr-webapp/webapp/WEB-INF/classes
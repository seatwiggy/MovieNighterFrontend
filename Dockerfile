FROM tomcat:8.5.84-jre17
ADD target/*.war /usr/local/tomcat/webapps/
ADD src/main/resources/static/ /usr/local/tomcat/webapps/ROOT/
EXPOSE 8080
CMD ["catalina.sh", "run"]

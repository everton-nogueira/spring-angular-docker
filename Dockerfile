#FROM openjdk:8-jdk-alpine
#COPY /target/*.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

FROM java:8
FROM maven:alpine

# image layer
WORKDIR /app
ADD pom.xml /app
RUN mvn verify clean --fail-never

# Image layer: with the application
COPY . /app
RUN mvn -v
RUN mvn clean install -DskipTests
EXPOSE 8080
ADD ./target/*.jar /developments/app.jar
ENTRYPOINT ["java","-jar","/developments/app.jar"]
#!/usr/bin/env groovy

pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-u root'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building......'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing......'
                sh 'npm start'
            }
        }
    }
}

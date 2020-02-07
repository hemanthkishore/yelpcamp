#!/usr/bin/env groovy

pipeline {
    agent {
        docker {dockerfile true}
    }

    stages {
       
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}

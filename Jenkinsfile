pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube'
        IMAGE_AUTH = 'skandar55/shopcore-auth'
        IMAGE_PRODUCT = 'skandar55/shopcore-product'
        IMAGE_GATEWAY = 'skandar55/shopcore-gateway'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend/services/auth-service') {
                    sh 'npm install'
                }
                dir('backend/services/product-service') {
                    sh 'npm install'
                }

                dir('backend/api-gateway') {
                    sh 'npm install'
                }

            }
        }
    

        stage('SonarQube Analysis') {
            steps {

                withCredentials([
                    string(
                        credentialsId: 'sonar-token',
                        variable: 'SONAR_TOKEN'
                    )
                ]) {
                    sh '''
                        sonar-scanner \
                        -Dsonar.organization=skandar05 \
                        -Dsonar.projectKey=Skandar05_shopCore \
                        -Dsonar.sources=backend \
                        -Dsonar.token=$SONAR_TOKEN
                    '''
                }
                
            }
        }
        stage('Docker login'){
           steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-credentials',
                usernameVariable: 'DOCKER_USERNAME',
                passwordVariable: 'DOCKER_TOKEN'
            )
        ]) {
            sh '''
                echo "$DOCKER_TOKEN" | docker login \
                    -u "$DOCKER_USERNAME" \
                    --password-stdin
            '''
        }
    }
        }
        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_AUTH}:latest ./backend/auth-service
                    docker build -t ${IMAGE_PRODUCT}:latest ./backend/product-service
                    docker build -t ${IMAGE_GATEWAY}:latest ./backend/api-gateway
                '''
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                    trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_AUTH}:latest
                    trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_PRODUCT}:latest
                    trivy image --severity HIGH,CRITICAL --exit-code 1 ${IMAGE_GATEWAY}:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker push ${IMAGE_AUTH}:latest
                    docker push ${IMAGE_PRODUCT}:latest
                    docker push ${IMAGE_GATEWAY}:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD terminée avec succès !'
        }

        failure {
            echo 'Pipeline échouée !'
        }
    }
}
pipeline {
    agent any

    stages {
        
        stage('Clean Workspace') {
            steps {
                // Nettoyer le workspace avant de commencer
                deleteDir() 
            }
        }
        
        stage('gitCheckout') {
            steps {
               script {
                    if (fileExists('.git')) {
                        bat 'git reset --hard'
                        bat 'git clean -fd'
                        bat 'git pull origin develop'
                    } else {
                        git branch: 'develop', url: 'https://github.com/andoniainalahatra/Elecdis_CSMS_OCPP_1_6-FrontEnd.git'
                    }
                }
            }
        }
        
        stage('Install dependencies') {
            steps {
                // Installation des dépendances via npm
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Exécution du build avec npm
                bat 'npm run build'
            }
        }
        
        stage('Cleanup Docker') {
            steps {
                // Arrêter et supprimer le conteneur s'il existe déjà
                bat '''
                docker stop my-nginx-app || echo "No running container to stop"
                docker rm -f my-nginx-app || echo "No container to remove"
                docker rmi -f my-nginx-app || echo "No image to remove"
                '''
            }
        }
        
        stage('Run Docker') {
            steps {
                bat 'docker build -t my-app .' 
                bat 'docker run -d -p 8081:80 --name my-nginx-app my-app'
            }
        }
        
    }

    post {
        success {
            emailext (
                body: 'Build completed successfully.',
                subject: 'Build Success Notification',
                to: 'kevinrakoto77@gmail.com',
                attachLog: true
            )
        }
        failure {
            emailext (
                body: 'The build has failed.',
                subject: 'Build Failure Notification',
                to: 'kevinrakoto77@gmail.com',
                attachLog: true
            )
        }
    }
}

pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20' // Matches the name configured in Step 1
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --headless --reporter=allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'allure generate allure-results --clean'
            }
        }

        stage('Open Allure Report') {
            steps {
                sh 'allure open allure-report'
            }
        }
    }
}

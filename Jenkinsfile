pipeline {
    agent any  // Use any available agent to run the pipeline (you can specify a specific agent if required)

    environment {
        // Define any environment variables here
        // For example, PATH = "/usr/local/bin:$PATH"
    }

    stages {
        // Stage 1: Checkout
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from the Git repository
                    checkout scm
                }
            }
        }

        // Stage 2: Install Dependencies
        stage('Install Dependencies') {
            steps {
                script {
                    // Install the project dependencies using npm
                    sh 'npm install'  // On Linux/Unix systems
                    // bat 'npm install'  // Use this for Windows systems
                }
            }
        }

        // Stage 3: Run Playwright Tests
        stage('Run Playwright Tests') {
            steps {
                script {
                    // Run Playwright tests using npx
                    sh 'npx playwright test'  // On Linux/Unix systems
                    // bat 'npx playwright test'  // Use this for Windows systems
                }
            }
        }

        // Stage 4: Archive Test Results
        stage('Archive Test Results') {
            steps {
                script {
                    // Archive the test results from the 'test-results' directory
                    junit '**/test-results/**/*.xml'  // If using JUnit format for reports
                    archiveArtifacts artifacts: '**/test-results/**', allowEmptyArchive: true
                }
            }
        }

        // Stage 5: Publish Allure Report (Optional)
        stage('Publish Allure Report') {
            when {
                // Optional: Only run this stage if Allure is installed and configured
                expression { return fileExists('test-results/allure-results') }
            }
            steps {
                script {
                    // Generate Allure report from the results directory
                    sh 'allure generate test-results/allure-results --clean -o test-results/allure-report'
                    // Display the Allure report in Jenkins
                    allure([
                        includeProperties: false,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'test-results/allure-report']]
                    ])
                }
            }
        }
    }

    post {
        always {
            // Clean-up or notifications can be done here
        }
    }
}

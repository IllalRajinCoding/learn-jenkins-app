pipeline {
    agent any

    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm

                script {
                    currentBuild.displayName =
                        "${env.GIT_COMMIT?.take(7) ?: 'local'}"
                }
            }
        }

        stage('Deps') {
            agent {
                docker {
                    image 'oven/bun:1.3.10'
                    args '-v $HOME/.bun-cache:/root/.bun-cache'
                }
            }

            steps {
                sh 'bun install --frozen-lockfile'
            }
        }

        stage('Typecheck') {
            agent {
                docker {
                    image 'oven/bun:1.3.10'
                    args '-v $HOME/.bun-cache:/root/.bun-cache'
                }
            }

            steps {
                sh 'bun install --frozen-lockfile'
                sh 'bun run typecheck'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'oven/bun:1.3.10'
                    args '-v $HOME/.bun-cache:/root/.bun-cache'
                }
            }

            steps {
                sh 'bun install --frozen-lockfile'
                sh 'bun run build'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'oven/bun:1.3.10'
                    args '-v $HOME/.bun-cache:/root/.bun-cache'
                }
            }

            steps {
                sh 'bun install --frozen-lockfile'
                sh 'bun run test'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }

            steps {
                archiveArtifacts artifacts: 'dist/**',
                                 fingerprint: true

                sh '''
                    docker build \
                      -t learn-jenkins:${BUILD_ID} .
                '''
            }
        }
    }

    post {
        always {
            cleanWs(cleanWhenNotBuilt: false)
        }

        success {
            echo "✔ Build ${env.BUILD_NUMBER} PASSED - ${env.RUN_DISPLAY_URL}"
        }

        failure {
            echo "✘ Build ${env.BUILD_NUMBER} FAILED - ${env.BUILD_URL}"
        }
    }
}

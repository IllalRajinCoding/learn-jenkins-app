// Jenkinsfile - Pipeline Declarative untuk learn-jenkins
//
// Agent menjalankan pipeline di dalam container Docker berisi Bun.
// Syarat: Jenkins punya plugin "Docker Pipeline" dan daemon Docker tersedia.
// Lihat README → "T-01 Jalankan Jenkins di Docker".
//
// 6 stage ini persis sama dengan yang digambarkan di landing page.

pipeline {
    agent {
        docker {
            image 'oven/bun:1.3.10'
            args '-v $HOME/.bun-cache:/root/.bun-cache'
        }
    }

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
                    currentBuild.displayName = "${env.GIT_COMMIT?.take(7) ?: 'local'}"
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
                sh 'bun run test'
            }
        }

            when {
                branch 'main'
            }
            steps {
                // 1) Simpan hasil build sebagai artifact yang bisa diunduh.
                archiveArtifacts artifacts: 'dist/**', fingerprint: true

                // 2) Bangun image container (perlu Docker di agent/pipeline).
                //    Jalankan manual kalau agent tidak punya akses daemon:
                //    docker build -t learn-jenkins . && docker run -p 3001:80 learn-jenkins
                script {
                    if (isUnix() && sh(script: 'command -v docker >/dev/null 2>&1', returnStatus: true) == 0) {
                        sh 'docker build -t learn-jenkins:${BUILD_ID} .'
                    } else {
                        echo 'Docker tidak tersedia di agent - deploy image dilewati (lihat T-05).'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs(cleanWhenNotBuilt: false)
        }
        success {
            echo "✔ Build ${env.BUILD_NUMBER} PASSED - ${env.RUN_DISPLAY_URL}"
            // Notifikasi (T-06): tambahkan step ini setelah punya webhook.
            // slackSend(color: '#A3E635', message: "Build #${env.BUILD_NUMBER} passing: ${env.BUILD_URL}")
        }
        failure {
            echo "✘ Build ${env.BUILD_NUMBER} FAILED - ${env.BUILD_URL}"
            // Notifikasi (T-06): aktifkan setelah webhook tersedia.
            // slackSend(color: '#F87171', message: "Build #${env.BUILD_NUMBER} merah: ${env.BUILD_URL}")
        }
    }
}

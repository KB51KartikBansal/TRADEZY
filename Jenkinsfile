pipeline {

    agent any

    environment {
        AWS_ACCOUNT_ID = "565358953234"
        AWS_DEFAULT_REGION = "us-east-1"
        IMAGE_REPO_NAME = "user-interface"
        IMAGE_TAG = "latest"
        BRANCH_NAME = env.GIT_BRANCH.replace('productphase-ui/', '')

    }

    tools {
        nodejs "nodejs"
    }


    stages {
        stage('cloning from bitbucket') {
			when{
				branch 'develop'
				}
            steps {
                //sh 'mkdir bitbucket'
                //sh 'mkdir codecommit'
				sh 'ls -a'
                dir('bitbucket/') {
                    git branch: 'develop', credentialsId: 'samyak-token', url: 'https://tools.publicis.sapient.com/bitbucket/scm/psasb/product-phase-ui.git'
                }


            }

        }
        stage('cloning from aws codecommit') {
			when{
				branch 'develop'
				}
            steps {
                // sh 'cd codecommit'
                dir('codecommit/') {
                    git branch: 'master', url: 'https://git-codecommit.us-east-1.amazonaws.com/v1/repos/tradezy-UI'
                }


            }

        }

        stage('npm package installer') {
            steps {
                sh 'node -v'
                sh 'npm install'
            }
        }

        stage('npm audit') {
            steps {
                sh 'npm audit --production'
            }
        }

        stage('npm test') {
            steps {
                sh 'npm test --coverage'
            }
        }

        stage('SonarQube Analysis') {
           steps {

               withSonarQubeEnv('sonar-new-token') {

                   sh '''
                  sonar-scanner -Dsonar.projectKey=product-phase:ui -Dsonar.sources=src -Dsonar.exclusions=**/*.test.jsx,**/*.test.js -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.jsx,**/*.test.js -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.branch.target=feature/develop -Dsonar.host.url=https://tools.publicis.sapient.com/sonar -Dsonar.login=07e1b667480128fea31c4778985d5e88be517f04
                  '''
               }
            }
        }

        stage('Quality Gate') {
            steps {
                 sleep(time:30,unit:"SECONDS")
                withSonarQubeEnv('sonar-new-token') {
                  script{
                    sh "cat .scannerwork/report-task.txt"
                    def props = readProperties file: '.scannerwork/report-task.txt'
                    echo "properties=${props}"
                    def sonarServerUrl=props['serverUrl']
                    def ceTaskUrl= props['ceTaskUrl']
                    def ceTask
                    timeout(time: 1, unit: 'MINUTES') {
                        waitUntil {
                            def response = httpRequest url: ceTaskUrl, customHeaders:[[name:'Authorization', value:"Basic MDdlMWI2Njc0ODAxMjhmZWEzMWM0Nzc4OTg1ZDVlODhiZTUxN2YwNDo="]]
                            ceTask = readJSON text: response.content
                            echo ceTask.toString()
                            return "SUCCESS".equals(ceTask["task"]["status"])
                        }
                    }
                    def response2 = httpRequest url : sonarServerUrl + "/api/qualitygates/project_status?analysisId=" + ceTask["task"]["analysisId"],customHeaders:[[name:'Authorization', value:"Basic MDdlMWI2Njc0ODAxMjhmZWEzMWM0Nzc4OTg1ZDVlODhiZTUxN2YwNDo="]]
                    def qualitygate =  readJSON text: response2.content
                    echo qualitygate.toString()
                    if ("ERROR".equals(qualitygate["projectStatus"]["status"])) {
                        error  "Quality Gate failure"


                        }
                    }
                }
                }
            }


        stage(' Copy code from bitbucket to codecommit') {
			when{
				branch 'develop'
				}
            steps {
                sh 'rsync --exclude .git -a bitbucket/ codecommit'


            }

        }
        stage('git push to AWS codecommit') {
			when{
				branch 'develop'
				}
            steps {
                dir('codecommit/') {
                    sh 'git add --all'
                    sh 'git commit -m "Executed from Jenkins"'
                    sh 'git pull origin master'
                    sh 'git push origin master'
                }

            }

        }

    }
}
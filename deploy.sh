
gitDir=/Users/mlo/work/openassemblee/deploy/github
tomcatDir=/Users/mlo/services/tomcat-openassemblee/
scriptTargetBranch=deploy-local-mlo
appTargetBranch=app

cd $gitDir
# si on est pas sur la bonne branch
git checkout master
# branch ramené à master pour avoir le script en dernière version
git reset --hard $scriptTargetBranch
# prend du temps...
#git prune ; git gc

$tomcatDir/bin/shutdown.sh

sleep 2

cd $tomcatDir/webapps

git clone $gitDir ROOT

cd $tomcatDir/webapps/ROOT

git checkout $appTargetBranch ; git fetch --all ; git reset --hard origin/app
#git prune ; git gc

$tomcatDir/bin/startup.sh

tail -fn 1000 $tomcatDir/logs/catalina.out

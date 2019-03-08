
gitDir=/root/git/openassemblee-deploy
tomcatDir=/opt/tomcat
scriptTargetBranch=master
appTargetBranch=app

cd $gitDir
# si on est pas sur la bonne branch
git branch current
git checkout current
# branch ramené à master pour avoir le script en dernière version
git reset --hard $scriptTargetBranch
# prend du temps...
#git prune ; git gc

$tomcatDir/bin/shutdown.sh

sleep 20

cd $tomcatDir/webapps

git clone $gitDir ROOT

cd $tomcatDir/webapps/ROOT

git checkout $appTargetBranch ; git fetch --all ; git reset --hard origin/app
#git prune ; git gc

$tomcatDir/bin/startup.sh

tail -fn 1000 $tomcatDir/logs/catalina.out

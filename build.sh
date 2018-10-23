# !/bin/bash

# Date : 2018-10-22
# Author : bzs
# project build script

startTime=`date +%s`

yarn install

npm run dll

npm run build

endTime=`date +%s`

eTime=$[$endTime - $startTime]

echo "--------------------------------------------------"
echo " success build this project"
echo "--------------------------------------------------"
echo " Total time: ${eTime}s"
echo " Finished at : `date +'%Y-%m-%d %H:%M:%S'`"  
echo "--------------------------------------------------"
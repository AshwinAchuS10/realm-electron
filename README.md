1 - An electron application using(**realm@11.9.0**) installed in a windows machine.

2 - An update to existing application is released, and when the new version of app.exe is installed on the same machine, it says
App cannot be closed. Please close it manually and Retry to continue popup rises
Even after retrying, it doesn't works. Once the process is killed manually in task manager. The updated application can be installed.

This is not the case in realm@11.3.0. Eventhough the application is running in background, it automatically closes and installs the update without any issues

---

### Prerequisites

Node V16+

Windows OS

---

##### Steps to Reproduce issue with Realm@11.9.0


1 - Clone the  repository

2 - Run **npm install**

3 - Run **npm run dist**

Once the step 3 is done, dist folder will  be created in the  project root  directory

4 - Go to **dist** folder and find **RealmElectron Setup 1.0.0.exe** file

5 - Install the executable file and open the application

6 - Now increment the version in **package.json** file

Example
```
"version": "2.0.0"
```

7 - Now again run **npm run dist** in the project  root directory

8 - Once the above step is done, go to dist folder and find **RealmElectron Setup 2.0.0.exe** file  and install it.

9 - During the application the  install will open a popup to close the application. 
For that you can click **retry** in the popup. 

10 - Now eventhough you click retry n number of times, it wont close and complete the installation.
11 - If you manually open the Task Manager and End the process **RealmElectron** ,the installation/update can be done.

This happens with the latest version or version after **realm@11.3.0**

If the realm@11.3.0 is used the application, if we try to install/update any newer version,it automatically closes and installs the updated version without any issues.

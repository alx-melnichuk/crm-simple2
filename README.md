>[Previous article - part 1](https://github.com/alx-melnichuk/crm-simple1/blob/master/README.md)

>Article in Russian [README_ru.md](https://github.com/alx-melnichuk/crm-simple2/blob/master/README_ru.md)

## Combine multiple Angular applications into one complex. (part 2)

### Introduction

The previous article describes how to create an application framework in _Angular_, which implements the ability to include two additional applications into one main application. In this article, we will continue to develop this application. Let's connect the _Angular Material_ library and organize the work with assets (with image files) for each additional application.

### Preconditions

The prerequisites are detailed in the previous article.
Let us indicate briefly:
- _Node.js_ version 10.9.0 or later;
- Package manager _npm_ version 6.14.8 or later;
- _Angular_ version 10 or later;

Create a directory for the project go to it:
```bash
$ mkdir /home/alexey/ws_ts3/crm-simple1/
$ cd /home/alexey/ws_ts3/crm-simple1/
```
Copy the project files from the previous article into it [github-crm-simple1](https://github.com/alx-melnichuk/crm-simple1). However, you can delete the files `img-*.png`.

Start installation of all required packages:
```bash
$ npm install
```
### Add _Angular Material_

The _Angular Material_ library contains many useful components that will help us create a robust and beautiful application. A description of this library can be found on the website [https://material.angular.io/](https://material.angular.io/).

Let's add the _Angular Material_ version 10 library to the project, since Angular version 10 was installed.
```bash
$ npx ng add @angular/material@10
```
During installation, you need to specify a theme (for example 'Indigo/Pink'). Since all components of this library support the skin (one of the pre-installed or custom). And for this you need to specify the default theme.

And agree to install the animation library. It will provide smooth animation of work of standard components of the _Angular Material_ library (such as: buttons, radio buttons, and so on). The spinner component will not work correctly without animation.

We indicate the default answer for the rest of the parameters.

Since this library has its own set of styles, this set is automatically added to the project description file.\
_./angular.json_
```json
"styles": [
  "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
  "src/styles.scss"
],
```
The _Angular Material_ library will be required, since it is planned to use the _MatTable_ component to display the table.

Let's make adjustments to the global menu template to make it look more beautiful.

### Creation of a service for obtaining information about clients.

To continue, go to the component directory `app`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-client/src/app/
```
Working with customer data requires a service that can access the API.

Let's create a service for receiving customer data in a separate subdirectory `services`:
```bash
$ mkdir services
$ cd services
$ npx ng generate service client-api
$ cd ..
```
We implement receiving data on clients in the service (for example, from a json file).
This service uses an object of class `HttpClient` and therefore add `HttpClientModule` to the module _/projects/app-client/src/app/app.module.ts_.

### Create a header to display a list of customers.

Let's start filling the functionality in the additional application for working with clients. There is a `client-list` component that corresponds to the `/app-client/list` route element. Let's add two child components to it:
- `c-l-header` to display the header;
- `c-l-middle` to display the middle part (customer list);

To continue, go to the component directory `client-list`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-client/src/app/client-list/
```
Next, we create a component to display the title in the customer list.

Create module and component `c-l-header`:
```bash
$ npx ng generate module c-l-header
$ npx ng generate component c-l-header --export=true
```
Let's add some picture to the header component `c-l-header` that can be associated with this functionality. This will help the user to intuitively distinguish which business module he is in. In addition to the picture, you can add any other resource.

Add the image file `logo-client.png` to the resource directory of the current additional application _'./projects/app-client/src/assets/img'_.

Let's start and check the performance of the entire application with the command:
```bash
$ npx ng serve --port 4250
```
And check the link in the browser: [http://localhost:4250/app-client/list](http://localhost:4250/app-client/list)

But there is no new picture in the required place. And in the console we see an error:
```bash
GET http://localhost:4250/assets/img/logo-client.png 404 (Not Found)
```

### Copying a resource from a secondary to the main application.

Since the image file was added to the resources of the additional application `app-client`, it is not in the resources of the main application `crm-simple`. And for verification, the main application is launched in the browser. It is now clear that the resources of the additional application `app-client` should be copied to the resource directory of the main application `crm-simple`. This can be done through the `angular.json` settings.

Add copying of resource files of the additional application `app-client` to the resulting resource directory of the main application `crm-simple`.

Modifying the file `angular.json`:\
_/home/alexey/ws_ts3/crm-simple1/angular.json_
```json
{
  "projects": {
    "crm-simple": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "projects/app-client/src/assets",
                "output": "/assets"
              }
            ],
```
This can be found at the link [https://angular.io/guide/workspace-config#asset-config](https://angular.io/guide/workspace-config#asset-config).

To check, you can run the build of the entire application with the command:
```bash
$ npx ng build
```
When the build is complete, a `dist` directory is created, in which all the files for the main and all additional applications will be collected. And now you can check the image file `logo-client.png` from the resource directory of the additional application `app-client` to the resource directory of the main application.

Thus, it is possible to add two different files with the same name to two additional applications. Then the file that will be copied last will be included in the main project.

### Copying a resource from an additional to the main application with an additional nesting level.

A simple solution is proposed to avoid such conflicts. Add another directory (for example, the name of this additional application) in the `assets` resource directory of all additional applications. And transfer all the required resources to this new directory (directory of images `img` and so on).

After that, in the project file `angular.json` you need to add a block to copy the resources of each additional application.

Modifying the file `angular.json`:\
*/home/alexey/ws_ts3/crm-simple1/angular.json*
```json
{
  "projects": {
    "crm-simple": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "projects/app-client/src/assets/app-client",
                "output": "/assets/app-client"
              }
            ],
```
This structure of the resource directory `/assets/app-client` must be considered when using these files.
For example, to use the image `logo-client.png`, you need to specify:
```html
background: url("/assets/app-client/img/logo-client.png")
```
This approach eliminates the conflict when adding two different files with the same name to two additional applications. And developers won't waste their time solving these kinds of problems. This method allows you to create independent additional applications that contain all the resources required for their work.

If there is a duplication of the resource file in different additional applications, this will not affect anything. Each business module is lazy loaded and only one business module will be loaded at any given time.

When you initially plan to use a resource file in two additional applications, it makes sense to move that resource file to a secondary library. And then plug this library into each business module. It is also required to add to `angular.json` copying the resources of this library to the main application (as described above).

### Creation of the middle part to display the list of customers.

To continue, go to the directory of the additional application `app-client`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-client/src/app/client-list/
```
Previously, a `c-l-header` component was created to display the header. Next, we create a component to display the middle part of the `c-l-middle`.

Create module and component `c-l-middle`:
```bash
$ npx ng generate module c-l-middle
$ npx ng generate component c-l-middle --export=true
```
Let's add the display of the list of clients to this component.

### Create a header to display client properties.

Let's continue filling the functionality in the additional client service application. There is a `client-view` component that corresponds to the `/app-client/view` route element. This component will display the properties of one selected client.

To get client properties, call the service method _ClientApiService.getData()_. For example, suppose the header component requires a customer name, and the middle component requires all other customer properties. Thus, the _ClientApiService.getData()_ method will be called in these two components. Before calling this method, you need to determine the client ID from the route parameters. For this, a subscription to receive route data is organized. And since this data is required in two components, the subscription must be organized the same in two components. If you are subscribing to an event, you should remember to unsubscribe from this event.

A more rational solution is to move the organization of subscription / unsubscription, receiving general data to the level of the parent component. Conclusion: the main task of the component associated with the route is to get all the data for its children. And all this data will be passed through the input parameters of the child components. This way, these child components can be easily reused elsewhere as needed.

To continue, go to the component directory `client-view`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-client/src/app/client-view/
```
Next, we create a component to display the title.

Create module and component `c-v-header`:
```bash
$ npx ng generate module c-v-header
$ npx ng generate component c-v-header --export=true
```
Let's implement the _c-v-header_ header component similarly to the _c-l-header_ component described above. And we will add a link to be able to return to the list of clients.

### Creation of a middle part for displaying client properties.

Create a component to display the middle section `c-v-middle`.

Create module and component `c-v-middle`:
```bash
$ npx ng generate module c-v-middle
$ npx ng generate component c-v-middle --export=true
```
Let's add client properties mapping to this component.

You can now uninstall the add-on navigation component as it is no longer used _/projects/app-client/src/app/nav/_.

Let's run and check how the additional application works `app-client`:
```bash
$ npx ng serve --port 4250
```
And check in the browser the display of the list of clients by the link: [http://localhost:4250/app-client/list](http://localhost:4250/app-client/list)

![alt](https://github.com/alx-melnichuk/crm-simple2/blob/master/img2-client-list.png)

And check the display of client properties in the browser by the link: [http://localhost:4250/app-client/view/1](http://localhost:4250/app-client/view/1)

![alt](https://github.com/alx-melnichuk/crm-simple2/blob/master/img2-client-view.png)

### Create a service to get information about tasks.

Let's do a similar job in the additional task management application.

To continue, go to the directory of the additional application `app-task`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-task/
```
An additional application for working with tasks provides the user with the following capabilities:
- view the list of tasks;
- view the properties of an individual task;

To continue, go to the component directory `app`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-task/src/app/
```
Working with task data requires a service that can access the API.

Let's create a service for receiving task data in a separate subdirectory `services`:
```bash
$ mkdir services
$ cd services
$ npx ng generate service task-api
$ cd ..
```
We implement in the service receiving data on tasks (for example, from a json file).

### Create a header to display the task list.

The additional task application has a `task-list` component that corresponds to the `/app-task/list` route element. Let's add two child components to it:
- `t-l-header` to display the header;
- `t-l-middle` to display the middle part (task list);

To continue, go to the component directory `task-list`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-task/src/app/task-list/
```
Next, we create a component to display the title in the task list.

Create module and component `t-l-header`:
```bash
$ npx ng generate module t-l-header
$ npx ng generate component t-l-header --export=true
```
Add the corresponding image to the `t-l-header` header component. The file of this image `logo-task.png` will be placed in the resource directory of the current additional application  _'./projects/app-task/src/assets/app-task/img'_.

### Create a middle section to display the task list.

Create module and component `t-l-middle`:
```bash
$ npx ng generate module t-l-middle
$ npx ng generate component t-l-middle --export=true
```
Let's add the display of the list of tasks to this component.

Also in the project file `angular.json` add a block for copying the resources of this additional application.

Modifying the file `angular.json`:\
*/home/alexey/ws_ts3/crm-simple1/angular.json*
```json
{
  "projects": {
    "crm-simple": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "projects/app-client/src/assets/app-client",
                "output": "/assets/app-client"
              },
              {
                "glob": "**/*",
                "input": "projects/app-task/src/assets/app-task",
                "output": "/assets/app-task"
              }
            ],
```
### Create a title to display task properties.

Let's continue filling the functionality in the additional application for working with tasks. There is a `task-view` component that corresponds to the `/app-task/view` route element. This component will display the properties of one selected task.
The main task of this component is to prepare all data for its child components.

To continue, go to the component directory `task-view`:
```bash
$ cd /home/alexey/ws_ts3/crm-simple1/projects/app-task/src/app/task-view/
```
Next, we create a component to display the title.

Create module and component `t-v-header`:
```bash
$ npx ng generate module t-v-header
$ npx ng generate component t-v-header --export=true
```
Let's implement the `t-v-header` header component in the same way as the` t-l-header` component described above. And add a link to be able to return to the list of tasks.

### Creation of a middle part for displaying task properties.

Create a component to display the middle section `t-v-middle`.

Create module and component `t-v-middle`:
```bash
$ npx ng generate module t-v-middle
$ npx ng generate component t-v-middle --export=true
```
Let's add a display of the properties of the current task to this component.

You can now uninstall the add-on navigation component as it is no longer used _/projects/app-task/src/app/nav/_.

Let's run and check how the additional application works `app-client`:
```bash
$ npx ng serve --port 4250
```
And check the display of the list of tasks in the browser by the link: [http://localhost:4250/app-task/list](http://localhost:4250/app-task/list)

![alt](https://github.com/alx-melnichuk/crm-simple2/blob/master/img2-task-list.png)

And check the display of task properties by reference in the browser: [http://localhost:4250/app-task/view/1](http://localhost:4250/app-task/view/1)

![alt](https://github.com/alx-melnichuk/crm-simple2/blob/master/img2-task-view.png)

The output is an application that consists of two unrelated additional applications:
- on working with clients `app-client`;
- for working with tasks `app-task`;

Each additional application has its own assets that do not overlap with each other.

Source code can be downloaded [github-crm-simple2](https://github.com/alx-melnichuk/crm-simple2). (Run `npm install` before running the application.)

You can launch the project on the StackBlitz website by following the link [https://stackblitz.com/github/alx-melnichuk/crm-simple2](https://stackblitz.com/github/alx-melnichuk/crm-simple2)

When starting a project on the StackBlitz website in the _Google Chrome_ browser version 84, an error occurred:
```
ERROR: Cross-origin localStorage blocked by browser but required for devserver.
Please enable 3rd party cookies or add an exception for stackblitz.io to resolve.
```
The solution is described in the article: [https://github.com/stackblitz/core/issues/162](https://github.com/stackblitz/core/issues/162)
In order not to include the 3rd batch of cookies around the world, you can add to exceptions _stackblitz.io_:
```
-> chrome://settings/content/cookies
-> Allow -> Add:
[*.]stackblitz.io
```

### Analysis of the obtained result

As a result of the work done, we have the following conclusions:

- the resources of all additional applications must be copied to the resources directory of the main application (implemented through the `angular.json` settings);
- all resource files of the additional application must have an additional subdirectory. For example, the name of the additional application (`/assets/<name-application>/`). This will avoid conflicts with other secondary applications when building into the resource directory of the main application.
- in the component that is associated with the route, the data (from the route and other sources) is defined and passed to the child components through the input parameters;


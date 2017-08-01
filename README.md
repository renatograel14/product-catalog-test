# Pull request from Renato Grael Teixeira
 
 ## First Task
 - Check Storage-designs.txt file;

 ## Second Taks
 -Developed in Node.js
 -DockerFile available
 -run: npm i && npm start
 
 - routes 
 - - get-> '/wms' - Read all data
 - - post-> '/wms' - Input data (object or array)

## Third Task
- Check failure-solution.txt

# Case Study Tech

- You don't have a lock in time to finish, but we know how long it takes to be
  done, so use your good sense.
- Your answers can be in English or Portuguese, whatever you prefer.
- All non-human help is allowed. You can use the Internet and any site and
  tools you want. If you have questions about the tasks please don't hesitate to
  ask!
- Visit the case study on [GitHub](https://github.com/dafiti/product-catalog-test)
- Create a fork for this repository git@github.com:dafiti/product-catalog-test.git
  and clone it.
- Solve the tasks as described.
- After you finished, please create a Pull Request for the master branch at
  git@github.com:dafiti/product-catalog-test.git

## Your tools
- Editor/IDE
- Git client

## The project
Product Catalog

### Description
You and your team have the task to design and build a new product catalog for
the Dafiti E-Commerce platform.

## Your tasks
1. Design two alternative Storage solutions and describe advantages and
   drawbacks of either approach. Think about high number of concurrent requests
   (moderate write, heavily read). It can be different database strucutures or
   even completly different database products (only requirement is it needs to
   be opensource)

*How to present your solution:* Show us what your database design: might be
 SQL files, JSON schemas, or a text file explaining your intents.


2. Write a filter and a validation for the input data of the WMS (service as
   described below, take care of the specification). You can use a language of
   your choice, no pseudo-code is allowed, no framework must be used.
   Note: We should be somehow able to execute the solution (e.g. run script,
   executable, unit test, etc.).

*How to present your solution:* WRITE CODE IN WHATEVER LANGUAGE YOU WANT
 (REMEMBER: WE NEED TO BE ABLE TO RUN THE CODE, SO PLEASE TELL US HOW, E.G.
 IN A SEPARATE MARKDOWN FILE - OR IF YOUR ARE CUTTING EDGE PROVIDE A DOCKER
 FILE WHICH WORKS OUT-OF-THE-BOX)


3. Describe or implement a solution to handle temporary and permanent failure
   of the involved webservices (language of choice, pseudo-code allowed,
   external tools or frameworks allowed). As the time might be already tight,
   at least sketch out some ideas.

*How to present your solution:* You may write real code, or you could write
 pseudo-code, though. You could also just write some ideas and concepts on a
 piece of paper (please don't take this seriously and use a text editor and
 save as mark down or text format - hand written letters can be hard to read :p )
 or create some fancy diagrams for your solution.
 In the end: we need to be able to understand what's going on.

## Technical Details
There are a couple of backend webservices involved. You don't need to care about
how the data is requested (e.g. REST, Thrift or something else). For our purpose
we will use a simple JSON file as input data to validate your implementation.
Use [this file](wms_product_data.json) for example data.
To avoid confusion we added [this diagram](product_catalog_test.png) showing the
relations between the services.

### WMS webservice (warehouse management system)
- async possible
- data can be imported
- it is likely that new attributes will be added)
- will always send a batch between 0 and N products which has been changed or
  added in the WMS since the last call (delta)

```
Input Parameters: <NONE>
Output:
0..n
    sku -> required, String
    price -> required, Double (Int can be converted to Double)
    name -> required, String
    description-> required, String
    size -> required, Mixed (return value can be an array list or single value)
    brand -> required, String
    categories -> required, Array
    product_image_url -> required, String, valid URL, valid image extension (jpg, jpeg, png, gif), http as protocol can be prepended if domain is valid
    special_price -> optional, Double (Int can be converted to Double)
```


### Stock webservice
- realtime
- required

```
Input Parameters:
    sku -> String
    size -> String
Output:
0..1
    quantity -> Int
    warehouse -> String
```

### CMS webservice
- async possible
- cachable
- acceptable to go without
- there is a default placeholder text if not available

```
Input Parameters:
    sku -> String|category -> string
Output:
0..n
    content -> String
    region -> String
```


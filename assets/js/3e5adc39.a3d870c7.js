"use strict";(self.webpackChunksample_website=self.webpackChunksample_website||[]).push([[6426],{5680:(e,n,a)=>{a.d(n,{xA:()=>s,yg:()=>y});var t=a(6540);function o(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function i(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function l(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?i(Object(a),!0).forEach((function(n){o(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function r(e,n){if(null==e)return{};var a,t,o=function(e,n){if(null==e)return{};var a,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(o[a]=e[a]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var p=t.createContext({}),g=function(e){var n=t.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):l(l({},n),e)),a},s=function(e){var n=g(e.components);return t.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var a=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,s=r(e,["components","mdxType","originalType","parentName"]),u=g(a),m=o,y=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return a?t.createElement(y,l(l({ref:n},s),{},{components:a})):t.createElement(y,l({ref:n},s))}));function y(e,n){var a=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=a.length,l=new Array(i);l[0]=m;var r={};for(var p in n)hasOwnProperty.call(n,p)&&(r[p]=n[p]);r.originalType=e,r[u]="string"==typeof e?e:o,l[1]=r;for(var g=2;g<i;g++)l[g]=a[g];return t.createElement.apply(null,l)}return t.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7197:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>g});var t=a(8168),o=(a(6540),a(5680));const i={layout:"post",title:"Exploring MongoDB and mongosh in Bash",subtitle:"Associate developer MongoDB C# certificate exam",date:new Date("2024-01-01T12:00:00.000Z"),author:"Truong Nhon",hidden:!1,published:!0,catalog:!0,lang:"en",tags:["mongodb","database"]},l=void 0,r={permalink:"/2024/1/1/Exploring-MongoDB-and-mongosh-in-Bash-Senior-note",editUrl:"https://github.com/nhonvo/nhonvo.github.io/edit/main/blog/blog/2024-1-1-Exploring-MongoDB-and-mongosh-in-Bash-Senior-note.md",source:"@site/blog/2024-1-1-Exploring-MongoDB-and-mongosh-in-Bash-Senior-note.md",title:"Exploring MongoDB and mongosh in Bash",description:"Are you ready to dive into the world of MongoDB and its powerful shell, mongosh? Let's begin our journey by learning how to install mongosh.",date:"2024-01-01T12:00:00.000Z",formattedDate:"January 1, 2024",tags:[{label:"mongodb",permalink:"/tags/mongodb"},{label:"database",permalink:"/tags/database"}],readingTime:5.08,hasTruncateMarker:!1,authors:[{name:"Truong Nhon"}],frontMatter:{layout:"post",title:"Exploring MongoDB and mongosh in Bash",subtitle:"Associate developer MongoDB C# certificate exam",date:"2024-01-01T12:00:00.000Z",author:"Truong Nhon",hidden:!1,published:!0,catalog:!0,lang:"en",tags:["mongodb","database"]},prevItem:{title:"Entity framework core",permalink:"/2024/1/18/EF-core"},nextItem:{title:"Gitflow and github flow",permalink:"/2023/12/31/gitflow-and-githubflow"}},p={authorsImageUrls:[void 0]},g=[{value:"MongoDB Node.js Driver - Connection String Options",id:"mongodb-nodejs-driver---connection-string-options",level:2},{value:"MongoDB Data Types - BSON Types",id:"mongodb-data-types---bson-types",level:2},{value:"Querying MongoDB",id:"querying-mongodb",level:3},{value:"Working with Documents - Insert, Update, and Delete",id:"working-with-documents---insert-update-and-delete",level:3},{value:"MongoDB Indexing",id:"mongodb-indexing",level:3},{value:"MongoDB Aggregation Framework",id:"mongodb-aggregation-framework",level:3},{value:"Full Text Search in MongoDB",id:"full-text-search-in-mongodb",level:3},{value:"Static Search",id:"static-search",level:2},{value:"Tokenization and Fuzzy Options",id:"tokenization-and-fuzzy-options",level:2},{value:"MongoDB Transactions",id:"mongodb-transactions",level:2},{value:"MongoDB Sharding and Replica Set",id:"mongodb-sharding-and-replica-set",level:2},{value:"Sharding",id:"sharding",level:3},{value:"Replica Set",id:"replica-set",level:3},{value:"MongoDB Best Practices",id:"mongodb-best-practices",level:2},{value:"Data Model Patterns",id:"data-model-patterns",level:3},{value:"Capped Collection",id:"capped-collection",level:3},{value:"Read and Write Concern",id:"read-and-write-concern",level:3},{value:"MongoDB Views",id:"mongodb-views",level:2},{value:"MongoDB Administration and Tools",id:"mongodb-administration-and-tools",level:2},{value:"mongorestore",id:"mongorestore",level:3},{value:"Cursor Method and Indexing",id:"cursor-method-and-indexing",level:3},{value:"MongoDB Security",id:"mongodb-security",level:2},{value:"Conclusion",id:"conclusion",level:2}],s={toc:g},u="wrapper";function d(e){let{components:n,...a}=e;return(0,o.yg)(u,(0,t.A)({},s,a,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"Are you ready to dive into the world of MongoDB and its powerful shell, mongosh? Let's begin our journey by learning how to install mongosh."),(0,o.yg)("h2",{id:"mongodb-nodejs-driver---connection-string-options"},"MongoDB Node.js Driver - Connection String Options"),(0,o.yg)("p",null,"MongoDB supports various connection string options, including:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"MaxPoolSize"),(0,o.yg)("li",{parentName:"ul"},"MinPoolSize"),(0,o.yg)("li",{parentName:"ul"},"maxIdleTimeMS")),(0,o.yg)("h2",{id:"mongodb-data-types---bson-types"},"MongoDB Data Types - BSON Types"),(0,o.yg)("p",null,"MongoDB uses BSON types to represent data. Here are some key BSON types:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Double: MongoDB uses Double; there is no Float."),(0,o.yg)("li",{parentName:"ul"},"String"),(0,o.yg)("li",{parentName:"ul"},"Object"),(0,o.yg)("li",{parentName:"ul"},"32-Integer"),(0,o.yg)("li",{parentName:"ul"},"64-Integer"),(0,o.yg)("li",{parentName:"ul"},"ObjectId"),(0,o.yg)("li",{parentName:"ul"},"Boolean"),(0,o.yg)("li",{parentName:"ul"},"Date"),(0,o.yg)("li",{parentName:"ul"},"Timestamp"),(0,o.yg)("li",{parentName:"ul"},"Decimal128"),(0,o.yg)("li",{parentName:"ul"},"Array")),(0,o.yg)("p",null,"Data types ObjectId init from timestamp, increment, machineId, randomNumber"),(0,o.yg)("h3",{id:"querying-mongodb"},"Querying MongoDB"),(0,o.yg)("p",null,"MongoDB provides powerful querying capabilities. Let's explore some query operations:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.findOne(query, options)"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.find().project().sort().skip().limit().count()")))),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Comparison: The following operators can be used in queries to compare values: ",(0,o.yg)("inlineCode",{parentName:"li"},"{field:{operator:value}}"),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},"$eq: Values are equal"),(0,o.yg)("li",{parentName:"ul"},"$ne: Values are not equal"),(0,o.yg)("li",{parentName:"ul"},"$gt: Value is greater than another value"),(0,o.yg)("li",{parentName:"ul"},"$gte: Value is greater than or equal to another value"),(0,o.yg)("li",{parentName:"ul"},"$lt: Value is less than another value"),(0,o.yg)("li",{parentName:"ul"},"$lte: Value is less than or equal to another value"),(0,o.yg)("li",{parentName:"ul"},"$in: Value is matched within an array ",(0,o.yg)("inlineCode",{parentName:"li"},'{"salary":{$in:[5,10]}}')),(0,o.yg)("li",{parentName:"ul"},"$nin: Value not in"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$all"),": find in an array all elements matching in finding ","['Smartphones', 'iOS']")))),(0,o.yg)("p",null,"Eg: ",(0,o.yg)("inlineCode",{parentName:"p"},'db.trips.find({"id":{$in:[1,20]}})')),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Logical: The following operators can logically compare multiple queries. ",(0,o.yg)("inlineCode",{parentName:"li"},"operator:[{condition1},{condition2},..]"),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},"$and: Returns documents where both queries match"),(0,o.yg)("li",{parentName:"ul"},"$or: Returns documents where either query matches"),(0,o.yg)("li",{parentName:"ul"},"$nor: Returns documents where both queries fail to match"),(0,o.yg)("li",{parentName:"ul"},"$not: Returns documents where the query does not match")))),(0,o.yg)("p",null,"Eg: ",(0,o.yg)("inlineCode",{parentName:"p"},'db.trips.find({$or:["id":{$gt:10},"price":{$lt:19}]})')),(0,o.yg)("p",null,"Evaluation: The following operators assist in evaluating documents."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"$regex: Allows the use of regular expressions when evaluating field values")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"$text: Performs a text search")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"$where: Uses a JavaScript expression to match documents")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"$expr"),": ",(0,o.yg)("inlineCode",{parentName:"p"},"$expr: {operator:[field, value]}"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"$elemMatch"),": find an object in an array of objects only, cannot find in a field ot an array")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"$size"),": find the number of elements in an array ",(0,o.yg)("inlineCode",{parentName:"p"},"{$scores: {$size: 6}}")))),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.find().count()"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.countDocuments()"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.aggregate()")),(0,o.yg)("ol",{parentName:"li"},(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("inlineCode",{parentName:"li"},"[{$match:{}}, {$group:{}}, {$sort: {}}, {$skip: 10}, {$limit}]")),(0,o.yg)("li",{parentName:"ol"},"Group: total, average"),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("inlineCode",{parentName:"li"},"Var pipeline = [state1, state2, state3]")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("inlineCode",{parentName:"li"},'{$count: "total"}')))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.listIndexes()"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.countDocuments(query)"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"FindAndModify(query:{}, update: {}, {new: true})"),": new = true: return a modified document")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Expression: ",(0,o.yg)("inlineCode",{parentName:"p"},'db.movies.find({$expr:{$gt: ["$idbm.votes", "$year"]}})'))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},'Db.products.find("name":"Smartphone").count();')))),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},'{\n  "customer.gender": "M",\n  items: {\n    $elemMatch: {\n      name: \'printer paper\'\n    }\n  }\n}\n')),(0,o.yg)("h3",{id:"working-with-documents---insert-update-and-delete"},"Working with Documents - Insert, Update, and Delete"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Inserting Documents")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.insertOne(document, option)"),': Option = { writeConcern: { w : "majority", wtimeout : 100 } }')),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Db.insert({}, {returnId: true})"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Db.insert([])"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.insertMany()"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Updating Documents")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.updateOne(filter, update, option)")),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},"Filter = query"),(0,o.yg)("li",{parentName:"ul"},"Update = ",(0,o.yg)("inlineCode",{parentName:"li"},"{$set: {}} or {$inc: {balance: 1000}}")),(0,o.yg)("li",{parentName:"ul"},"Update = ",(0,o.yg)("inlineCode",{parentName:"li"},"{$push: {readings: {v: 10, t: new Date()}}}")),(0,o.yg)("li",{parentName:"ul"},"Option = ",(0,o.yg)("inlineCode",{parentName:"li"},"{upsert: true}")," upsert not $upsert"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.update()"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"Collection.updateMany()"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},'await salesCollection.updateMany({items: {$elemMatch: {name: "printer paper"}}},{$set: {"items.$.price": 20 }});'))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Deleting Documents")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"deleteMany(query)"),": If the query = {} delete all documents in the collection")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"deleteOne()"),": return ",(0,o.yg)("inlineCode",{parentName:"p"},"({acknowledge:true, deleteCount: 1})"))),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"deleteMany().deletedCount")))),(0,o.yg)("h3",{id:"mongodb-indexing"},"MongoDB Indexing"),(0,o.yg)("p",null,"MongoDB offers various indexing options to optimize query performance:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Single Index")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Compound Index")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"MultiKey Index")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Unique Index vs Non-Unique Index")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Sparse Index vs Non-Sparse Index")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Geography index: ",(0,o.yg)("inlineCode",{parentName:"p"},"createIndex({locationField:'2dsphere'})")),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},"Example Query: You can perform geospatial queries using operators like $near, $geoWithin, $geoIntersects, and others to find documents based on their geographical proximity or containment.")))),(0,o.yg)("h3",{id:"mongodb-aggregation-framework"},"MongoDB Aggregation Framework"),(0,o.yg)("p",null,"MongoDB's Aggregation Framework is a powerful tool for data transformation and analysis. Let's explore some aggregation stages:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$match")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$addFields")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$group")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$sample"),": {size: 10} get random 10 documents"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$project: {total_avg: $round {number, place}}")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},'$sortByCount: "$city"')," => descending = $group $sort descending"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$lookup:{from: , localField:, foreignField, as:}")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},"$out"),": to another collection must be in the same database => Last stage only"),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},'$bucketAuto :{groupBy: "$tripduration", buckets:5, output: {}}')),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("inlineCode",{parentName:"li"},'$bucket: {groupBy:"$tripduration",boundaries: [10,100,1000,1000,100000], default: "other", output}'))),(0,o.yg)("h3",{id:"full-text-search-in-mongodb"},"Full Text Search in MongoDB"),(0,o.yg)("p",null,"MongoDB supports full-text search with various options for tokenization and fuzzy searching."),(0,o.yg)("h2",{id:"static-search"},"Static Search"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "mappings": {\n    "dynamic": false,\n    "fields": {\n      "company": {\n        "type": "string"\n      },\n      "title": {\n        "type": "string"\n      }\n    }\n  }\n}\n')),(0,o.yg)("h2",{id:"tokenization-and-fuzzy-options"},"Tokenization and Fuzzy Options"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"EdgeGram beginning of the word"),(0,o.yg)("li",{parentName:"ul"},"rightEdgeGram"),(0,o.yg)("li",{parentName:"ul"},"nGram")),(0,o.yg)("p",null,"Fuzzy option:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"maxEdits"),(0,o.yg)("li",{parentName:"ul"},"MaxExpansions"),(0,o.yg)("li",{parentName:"ul"},"prefixLength")),(0,o.yg)("h2",{id:"mongodb-transactions"},"MongoDB Transactions"),(0,o.yg)("p",null,"MongoDB provides support for transactions, ensuring data consistency in complex operations."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},"// Transaction\nSession startSession()\nUpdateOne({}, {$inc: {balance: -30}})\nCommitTransaction\nAbortTransaction\n")),(0,o.yg)("h2",{id:"mongodb-sharding-and-replica-set"},"MongoDB Sharding and Replica Set"),(0,o.yg)("p",null,"Sharding and Replica Set are essential concepts for scaling and ensuring high availability in MongoDB."),(0,o.yg)("h3",{id:"sharding"},"Sharding"),(0,o.yg)("p",null,"Sharding distributes data across multiple servers to improve read and write scalability."),(0,o.yg)("h3",{id:"replica-set"},"Replica Set"),(0,o.yg)("p",null,"A Replica Set consists of multiple nodes with one primary node and two replicate nodes."),(0,o.yg)("h2",{id:"mongodb-best-practices"},"MongoDB Best Practices"),(0,o.yg)("p",null,"MongoDB offers various best practices and considerations for efficient data modeling and management."),(0,o.yg)("h3",{id:"data-model-patterns"},"Data Model Patterns"),(0,o.yg)("p",null,"There are 12 data model patterns, including Computed Pattern, Attribute Pattern, Polymorphic pattern, Bucket, Outline, and others."),(0,o.yg)("h3",{id:"capped-collection"},"Capped Collection"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},'db.createCollection("", {capped: true, size: 10, max: 3})\n')),(0,o.yg)("p",null,"Capped collection has a Limit size."),(0,o.yg)("h3",{id:"read-and-write-concern"},"Read and Write Concern"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Read Concern: Available, Majority, Local"),(0,o.yg)("li",{parentName:"ul"},"Write Concern: Majority")),(0,o.yg)("h2",{id:"mongodb-views"},"MongoDB Views"),(0,o.yg)("p",null,"Creating and working with views in MongoDB:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},'Db.createView("view_name","source_collection",[pipeline],collation)\nDb.createView("name", "source", [])\n')),(0,o.yg)("p",null,"Cannot update to view."),(0,o.yg)("h2",{id:"mongodb-administration-and-tools"},"MongoDB Administration and Tools"),(0,o.yg)("p",null,"MongoDB provides tools and commands for administrative tasks, backup, and restore."),(0,o.yg)("h3",{id:"mongorestore"},"mongorestore"),(0,o.yg)("p",null,"Use ",(0,o.yg)("inlineCode",{parentName:"p"},"mongorestore")," to restore a dump file to MongoDB."),(0,o.yg)("h3",{id:"cursor-method-and-indexing"},"Cursor Method and Indexing"),(0,o.yg)("p",null,"Choose the appropriate cursor method, like ",(0,o.yg)("inlineCode",{parentName:"p"},"Cursor.hint()"),", to force MongoDB to use a specific index for a query."),(0,o.yg)("h2",{id:"mongodb-security"},"MongoDB Security"),(0,o.yg)("p",null,'Ensure the security of your MongoDB instance by understanding the importance of the "admin" database and controlling user access.'),(0,o.yg)("h2",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,"In conclusion, MongoDB offers a robust and flexible database solution with a wide range of features for efficient data management and querying. Understanding the various concepts and best practices will empower you to make the most out of MongoDB in your projects. Happy coding!"))}d.isMDXComponent=!0}}]);
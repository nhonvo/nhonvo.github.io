"use strict";(self.webpackChunksample_website=self.webpackChunksample_website||[]).push([[1290],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>h});var a=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=a.createContext({}),s=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=s(e.components);return a.createElement(c.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),d=s(t),g=o,h=d["".concat(c,".").concat(g)]||d[g]||p[g]||i;return t?a.createElement(h,l(l({ref:n},u),{},{components:t})):a.createElement(h,l({ref:n},u))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,l=new Array(i);l[0]=g;var r={};for(var c in n)hasOwnProperty.call(n,c)&&(r[c]=n[c]);r.originalType=e,r[d]="string"==typeof e?e:o,l[1]=r;for(var s=2;s<i;s++)l[s]=t[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},1384:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>s});var a=t(8168),o=(t(6540),t(5680));const i={layout:"post",title:"Mongo with csharp",subtitle:"Associate developer MongoDB csharp certificate exam",date:new Date("2024-03-01T00:00:00.000Z"),author:"Truong Nhon",published:!0,catalog:!0,tags:["mongodb","c#"]},l=void 0,r={permalink:"/2024/3/1/mongo-with-csharp",editUrl:"https://github.com/nhonvo/nhonvo.github.io/edit/main/blog/blog/2024-3-1-mongo-with-csharp.md",source:"@site/blog/2024-3-1-mongo-with-csharp.md",title:"Mongo with csharp",description:"Working with MongoDB Documents in Csharp",date:"2024-03-01T00:00:00.000Z",formattedDate:"March 1, 2024",tags:[{label:"mongodb",permalink:"/tags/mongodb"},{label:"c#",permalink:"/tags/c"}],readingTime:10.52,hasTruncateMarker:!0,authors:[{name:"Truong Nhon"}],frontMatter:{layout:"post",title:"Mongo with csharp",subtitle:"Associate developer MongoDB csharp certificate exam",date:"2024-03-01T00:00:00.000Z",author:"Truong Nhon",published:!0,catalog:!0,tags:["mongodb","c#"]},prevItem:{title:"net 8 and c# 12 big change",permalink:"/2024/4/12/net-8"},nextItem:{title:"Data structure and algorithms",permalink:"/2024/2/28/data-structure-and-algorithms"}},c={authorsImageUrls:[void 0]},s=[{value:"Working with MongoDB Documents in Csharp",id:"working-with-mongodb-documents-in-csharp",level:2},{value:"BsonDocument",id:"bsondocument",level:3},{value:"Csharp Class (POCOs)",id:"csharp-class-pocos",level:3},{value:"Using MongoDB Aggregation Stages with Csharp: <code>Match</code> and <code>Group</code>",id:"using-mongodb-aggregation-stages-with-csharp-match-and-group",level:2},{value:"Match by Using Csharp Class",id:"match-by-using-csharp-class",level:3},{value:"Match by Using <code>BsonDocument</code>",id:"match-by-using-bsondocument",level:3},{value:"<code>Group</code> Stage",id:"group-stage",level:3},{value:"Querying a MongoDB Collection in Csharp Applications",id:"querying-a-mongodb-collection-in-csharp-applications",level:2},{value:"Find a Document with <code>FirstOrDefault</code>",id:"find-a-document-with-firstordefault",level:3},{value:"Find a Document with <code>FindAsync</code> and <code>FirstOrDefault</code>",id:"find-a-document-with-findasync-and-firstordefault",level:3},{value:"Find a Document with <code>ToList</code>",id:"find-a-document-with-tolist",level:3},{value:"Find a Document with Multiple LINQ Methods",id:"find-a-document-with-multiple-linq-methods",level:3},{value:"Find a Document with the <code>Builders</code> Class",id:"find-a-document-with-the-builders-class",level:3},{value:"Lesson 4: Updating Documents in Csharp Applications / Learn",id:"lesson-4-updating-documents-in-csharp-applications--learn",level:4},{value:"Updating Documents in Csharp Applications",id:"updating-documents-in-csharp-applications",level:2},{value:"Update a Single Document",id:"update-a-single-document",level:3},{value:"Update a Single Document Asynchronously",id:"update-a-single-document-asynchronously",level:3},{value:"Update Multiple Documents",id:"update-multiple-documents",level:3},{value:"Update Multiple Documents Asynchronously",id:"update-multiple-documents-asynchronously",level:3},{value:"Deleting Documents in Csharp Applications",id:"deleting-documents-in-csharp-applications",level:2},{value:"Delete a Single Document",id:"delete-a-single-document",level:3},{value:"Delete a Single Document Asynchronously",id:"delete-a-single-document-asynchronously",level:3},{value:"Delete Multiple Documents",id:"delete-multiple-documents",level:3},{value:"Delete Multiple Documents Asynchronously",id:"delete-multiple-documents-asynchronously",level:3},{value:"Creating MongoDB Transactions in Csharp Applications",id:"creating-mongodb-transactions-in-csharp-applications",level:2},{value:"Multi-Document Transaction",id:"multi-document-transaction",level:3},{value:"Using MongoDB Aggregation Stages with Csharp: <code>Sort</code> and <code>Project</code>",id:"using-mongodb-aggregation-stages-with-csharp-sort-and-project",level:2},{value:"<code>Sort</code> Stage",id:"sort-stage",level:3},{value:"Sort by Using <code>BsonDocument</code>",id:"sort-by-using-bsondocument",level:4},{value:"<code>Project</code> Stage",id:"project-stage",level:3},{value:"Sample",id:"sample",level:3},{value:"MongoDB Aggregation with Csharp",id:"mongodb-aggregation-with-csharp",level:2},{value:"Resources",id:"resources",level:3}],u={toc:s},d="wrapper";function p(e){let{components:n,...t}=e;return(0,o.yg)(d,(0,a.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h2",{id:"working-with-mongodb-documents-in-csharp"},"Working with MongoDB Documents in Csharp"),(0,o.yg)("p",null,"Review the following code, which demonstrates how to represent a document in Csharp."),(0,o.yg)("h3",{id:"bsondocument"},"BsonDocument"),(0,o.yg)("p",null,"Use ",(0,o.yg)("inlineCode",{parentName:"p"},"MongoDB.Bson")," to represent a document with ",(0,o.yg)("inlineCode",{parentName:"p"},"BsonDocument"),". Here's an example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'using MongoDB.Bson;\n\nvar document = new BsonDocument\n{\n   { "account_id", "MDB829001337" },\n   { "account_holder", "Linus Torvalds" },\n   { "account_type", "checking" },\n   { "balance", 50352434 }\n};\n')),(0,o.yg)("h3",{id:"csharp-class-pocos"},"Csharp Class (POCOs)"),(0,o.yg)("p",null,"Each public property maps to a field in the BSON document."),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"The ",(0,o.yg)("inlineCode",{parentName:"li"},"BsonId")," attribute specifies a field that must always be unique."),(0,o.yg)("li",{parentName:"ul"},"The ",(0,o.yg)("inlineCode",{parentName:"li"},"BsonRepresentation")," attribute maps a Csharp type to a specific BSON type."),(0,o.yg)("li",{parentName:"ul"},"The ",(0,o.yg)("inlineCode",{parentName:"li"},"BsonElement")," attribute maps to the BSON field name.")),(0,o.yg)("p",null,"Here's an example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'internal class Account\n{\n   [BsonId]\n   [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]     \n   public string Id { get; set; }\n     \n   [BsonElement("account_id")]\n   public string AccountId { get; set; }\n\n   [BsonElement("account_holder")]\n   public string AccountHolder { get; set; }\n\n   [BsonElement("account_type")]\n   public string AccountType { get; set; } \n\n   [BsonRepresentation(BsonType.Decimal128)]\n   [BsonElement("balance")]\n   public decimal Balance { get; set; }\n\n   [BsonElement("transfers_complete")]\n   public string[] TransfersCompleted { get; set; }    \n}\n')),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"using-mongodb-aggregation-stages-with-csharp-match-and-group"},"Using MongoDB Aggregation Stages with Csharp: ",(0,o.yg)("inlineCode",{parentName:"h2"},"Match")," and ",(0,o.yg)("inlineCode",{parentName:"h2"},"Group")),(0,o.yg)("p",null,"Review the following code, which demonstrates how to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"Match")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"Group")," aggregation methods in MongoDB."),(0,o.yg)("h3",{id:"match-by-using-csharp-class"},"Match by Using Csharp Class"),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"Match")," filters documents that match the specified conditions and passes them to the next stage of the pipeline. In following code, we request all documents where the ",(0,o.yg)("inlineCode",{parentName:"p"},"Balance")," field has a value that's less than or equal to 1000. We can view the results by casting the ",(0,o.yg)("inlineCode",{parentName:"p"},"aggregate")," object to a list."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},"var matchStage = Builders<Accounts>.Filter.Lte(u => u.Balance, 1000);\nvar aggregate = accountsCollection.Aggregate()\n                          .Match(matchStage);\nvar results = aggregate.ToList();\n\nforeach (var account in results)\n{\n    Console.WriteLine(account.Balance);\n}\n")),(0,o.yg)("h3",{id:"match-by-using-bsondocument"},"Match by Using ",(0,o.yg)("inlineCode",{parentName:"h3"},"BsonDocument")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"Match")," filters documents that match the specified conditions to the next stage of the pipeline. When you're working with BsonDocuments, the process is identical, except that we use a builder of type ",(0,o.yg)("inlineCode",{parentName:"p"},"BsonDocument"),". Also, we can\u2019t use LINQ to define the properties that we want to filter on. Here's an example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var matchStage = Builders<BsonDocument>.Filter.Lte("balance", 1000);\nvar aggregate = accountsCollection.Aggregate()\n                          .Match(matchStage);\nvar results = aggregate.ToList();\n\nforeach (var account in results)\n{\n    Console.WriteLine(account.Balance);\n}\n')),(0,o.yg)("h3",{id:"group-stage"},(0,o.yg)("inlineCode",{parentName:"h3"},"Group")," Stage"),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"Group")," stage separates documents into groups according to a group key. The output of this stage is one document for each unique group key. In the following code, we use a LINQ expression and create a new generic object with the fields we want. We keep the same names for the first three properties: ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountId"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountType"),", and ",(0,o.yg)("inlineCode",{parentName:"p"},"Balance"),". We also create a new field called ",(0,o.yg)("inlineCode",{parentName:"p"},"GBP"),", which is calculated by dividing the current ",(0,o.yg)("inlineCode",{parentName:"p"},"Balance")," field by 1.3."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var matchStage = Builders<BsonDocument>.Filter.Lte("balance", 1000);\nvar aggregate = accountCollection.Aggregate()\n   .Match(matchStage)\n   .Group(\n       a => a.AccountType,\n       r => new\n       {\n           accountType = r.Key,\n           total = r.Sum(a => 1)\n       }\n   );\n\nvar results = aggregate.ToList();\n\nforeach (var account in results)\n{\n    Console.WriteLine(account.Balance);\n}\n')),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"querying-a-mongodb-collection-in-csharp-applications"},"Querying a MongoDB Collection in Csharp Applications"),(0,o.yg)("p",null,"Review the following code, which demonstrates how to query documents in MongoDB with Csharp."),(0,o.yg)("h3",{id:"find-a-document-with-firstordefault"},"Find a Document with ",(0,o.yg)("inlineCode",{parentName:"h3"},"FirstOrDefault")),(0,o.yg)("p",null,"In the following example, the ",(0,o.yg)("inlineCode",{parentName:"p"},"Find()")," command with a LINQ expression matches the ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountID")," field. The ",(0,o.yg)("inlineCode",{parentName:"p"},"FirstOrDefault()")," method returns the first or default result."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var account = accountsCollection\n   .Find(a => a.AccountId == "MDB829001337")\n   .FirstOrDefault();\n')),(0,o.yg)("h3",{id:"find-a-document-with-findasync-and-firstordefault"},"Find a Document with ",(0,o.yg)("inlineCode",{parentName:"h3"},"FindAsync")," and ",(0,o.yg)("inlineCode",{parentName:"h3"},"FirstOrDefault")),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"FindAsync()")," command with a LINQ expression matches the ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountID")," field. The ",(0,o.yg)("inlineCode",{parentName:"p"},"FirstOrDefault()")," method returns the first or default result. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var accounts = await accountsCollection\n   .FindAsync(a => a.AccountId == "MDB829001337");\n\nvar account = accounts.FirstOrDefault();\n')),(0,o.yg)("h3",{id:"find-a-document-with-tolist"},"Find a Document with ",(0,o.yg)("inlineCode",{parentName:"h3"},"ToList")),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"Find()")," command with a LINQ expression matches all documents in the collection. The ",(0,o.yg)("inlineCode",{parentName:"p"},"ToList()")," method returns a list of results. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},"var accounts = accountsCollection.Find(_ => true).ToList();\n")),(0,o.yg)("h3",{id:"find-a-document-with-multiple-linq-methods"},"Find a Document with Multiple LINQ Methods"),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"Find()")," command with a LINQ expression filters documents by ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountType")," (in this case, \u201cchecking\u201d), sorts the results in descending order by the ",(0,o.yg)("inlineCode",{parentName:"p"},"Balance"),", skips the first 5 results, and returns only 20 documents due to the limit."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'accountsCollection\n   .Find(a => a.AccountType == "checking")\n   .SortByDescending(a => a.Balance)\n   .Skip(5)\n   .Limit(20);\n')),(0,o.yg)("h3",{id:"find-a-document-with-the-builders-class"},"Find a Document with the ",(0,o.yg)("inlineCode",{parentName:"h3"},"Builders")," Class"),(0,o.yg)("p",null,"Use the ",(0,o.yg)("inlineCode",{parentName:"p"},"Builders")," class to match all documents in the collection with an ",(0,o.yg)("inlineCode",{parentName:"p"},"_id")," field equal to the specified value. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<BsonDocument>\n   .Filter\n   .Eq("_id", new    \n      ObjectId("62d6e04ecab6d8e1304974ae"));\n\nvar document = accountsCollection\n   .Find(filter)\n   .FirstOrDefault();\n')),(0,o.yg)("p",null,"Use the ",(0,o.yg)("inlineCode",{parentName:"p"},"Builders")," class to match all documents in the collection with a ",(0,o.yg)("inlineCode",{parentName:"p"},"balance")," field greater than 1000. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<BsonDocument>\n   .Filter\n   .Gt("balance", 1000);\n\nvar documents = await accountsCollection\n   .FindAsync(filter);\n')),(0,o.yg)("hr",null),(0,o.yg)("h4",{id:"lesson-4-updating-documents-in-csharp-applications--learn"},"Lesson 4: Updating Documents in Csharp Applications / Learn"),(0,o.yg)("h2",{id:"updating-documents-in-csharp-applications"},"Updating Documents in Csharp Applications"),(0,o.yg)("p",null,"Review the following code, which demonstrates how to update documents in MongoDB with Csharp."),(0,o.yg)("h3",{id:"update-a-single-document"},"Update a Single Document"),(0,o.yg)("p",null,"The following example demonstrates how to update a single document. First, create a ",(0,o.yg)("inlineCode",{parentName:"p"},"filter")," definition with the ",(0,o.yg)("inlineCode",{parentName:"p"},".Filter")," method on the ",(0,o.yg)("inlineCode",{parentName:"p"},"Builders")," class, which returns the account with an ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountId")," equal to \u201cMDB951086017\u201d. Next, create an ",(0,o.yg)("inlineCode",{parentName:"p"},"update")," definition that will set the ",(0,o.yg)("inlineCode",{parentName:"p"},"balance")," to ",(0,o.yg)("inlineCode",{parentName:"p"},"5000"),". Finally, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"UpdateOne()")," method to update the document."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<Account>\n   .Filter\n   .Eq(a => a.AccountId, "MDB951086017");\n\nvar update = Builders<Account>\n   .Update\n   .Set(a=>a.Balance, 5000);\n\nvar result = accountCollection.UpdateOne(filter, update);\n\nConsole.WriteLine(result.ModifiedCount);\n')),(0,o.yg)("h3",{id:"update-a-single-document-asynchronously"},"Update a Single Document Asynchronously"),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"UpdateOneAsync()")," command updates a single document in the collection asynchronously. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},"var result = await accountsCollection.UpdateOneAsync(filter, update);\n\nConsole.WriteLine(result.ModifiedCount);\n")),(0,o.yg)("h3",{id:"update-multiple-documents"},"Update Multiple Documents"),(0,o.yg)("p",null,"Use the ",(0,o.yg)("inlineCode",{parentName:"p"},"UpdateMany()")," method to update multiple documents in a single operation. Just like the ",(0,o.yg)("inlineCode",{parentName:"p"},"UpdateOne()")," method, the ",(0,o.yg)("inlineCode",{parentName:"p"},"UpdateMany()")," method accepts a query and an update. Here's an example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<Account>\n   .Filter\n   .Eq(a => a.AccountType, "checking");\n\nvar update = Builders<Account>\n   .Update\n   .Inc(a => a.Balance, 5);\n\nvar updateResult = accountCollection\n   .UpdateMany(filter, update);\n\nConsole.WriteLine(updateResult.ModifiedCount);\n')),(0,o.yg)("h3",{id:"update-multiple-documents-asynchronously"},"Update Multiple Documents Asynchronously"),(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"UpdateManyAsync()")," command updates multiple documents in the collection asynchronously. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<BsonDocument>\n   .Filter\n   .Lt("balance", 500);\n\nvar update = Builders<BsonDocument>\n   .Update\n   .Inc("balance", 10);\n\nvar result = await accountsCollection\n   .UpdateManyAsync(filter, update);\n\nConsole.WriteLine(result.ModifiedCount);\n')),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"deleting-documents-in-csharp-applications"},"Deleting Documents in Csharp Applications"),(0,o.yg)("p",null,"Review the following code, which demonstrates how to delete documents in MongoDB with Csharp."),(0,o.yg)("h3",{id:"delete-a-single-document"},"Delete a Single Document"),(0,o.yg)("p",null,"To delete a single document, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"DeleteOne()")," method, which accepts a query filter that matches the document that you want to delete. ",(0,o.yg)("inlineCode",{parentName:"p"},"DeletedCount")," tells you how many documents were found by the filter and were deleted. Here's an example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var accountsCollection = \n  database.GetCollection<Account>("Account");\n\nvar result  = accountsCollection\n   .DeleteOne(a => a.AccountId == "MDB333829449");\n\nConsole.WriteLine(result.DeletedCount);\n')),(0,o.yg)("h3",{id:"delete-a-single-document-asynchronously"},"Delete a Single Document Asynchronously"),(0,o.yg)("p",null,"To delete a single document asynchronously, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"DeleteOneAsync()")," method, which accepts a query filter that matches the document that you want to delete. We use a ",(0,o.yg)("inlineCode",{parentName:"p"},"Builders")," class that matches a document based on the specified ",(0,o.yg)("inlineCode",{parentName:"p"},"_id"),". Async methods can be used with builders or LINQ. Here's an example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<BsonDocument>\n   .Filter\n   .Eq("_id", new    \n      ObjectId("63050518546c1e9d2d16ce4d"));\n\nvar accounts = await accountsCollection\n   .DeleteOneAsync(filter);\n')),(0,o.yg)("h3",{id:"delete-multiple-documents"},"Delete Multiple Documents"),(0,o.yg)("p",null,"To delete multiple documents, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"DeleteMany()")," method, which accepts a query filter that matches the documents that you want to delete. Once the documents are successfully deleted, the method returns an instance of ",(0,o.yg)("inlineCode",{parentName:"p"},"DeleteResult"),", which enables the retrieval of information such as the number of documents that were deleted. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},"var deleteResult = accountCollection\n   .DeleteMany(a => a.Balance < 500);\n\nConsole.WriteLine(result.DeleteCount)\n")),(0,o.yg)("h3",{id:"delete-multiple-documents-asynchronously"},"Delete Multiple Documents Asynchronously"),(0,o.yg)("p",null,"To delete multiple documents asynchronously, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"DeleteMany()")," method, which accepts a query filter that matches the documents that you want to delete. Once the documents are successfully deleted, the method returns an instance of ",(0,o.yg)("inlineCode",{parentName:"p"},"DeleteResult"),", which enables the retrieval of information such as the number of documents that were deleted. We use a ",(0,o.yg)("inlineCode",{parentName:"p"},"Builders")," class that matches a document based on the specified ",(0,o.yg)("inlineCode",{parentName:"p"},"account_type"),". Async methods can be used with builders or LINQ. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var filter = Builders<BsonDocument>\n   .Filter\n   .Eq("account_type", "checking");\n\nvar deleteResult = await accountsCollection\n   .DeleteManyAsync(filter);\n\nConsole.WriteLine(deleteResult.DeletedCount);\n')),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"creating-mongodb-transactions-in-csharp-applications"},"Creating MongoDB Transactions in Csharp Applications"),(0,o.yg)("p",null,"Review the following code, which demonstrates how to create a multi-document transaction in MongoDB with Csharp."),(0,o.yg)("h3",{id:"multi-document-transaction"},"Multi-Document Transaction"),(0,o.yg)("p",null,"The following are the steps and the code to create a multi-document transaction in MongoDB with Csharp. The transaction is started by using the session\u2019s ",(0,o.yg)("inlineCode",{parentName:"p"},"WithTransaction()")," method. Then, we define the sequence of operations to perform inside the transaction. Here are the steps:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Start a new session."),(0,o.yg)("li",{parentName:"ol"},"Begin a transaction with the ",(0,o.yg)("inlineCode",{parentName:"li"},"WithTransaction()")," method on the session."),(0,o.yg)("li",{parentName:"ol"},"Create variables that will be used in the transaction."),(0,o.yg)("li",{parentName:"ol"},"Obtain the user accounts information that will be used in the transaction."),(0,o.yg)("li",{parentName:"ol"},"Create the transfer document."),(0,o.yg)("li",{parentName:"ol"},"Update the user accounts."),(0,o.yg)("li",{parentName:"ol"},"Insert the transfer document."),(0,o.yg)("li",{parentName:"ol"},"Commit the transaction.")),(0,o.yg)("p",null,"Here's the code:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'using (var session = client.StartSession())\n{\n\n    // Define the sequence of operations to perform inside the transactions\n    session.WithTransaction(\n        (s, ct) =>\n        {\n            var fromId = "MDB310054629";\n            var toId = "MDB546986470";\n\n            // Create the transfer_id and amount being transfered\n            var transferId = "TR02081994";\n            var transferAmount = 20;\n\n            // Obtain the account that the money will be coming from\n            var fromAccountResult = accountsCollection.Find(e => e.AccountId == fromId).FirstOrDefault();\n            // Get the balance and id of the account that the money will be coming from\n            var fromAccountBalance = fromAccountResult.Balance - transferAmount;\n            var fromAccountId = fromAccountResult.AccountId;\n\n            Console.WriteLine(fromAccountBalance.GetType());\n\n            // Obtain the account that the money will be going to\n            var toAccountResult = accountsCollection.Find(e => e.AccountId == toId).FirstOrDefault();\n            // Get the balance and id of the account that the money will be going to\n            var toAccountBalance = toAccountResult.Balance + transferAmount;\n            var toAccountId = toAccountResult.AccountId;\n\n            // Create the transfer record\n            var transferDocument = new Transfers\n            {\n                TransferId = transferId,\n                ToAccount = toAccountId,\n                FromAccount = fromAccountId,\n                Amount = transferAmount\n            };\n\n            // Update the balance and transfer array for each account\n            var fromAccountUpdateBalance = Builders<Accounts>.Update.Set("balance", fromAccountBalance);\n            var fromAccountFilter = Builders<Accounts>.Filter.Eq("account_id", fromId);\n            accountsCollection.UpdateOne(fromAccountFilter, fromAccountUpdateBalance);\n\n            var fromAccountUpdateTransfers = Builders<Accounts>.Update.Push("transfers_complete", transferId);\n            accountsCollection.UpdateOne(fromAccountFilter, fromAccountUpdateTransfers);\n\n            var toAccountUpdateBalance = Builders<Accounts>.Update.Set("balance", toAccountBalance);\n            var toAccountFilter = Builders<Accounts>.Filter.Eq("account_id", toId);\n            accountsCollection.UpdateOne(toAccountFilter, toAccountUpdateBalance);\n            var toAccountUpdateTransfers = Builders<Accounts>.Update.Push("transfers_complete", transferId);\n\n            // Insert transfer doc\n            transfersCollection.InsertOne(transferDocument);\n            Console.WriteLine("Transaction complete!");\n            return "Inserted into collections in different databases";\n        });\n}\n')),(0,o.yg)("h2",{id:"using-mongodb-aggregation-stages-with-csharp-sort-and-project"},"Using MongoDB Aggregation Stages with Csharp: ",(0,o.yg)("inlineCode",{parentName:"h2"},"Sort")," and ",(0,o.yg)("inlineCode",{parentName:"h2"},"Project")),(0,o.yg)("p",null,"Review the following code, which demonstrates how to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"Sort")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"Project")," aggregation methods in MongoDB."),(0,o.yg)("h3",{id:"sort-stage"},(0,o.yg)("inlineCode",{parentName:"h3"},"Sort")," Stage"),(0,o.yg)("p",null,"A ",(0,o.yg)("inlineCode",{parentName:"p"},"Sort")," stage sorts all input documents and passes them to the next pipeline stage in the sorted order.This can be a numeric value, strings arranged in alphabetical order, dates, or timestamps. You can define the sort as a LINQ statement within the ",(0,o.yg)("inlineCode",{parentName:"p"},".SortBy()")," or ",(0,o.yg)("inlineCode",{parentName:"p"},".SortByDescending()")," methods. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},"var matchStage = Builders<Accounts>.Filter.Lt(user => user.Balance, 1500);\n\nvar aggregate = accountsCollection.Aggregate()                        \n                    .Match(matchBalanceStage)\n                    .SortByDescending(u => u.Balance):\n\nvar results = aggregate.ToList();\n\nforeach (var account in results)\n{\n    Console.WriteLine(account.Balance);\n}\n")),(0,o.yg)("h4",{id:"sort-by-using-bsondocument"},"Sort by Using ",(0,o.yg)("inlineCode",{parentName:"h4"},"BsonDocument")),(0,o.yg)("p",null,"A ",(0,o.yg)("inlineCode",{parentName:"p"},"Sort")," stage sorts all input documents and passes them to the next pipeline stage in the sorted order. This can be a numeric value, strings arranged in alphabetical order, dates, or timestamps. For example:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-csharp"},'var matchBalanceStage = Builders<BsonDocument>.Filter.Lt("balance", 1500);\nvar sort = Builders<BsonDocument>.Sort.Descending("balance");\n\nvar aggregate = accountsCollection.Aggregate()\n                        .Match(matchBalanceStage)\n                        .Sort(sort);\nvar results = aggregate.ToList();\n\nforeach (var account in results)\n{\n    Console.WriteLine(account.ToString());\n}\n')),(0,o.yg)("h3",{id:"project-stage"},(0,o.yg)("inlineCode",{parentName:"h3"},"Project")," Stage"),(0,o.yg)("p",null,"To create a projection, we use the ",(0,o.yg)("inlineCode",{parentName:"p"},"ProjectionDefinitionBuilder"),". We use the ",(0,o.yg)("inlineCode",{parentName:"p"},"Expression")," method to define the output of the ",(0,o.yg)("inlineCode",{parentName:"p"},"Project")," stage."),(0,o.yg)("p",null,"In the following code, we use a LINQ expression to create a new generic object with the fields we want. We keep the same names for the first three properties: ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountId"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"AccountType"),", and ",(0,o.yg)("inlineCode",{parentName:"p"},"Balance"),". We create a new field called ",(0,o.yg)("inlineCode",{parentName:"p"},"GBP"),", which is calculated by dividing the current ",(0,o.yg)("inlineCode",{parentName:"p"},"Balance")," field by ",(0,o.yg)("inlineCode",{parentName:"p"},"1.3"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-Csharp"},"var matchBalanceStage = Builders<Accounts>.Filter.Lt(user => user.Balance, 1500);\nvar projectStage = Builders<Accounts>.Projection.Expression(u =>\n    new\n    {\n        AccountId = u.AccountId,\n        AccountType = u.AccountType,\n        Balance = u.Balance,\n        GBP = u.Balance / 1.30M\n    });\n\nvar aggregate = accountsCollection.Aggregate()\n                        .Match(matchBalanceStage)\n                        .SortByDescending(u => u.Balance)\n                        .Project(projectStage);\n\nvar results = aggregate.ToList();\n\nforeach (var account in results)\n{\n    Console.WriteLine(account.Balance);\n}\n")),(0,o.yg)("h3",{id:"sample"},"Sample"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-Csharp"},'IMongoDatabase db = dbClient.GetDatabase("postal_data");\nvar zipEntries = db.GetCollection<ZipEntry>("zip_entries");\nvar builder = Builders<ZipEntry>.Filter;\nvar filter = builder.Eq(x => x.State, "AL") & builder.Gt(x => x.Population, 2000);\nvar sort = Builders<ZipEntry>.Sort.Ascending(x => x.City);\nvar projection = Builders<ZipEntry>.Projection.Include(x => x.City).Exclude(x => x.Zip);\nvar results = zipEntries.Find(filter).Sort(sort).Project(projection).ToList();\n')),(0,o.yg)("hr",null),(0,o.yg)("h2",{id:"mongodb-aggregation-with-csharp"},"MongoDB Aggregation with Csharp"),(0,o.yg)("p",null,"In this unit, you learned how to:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Define an aggregation pipeline and its stages and operators."),(0,o.yg)("li",{parentName:"ul"},"Build the ",(0,o.yg)("inlineCode",{parentName:"li"},"Match")," and ",(0,o.yg)("inlineCode",{parentName:"li"},"Group")," stages of an aggregation pipeline."),(0,o.yg)("li",{parentName:"ul"},"Build the ",(0,o.yg)("inlineCode",{parentName:"li"},"Sort")," and ",(0,o.yg)("inlineCode",{parentName:"li"},"Project")," stages of an aggregation pipeline.")),(0,o.yg)("h3",{id:"resources"},"Resources"),(0,o.yg)("p",null,"Use the following resources to learn more about performing basic aggregation with Csharp:"))}p.isMDXComponent=!0}}]);
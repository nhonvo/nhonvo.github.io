"use strict";(self.webpackChunksample_website=self.webpackChunksample_website||[]).push([[6680],{5680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>d});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},g="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},y=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),g=s(t),y=r,d=g["".concat(p,".").concat(y)]||g[y]||u[y]||o;return t?a.createElement(d,i(i({ref:n},c),{},{components:t})):a.createElement(d,i({ref:n},c))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=y;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[g]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}y.displayName="MDXCreateElement"},4212:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=t(8168),r=(t(6540),t(5680));const o={layout:"post",title:"Entity framework core",subtitle:"",date:new Date("2024-01-18T12:00:00.000Z"),author:"Truong Nhon",hidden:!1,published:!0,multilingual:!1,catalog:!0,lang:"en",tags:["c#","database"]},i=void 0,l={permalink:"/2024/1/18/EF-core",editUrl:"https://github.com/nhonvo/nhonvo.github.io/edit/main/blog/blog/2024-1-18-EF-core.md",source:"@site/blog/2024-1-18-EF-core.md",title:"Entity framework core",description:"Introduction",date:"2024-01-18T12:00:00.000Z",formattedDate:"January 18, 2024",tags:[{label:"c#",permalink:"/tags/c"},{label:"database",permalink:"/tags/database"}],readingTime:2.16,hasTruncateMarker:!1,authors:[{name:"Truong Nhon"}],frontMatter:{layout:"post",title:"Entity framework core",subtitle:"",date:"2024-01-18T12:00:00.000Z",author:"Truong Nhon",hidden:!1,published:!0,multilingual:!1,catalog:!0,lang:"en",tags:["c#","database"]},prevItem:{title:"Exploring Dynamic Distance Calculation with Delegates: A Proof of Concept",permalink:"/2024/1/18/Delegate"},nextItem:{title:"Exploring MongoDB and mongosh in Bash",permalink:"/2024/1/1/Exploring-MongoDB-and-mongosh-in-Bash-Senior-note"}},p={authorsImageUrls:[void 0]},s=[{value:"Introduction",id:"introduction",level:2},{value:"Relationship",id:"relationship",level:2},{value:"One-to-One Relationship",id:"one-to-one-relationship",level:3},{value:"One-to-Many Relationship",id:"one-to-many-relationship",level:3},{value:"Many-to-Many Relationship",id:"many-to-many-relationship",level:3},{value:"DeleteBehavior",id:"deletebehavior",level:2},{value:"Best pratices",id:"best-pratices",level:2}],c={toc:s},g="wrapper";function u(e){let{components:n,...t}=e;return(0,r.yg)(g,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"introduction"},"Introduction"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Entity Framework Core is an ORM framework, open-source, lightweight and cross-platform  developed by Microsoft."),(0,r.yg)("li",{parentName:"ul"},"It enables developers to work with databases using .NET object and EF Core is built on top of ADO.NET")),(0,r.yg)("h2",{id:"relationship"},"Relationship"),(0,r.yg)("h3",{id:"one-to-one-relationship"},"One-to-One Relationship"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"modelBuilder.Entity<Author>()\n    .HasOne(a => a.Book)           // Author has one Book\n    .WithOne(b => b.Author)        // Book has one Author\n    .HasForeignKey<Book>(b => b.AuthorId);  // Foreign key in Book referencing AuthorId\n")),(0,r.yg)("h3",{id:"one-to-many-relationship"},"One-to-Many Relationship"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"modelBuilder.Entity<Author>()\n    .HasMany(a => a.Books)         // Author has many Books\n    .WithOne(b => b.Author)        // Book has one Author\n    .HasForeignKey(b => b.AuthorId);       // Foreign key in Book referencing AuthorId\n")),(0,r.yg)("h3",{id:"many-to-many-relationship"},"Many-to-Many Relationship"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"modelBuilder.Entity<StudentCourse>()\n    .HasKey(sc => new { sc.StudentId, sc.CourseId });   // Define composite primary key for the join table\n\nmodelBuilder.Entity<StudentCourse>()\n    .HasOne(sc => sc.Student)\n    .WithMany(s => s.Courses)\n    .HasForeignKey(sc => sc.StudentId);  // Foreign key in join table referencing StudentId\n\nmodelBuilder.Entity<StudentCourse>()\n    .HasOne(sc => sc.Course)\n    .WithMany(c => c.Students)\n    .HasForeignKey(sc => sc.CourseId);  // Foreign key in join table referencing CourseId\n")),(0,r.yg)("h2",{id:"deletebehavior"},"DeleteBehavior"),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"DeleteBehavior")," enum in EF Core includes the following options:"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Cascade:")," Deleting the principal/parent entity will cause the dependent/child entities to be deleted as well. ",(0,r.yg)("inlineCode",{parentName:"p"},"OnDelete(DeleteBehavior.Cascade)"))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"SetNull:")," Deleting the principal/parent entity will set the foreign key properties in the dependent/child entities to null. ",(0,r.yg)("inlineCode",{parentName:"p"},"OnDelete(DeleteBehavior.SetNull)"))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"SetDefault:")," Deleting the principal/parent entity will set the foreign key properties in the dependent/child entities to their default values. ",(0,r.yg)("inlineCode",{parentName:"p"},"OnDelete(DeleteBehavior.SetDefault)"))),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Restrict:")," Prevents the deletion of the principal/parent entity if there are dependent/child entities. ",(0,r.yg)("inlineCode",{parentName:"p"},"OnDelete(DeleteBehavior.Restrict)"),"  . An exception will be thrown.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"NoAction:")," Similar to ",(0,r.yg)("inlineCode",{parentName:"p"},"Restrict"),", it is used to specify no action on delete. ",(0,r.yg)("inlineCode",{parentName:"p"},"OnDelete(DeleteBehavior.NoAction)")," and you'll need to handle constraints in your application logic."))),(0,r.yg)("p",null,"For example:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"modelBuilder.Entity<ParentEntity>()\n    .HasMany(p => p.ChildEntities)\n    .WithOne(c => c.ParentEntity)\n    .OnDelete(DeleteBehavior.Restrict);\n")),(0,r.yg)("p",null,"This configuration would set the delete behavior for the relationship between ",(0,r.yg)("inlineCode",{parentName:"p"},"ParentEntity")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"ChildEntity")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"Restrict"),"."),(0,r.yg)("h2",{id:"best-pratices"},"Best pratices"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Indexing"),": Creating indexes on frequently accessed columns can improve query performance.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Proper data modeling"),": Designing tables and relationships properly can improve query performance and prevent performance issues.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Caching"),": Storing frequently accessed data in a cache can reduce database calls and improve application performance.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Query optimization"),": Writing efficient queries can improve performance. Techniques such as avoiding unnecessary joins and reducing the number of returned columns can help.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Connection pooling"),": Reusing database connections instead of creating new ones can improve performance.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Batch processing"),": Performing multiple operations in a single database call can improve performance and reduce overhead.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},(0,r.yg)("strong",{parentName:"p"},"Asynchronous programming"),": Using asynchronous programming techniques can improve performance by allowing the application to continue executing while waiting for database calls to complete."))))}u.isMDXComponent=!0}}]);
"use strict";(self.webpackChunksample_website=self.webpackChunksample_website||[]).push([[3610],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>d});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(t),g=r,d=c["".concat(s,".").concat(g)]||c[g]||m[g]||i;return t?a.createElement(d,o(o({ref:n},u),{},{components:t})):a.createElement(d,o({ref:n},u))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=g;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[c]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},7116:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=t(8168),r=(t(6540),t(5680));const i={layout:"post",title:"net 8 and c# 12 big change",subtitle:"",date:new Date("2024-03-28T00:00:00.000Z"),author:"Truong Nhon",published:!0,catalog:!0,tags:["c#"]},o=void 0,l={permalink:"/2024/4/12/net-8",editUrl:"https://github.com/nhonvo/nhonvo.github.io/edit/main/blog/blog/2024-4-12-net-8.md",source:"@site/blog/2024-4-12-net-8.md",title:"net 8 and c# 12 big change",description:"Net8",date:"2024-03-28T00:00:00.000Z",formattedDate:"March 28, 2024",tags:[{label:"c#",permalink:"/tags/c"}],readingTime:5.185,hasTruncateMarker:!0,authors:[{name:"Truong Nhon"}],frontMatter:{layout:"post",title:"net 8 and c# 12 big change",subtitle:"",date:"2024-03-28T00:00:00.000Z",author:"Truong Nhon",published:!0,catalog:!0,tags:["c#"]},prevItem:{title:"Reactjs basic note",permalink:"/2024/3/28/reactjs-note"},nextItem:{title:"Mongo with csharp",permalink:"/2024/3/1/mongo-with-csharp"}},s={authorsImageUrls:[void 0]},p=[{value:"Net8",id:"net8",level:2},{value:"C# 12",id:"c-12",level:2},{value:"Risk upgrading from .net6 to .net 8",id:"risk-upgrading-from-net6-to-net-8",level:2}],u={toc:p},c="wrapper";function m(e){let{components:n,...t}=e;return(0,r.yg)(c,(0,a.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"net8"},"Net8"),(0,r.yg)("p",null,". NET 8, was released on ",(0,r.yg)("strong",{parentName:"p"},"November 14, 2023"),", along with C# 12 and Visual Studio 17.8. .NET 8 will be supported for three years as a long-term support (LTS) release. You can ",(0,r.yg)("a",{parentName:"p",href:"https://dotnet.microsoft.com/download/dotnet"},"download .NET 8 here"),"."),(0,r.yg)("p",null,"The .NET 8 runtime includes improvements to performance, garbage collection, and the core and extension libraries."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Some update summaries:"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"The .NET 8 runtime includes improvements to performance, garbage collection, and the core and extension libraries.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"ASP.NET Core includes improvements to Blazor, SignalR, minimal APIs, Native AOT, Kestrel and HTTP.sys servers, and authentication and authorization.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},".NET MAUI includes new functionality for controls, gesture recognizers, Windows apps, navigation, and platform integration.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Entity Framework Core includes improvements to complex type objects, collections of primitive types, JSON column mapping, raw SQL queries, lazy loading, tracked-entity access, model building, math translations, and other features.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Windows Forms includes improvements to data binding, Visual Studio DPI, and high DPI.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"Windows Presentation Foundation (WPF) adds the ability to use hardware acceleration and a new OpenFolderDialog control."))))),(0,r.yg)("hr",null),(0,r.yg)("h2",{id:"c-12"},"C# 12"),(0,r.yg)("p",null,"C# 12 is supported on ",(0,r.yg)("strong",{parentName:"p"},".NET 8"),". C# 12 includes the following new features.  "),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#primary-constructors"},"Primary constructors")," - Introduced in Visual Studio 2022 version 17.6 Preview 2.")),(0,r.yg)("p",null,"Primary constructors provide a concise syntax for initializing properties in C# classes. They allow you to declare and initialize properties directly in the constructor parameter list, reducing boilerplate code."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c#"},'public class Person(string _name)\n{\n public string Name = _name;\n}\nPerson person = new Person("John");\nConsole.WriteLine(person.Name); // Output: John\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"old style:")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"public class Person\n{\n    public string Name { get; }\n    public int Age { get; }\n\n    public Person(string name, int age)\n    {\n        Name = name;\n        Age = age;\n    }\n}\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#collection-expressions"},"Collection expressions")," - Introduced in Visual Studio 2022 version 17.7 Preview 5.")),(0,r.yg)("p",null,"Collection expressions introduce a new terse syntax to create common collection values. Inlining other collections into these values is possible using a spread operator ",(0,r.yg)("inlineCode",{parentName:"p"},".."),"."),(0,r.yg)("p",null,"The following examples show uses of collection expressions:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c#"},"// Create an array:\nint[] a = [1, 2, 3, 4, 5, 6, 7, 8];\n\n// Create a list:\nList<string> b = [\"one\", \"two\", \"three\"];\n\n// Create a span\nSpan<char> c  = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i'];\n\n// Create a jagged 2D array:\nint[][] twoD = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];\n\n// Create a jagged 2D array from variables:\nint[] row0 = [1, 2, 3];\nint[] row1 = [4, 5, 6];\nint[] row2 = [7, 8, 9];\nint[][] twoDFromVariables = [row0, row1, row2];\n")),(0,r.yg)("p",null,"The ",(0,r.yg)("em",{parentName:"p"},"spread operator"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"..")," in a collection expression replaces its argument with the elements from that collection. The argument must be a collection type. The following examples show how the spread operator works:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c#"},'int[] row0 = [1, 2, 3];\nint[] row1 = [4, 5, 6];\nint[] row2 = [7, 8, 9];\nint[] single = [.. row0, .. row1, .. row2];\nforeach (var element in single)\n{\n    Console.Write($"{element}, ");\n}\n// output:\n// 1, 2, 3, 4, 5, 6, 7, 8, 9,\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#inline-arrays"},"Inline arrays")," - Introduced in Visual Studio 2022 version 17.7 Preview 3.")),(0,r.yg)("p",null,"Inline arrays enable a developer to create an array of fixed size in a ",(0,r.yg)("inlineCode",{parentName:"p"},"struct")," type"),(0,r.yg)("p",null,"An ",(0,r.yg)("em",{parentName:"p"},"inline array")," is declared similar to the following ",(0,r.yg)("inlineCode",{parentName:"p"},"struct"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"[System.Runtime.CompilerServices.InlineArray(10)]\npublic struct Buffer\n{\n    private int _element0;\n}\n")),(0,r.yg)("p",null,"You use them like any other array:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-csharp"},"var buffer = new Buffer();\nfor (int i = 0; i < 10; i++)\n{\n    buffer[i] = i;\n}\n\nforeach (var i in buffer)\n{\n    Console.WriteLine(i);\n}\n")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#default-lambda-parameters"},"Optional parameters in lambda expressions")," - Introduced in Visual Studio 2022 version 17.5 Preview 2.")),(0,r.yg)("p",null,"You can now define default values for parameters on lambda expressions. The syntax and rules are the same as adding default values for arguments to any method or local function."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c#"},'// Define a lambda expression with default parameters\nFunc<int, int, int> add = (x, y = 0) => x + y;\n\n// Call the lambda expression with one argument\nint result1 = add(5);\nConsole.WriteLine("Result1: " + result1); // Output: 5\n\n// Call the lambda expression with two arguments\nint result2 = add(5, 3);\nConsole.WriteLine("Result2: " + result2); // Output: 8\n\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#ref-readonly-parameters"},(0,r.yg)("inlineCode",{parentName:"a"},"ref readonly")," parameters")," - Introduced in Visual Studio 2022 version 17.8 Preview 2.")),(0,r.yg)("p",null,"pass parameters by reference while ensuring that the referenced value cannot be modified within the method. ",(0,r.yg)("inlineCode",{parentName:"p"},"ref readonly")," parameters enables more clarity for APIs"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},'int[] numbers = { 1, 2, 3, 4, 5 };\nint sum = Plus(numbers);\nConsole.WriteLine("Sum: " + sum); \n\npublic static int Plus(ref readonly int[] arr)\n{\n    int sum = 0;\n    foreach (int num in arr)\n    {\n        sum += num;\n    }\n    return sum;\n}\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#alias-any-type"},"Alias any type")," - Introduced in Visual Studio 2022 version 17.6 Preview 3.")),(0,r.yg)("p",null,"use the using alias directive to alias any type, not just named types. That means you can create semantic aliases for tuple types, array types, pointer types, or other unsafe types."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c#"},'Pair pair = (1, "apple");\nint number = pair.Item1;\nstring fruit = pair.Item2;\nConsole.WriteLine($"Number: {number}, Fruit: {fruit}"); \n\n// using alias with tuple types:\nusing Pair = (int, string);\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#experimental-attribute"},"Experimental attribute")," - Introduced in Visual Studio 2022 version 17.7 Preview 3.")),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"System.Diagnostics.CodeAnalysis.ExperimentalAttribute")," allows developers to mark types, methods, or assemblies as experimental features. This attribute serves as a way to communicate to other developers that the ",(0,r.yg)("strong",{parentName:"p"},"marked feature is still under development or testing"),", and its API or behavior may change in future releases."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-c#"},'[Experimental("Experimental feature: FeatureName")]\npublic static void ExperimentalMethod()\n{\n  // Experimental feature implementation\n}\n\npublic static void Main()\n{\n  // Call the experimental method\n  ExperimentalMethod();\n}\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#interceptors"},"Interceptors")," - ",(0,r.yg)("em",{parentName:"li"},"Preview feature")," Introduced in Visual Studio 2022 version 17.7 Preview 3.")),(0,r.yg)("p",null,"Interceptors are an experimental feature, available in ",(0,r.yg)("strong",{parentName:"p"},"preview mode")," with C# 12."),(0,r.yg)("h2",{id:"risk-upgrading-from-net6-to-net-8"},"Risk upgrading from .net6 to .net 8"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Compatibility: third-party libraries Some libraries or packages may not yet support the latest version,"),(0,r.yg)("li",{parentName:"ul"},"development team may need time to familiarize themselves with the new features and changes introduced in .NET 8"),(0,r.yg)("li",{parentName:"ul"},"update code, refactor components, and test thoroughly to ensure everything works as expected."),(0,r.yg)("li",{parentName:"ul"},"current version ",(0,r.yg)("strong",{parentName:"li"},"ready proxy")," c#12")))}m.isMDXComponent=!0}}]);
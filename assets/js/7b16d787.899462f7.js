"use strict";(self.webpackChunksample_website=self.webpackChunksample_website||[]).push([[4501],{5680:(e,t,a)=>{a.d(t,{xA:()=>m,yg:()=>y});var n=a(6540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),s=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},m=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},g="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),g=s(a),u=r,y=g["".concat(l,".").concat(u)]||g[u]||c[u]||o;return a?n.createElement(y,p(p({ref:t},m),{},{components:a})):n.createElement(y,p({ref:t},m))}));function y(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,p=new Array(o);p[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[g]="string"==typeof e?e:r,p[1]=i;for(var s=2;s<o;s++)p[s]=a[s];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},7452:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=a(8168),r=(a(6540),a(5680));const o={title:"Hosting simple API on EC2",description:"Deploy a webapi app on EC2 with terraform",slug:"/hosting-simple-webapi-on-ec2/",image:"https://i.imgur.com/mErPwqL.png",hide_table_of_contents:!1,authors:["truongnhon"],tags:["webapi","c#","aws"]},p=void 0,i={permalink:"/hosting-simple-webapi-on-ec2/",editUrl:"https://github.com/nhonvo/nhonvo.github.io/edit/main/blog/blog/2024-12-21-hosting-simple-webapi-on-ec2.md",source:"@site/blog/2024-12-21-hosting-simple-webapi-on-ec2.md",title:"Hosting simple API on EC2",description:"Deploy a webapi app on EC2 with terraform",date:"2024-12-21T00:00:00.000Z",formattedDate:"December 21, 2024",tags:[{label:"webapi",permalink:"/tags/webapi"},{label:"c#",permalink:"/tags/c"},{label:"aws",permalink:"/tags/aws"}],readingTime:7.26,hasTruncateMarker:!0,authors:[{name:"Truong Nhon",title:"Admin",url:"https://github.com/nhonvo",socials:{x:"nhonvo",github:"nhonvo"},imageURL:"https://github.com/nhonvo.png",key:"truongnhon"}],frontMatter:{title:"Hosting simple API on EC2",description:"Deploy a webapi app on EC2 with terraform",slug:"/hosting-simple-webapi-on-ec2/",image:"https://i.imgur.com/mErPwqL.png",hide_table_of_contents:!1,authors:["truongnhon"],tags:["webapi","c#","aws"]},nextItem:{title:"L\u1eadp tr\xecnh c\u01a1 b\u1ea3n",permalink:"/basic-programming/"}},l={authorsImageUrls:[void 0]},s=[],m={toc:s},g="wrapper";function c(e){let{components:t,...a}=e;return(0,r.yg)(g,(0,n.A)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#cost-breakdown-for-ec2"},(0,r.yg)("strong",{parentName:"a"},"Cost Breakdown for EC2"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#example-setup"},(0,r.yg)("strong",{parentName:"a"},"Example Setup"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-1-prepare-aws-environment"},(0,r.yg)("strong",{parentName:"a"},"Step 1: Prepare AWS Environment")),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#11-install-terraform"},(0,r.yg)("strong",{parentName:"a"},"1.1 Install Terraform"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#12-configure-aws-cli"},(0,r.yg)("strong",{parentName:"a"},"1.2 Configure AWS CLI"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#13-set-up-aws-resources-with-terraform"},(0,r.yg)("strong",{parentName:"a"},"1.3 Set Up AWS Resources with Terraform"))))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-11-generate-the-key-pem-in-local"},(0,r.yg)("strong",{parentName:"a"},"Step 1.1: Generate the key pem in local"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-2-ssh-into-the-ec2-instance"},(0,r.yg)("strong",{parentName:"a"},"Step 2: SSH into the EC2 Instance"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-3-install-nginx-and-net-on-centos-7-ec2-instance"},(0,r.yg)("strong",{parentName:"a"},"Step 3: Install NGINX and .NET on CentOS 7 EC2 Instance")),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#31-install-nginx"},(0,r.yg)("strong",{parentName:"a"},"3.1 Install NGINX"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#32-install-net-sdk"},(0,r.yg)("strong",{parentName:"a"},"3.2 Install .NET SDK"))))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-5-set-up-your-net-web-api"},(0,r.yg)("strong",{parentName:"a"},"Step 5: Set Up Your .NET Web API")),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#51-clone-the-net-api-repository-if-available"},(0,r.yg)("strong",{parentName:"a"},"5.1 Clone the .NET API Repository (if available)"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#52-publish-and-run-the-web-api"},(0,r.yg)("strong",{parentName:"a"},"5.2 Publish and Run the Web API"))))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-6-test-the-web-api"},(0,r.yg)("strong",{parentName:"a"},"Step 6: Test the Web API"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-7-automate-web-api-startup-optional"},(0,r.yg)("strong",{parentName:"a"},"Step 7: Automate Web API Startup (Optional)"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#step-8-clean-up-resources-optional"},(0,r.yg)("strong",{parentName:"a"},"Step 8: Clean Up Resources (Optional)"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#upcoming-content"},"Upcoming content"))))}c.isMDXComponent=!0}}]);
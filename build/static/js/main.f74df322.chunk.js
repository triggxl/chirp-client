(this["webpackJsonpchirp-app"]=this["webpackJsonpchirp-app"]||[]).push([[0],{23:function(t,e,n){},33:function(t,e,n){},35:function(t,e,n){},40:function(t,e,n){},41:function(t,e,n){},45:function(t,e,n){"use strict";n.r(e);var s=n(1),i=n.n(s),c=n(25),r=n.n(c),o=(n(23),n(15)),a=n(16),l=n(10),d=n(11),p=n(13),h=n(12),j=n(2),u=i.a.createContext({mbTitle:"",showThread:!1,posts:[],handleCreatePost:function(){},handleEditPost:function(){},handleDeletePost:function(){}}),b=n(8),O=n.p+"static/media/colorful-parrots.711a6a95.jpg",f=n.p+"static/media/old-telephones.36d67495.jpg",x=n.p+"static/media/typerwriter.81be67e0.jpg",m=(n(33),n(0)),v=function(t){return Object(m.jsx)("button",Object(o.a)(Object(o.a)({className:"site-button"},t),{},{children:t.children}))},y=(n(35),function(){return Object(m.jsx)(u.Consumer,{children:function(t){return Object(m.jsxs)("div",{id:"landing-page-container",children:[Object(m.jsx)("div",{className:"container",children:Object(m.jsx)("div",{id:"content-slider",children:Object(m.jsxs)("div",{id:"slider",children:[Object(m.jsxs)("div",{id:"mask",children:[Object(m.jsx)("img",{className:"parrots",src:O,alt:"vivid parrots up close in the wild"}),Object(m.jsx)("img",{className:"rotary",src:f,alt:"three old rotary phones lined up against a wall"}),Object(m.jsx)("img",{className:"typewriter",src:x,alt:"Old typewriter"})]}),Object(m.jsx)("div",{className:"progress-bar"})]})})}),Object(m.jsx)("h1",{id:"site-title",children:"Welcome to Chirp-(En-Passant)!"}),Object(m.jsx)("h2",{children:"(An online discussion board)"}),Object(m.jsx)(b.b,{to:"/message-board",children:Object(m.jsx)(v,{style:{fontSize:".9em"},children:"Let's Get Started!"})})]})}})}),g=(n(40),n(41),n(18)),S=n.n(g),C=n(7),w=function(t){Object(p.a)(n,t);var e=Object(h.a)(n);function n(t){var s;return Object(l.a)(this,n),(s=e.call(this,t)).myRef=i.a.createRef(),s.state={showDetails:!1,isEdited:!1,isDeleted:!1,isSaved:!1,isReplying:!1,replyIdToBeEdited:null,content:"",title:""},s}return Object(d.a)(n,[{key:"render",value:function(){var t=this,e=this.props.post,n=function(){t.setState({showDetails:!t.state.showDetails})},s=function(e){t.setState({content:e.target.value})},c=function(){t.setState({isEdited:!1,isReplying:!1})},r=function(){t.setState({isReplying:!0})},o=function(e){t.setState({content:e.target.value})},a=function(e){e.preventDefault();var n={id:S()(),content:t.state.content,postId:t.props.post.id};console.log("content:",t.state.content),fetch("".concat(C.API_URL,"/replies"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)}).then((function(t){return t.json()})).then((function(){t.context.addReply(n.id,t.props.post.id,t.state.content),t.setState({isReplying:!1,content:""})})).catch((function(t){console.error("error:",t.message)}))},l=e.replies.find((function(e){return e.id===t.state.replyIdToBeEdited})),d=this.state.content||l&&l.content;return Object(m.jsx)(u.Consumer,{children:function(l){return Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{id:"tr-threads",children:[Object(m.jsx)("td",{children:e.title},"title"),Object(m.jsx)("td",{children:Object(m.jsx)("button",{onClick:n,children:t.state.showDetails?"\u2b06":"\u2b07"})},"button")]},"header"),t.state.showDetails?Object(m.jsxs)(i.a.Fragment,{children:[Object(m.jsx)("tr",{id:"cr-sec",children:" Content and Replies Section:"},"cr-sec"),Object(m.jsx)("tr",{children:Object(m.jsxs)("td",{className:"col-span",colSpan:6,children:[e.content,Object(m.jsx)("section",{},"section"),t.state.isReplying?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("p",{children:"New Chirp:"}),Object(m.jsxs)("form",{id:"create-reply-form",onSubmit:a,children:[Object(m.jsx)("textarea",{className:"reply-textarea",value:t.state.content,onChange:o},"tar"),Object(m.jsx)(v,{onClick:c,children:"Cancel"}),Object(m.jsx)(v,{children:"Save"})]},"form")]}):Object(m.jsx)(v,{onClick:r,children:"Chirp"})]})},"sd"),t.state.isEdited&&Object(m.jsx)("tr",{className:"edit-reply-section",children:Object(m.jsxs)("td",{colSpan:6,children:[Object(m.jsx)("textarea",{value:d,onChange:s},"edit-reply ta"),Object(m.jsxs)("div",{children:[Object(m.jsx)(v,{onClick:c,children:"Cancel"}),Object(m.jsx)(v,{onClick:function(e){return function(e){console.log(t.props.post.id);var n={id:t.state.replyIdToBeEdited,content:t.state.content,postid:t.props.post.id};return fetch("".concat(C.API_URL,"/replies/").concat(e),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(n)}).then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).then((function(){t.context.editReply(e,t.state.content,t.props.post.id),t.setState({isEdited:!1,content:""})}))}(t.state.replyIdToBeEdited)},children:"Save"})]},"sb's")]},"col")},"rce"),e.replies.map((function(e){return Object(m.jsx)(i.a.Fragment,{children:Object(m.jsx)("tr",{className:"replies-section",children:Object(m.jsxs)("td",{colSpan:6,children:[!t.state.isEdited&&Object(m.jsx)("section",{onChange:function(e){return t.setState({content:e.target.value})},value:t.state.content,className:"reply-section",children:e.content||"There was no reply."},"rsec"),Object(m.jsxs)("div",{className:"thread-btns",children:[!t.state.isEdited&&Object(m.jsx)(v,{onClick:function(){return n=e.id,void t.setState({replyIdToBeEdited:n,isEdited:!0,isReplying:!1,isDeleted:!1});var n},children:"Edit"}),!t.state.isDeleted&&!t.state.isEdited&&Object(m.jsx)(v,{onClick:function(){return n=e.id,void fetch("".concat(C.API_URL,"/replies/").concat(n),{method:"DELETE",headers:{"content-type":"application/json"}}).then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).catch((function(e){return t.setState({error:e})})).then((function(){return t.context.deleteReply(t.props.post.id,n)})).then(t.setState({toggleThread:null}));var n},children:"Drop"})]})]},"colr")})},e.id)}))]}):null]},"tb")}})}}]),n}(i.a.Component);w.contextType=u;var E=w,R=n.p+"static/media/chirping-bird.d38cb81b.jpg",P=function(t){Object(p.a)(n,t);var e=Object(h.a)(n);function n(t){var s;return Object(l.a)(this,n),(s=e.call(this,t)).state={isCreatingPost:!1,showAddForm:!1,title:"",content:""},s}return Object(d.a)(n,[{key:"render",value:function(){var t=this;return Object(m.jsxs)("div",{id:"mb-container",children:[Object(m.jsx)("img",{src:R,alt:"bird chirping on a tree branch"}),Object(m.jsx)("h1",{id:"mb-page-title",children:"Chirp(En-Passant) Message Board:"}),Object(m.jsx)("div",{id:"mb-links",children:Object(m.jsx)(b.b,{to:"/",children:"Home"},"/")}),this.state.showAddForm?Object(m.jsxs)("form",{className:"form-inline",onSubmit:function(e){e.preventDefault();var n={id:S()(),title:t.state.title,content:t.state.content,participantsInitials:"",numOfParticipants:0,numOfReplies:0,replies:[],timeOpen:"One minute ago"};fetch("".concat(C.API_URL,"/posts"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(n)}).then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).catch((function(e){return t.setState({error:e})})).then((function(){t.context.createNewPost(t.state.id,t.state.title,t.state.content),t.setState({isCreatingPost:!1,title:"",content:"",showAddForm:!1})}))},children:[Object(m.jsx)("label",{className:"ptl",children:"Title:"}),Object(m.jsx)("input",{className:"post-title",onChange:function(e){return t.setState({title:e.target.value})},value:this.state.title,type:"text",id:"new-post-title",placeholder:"New ish"}),Object(m.jsx)("label",{className:"pcl",children:"Topic:"}),Object(m.jsx)("input",{className:"post-content",onChange:function(e){return t.setState({content:e.target.value})},value:this.state.content,type:"text",id:"new-post-topic",placeholder:"down 4 and 7 beers ago..."}),Object(m.jsx)(v,{children:"Chirp!"})]}):Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{id:"user-instructions",children:[Object(m.jsx)("h3",{children:"Chirp Instructions:"}),Object(m.jsx)("p",{children:"1.) Click one of the down arrows to the right to view a post, OR Create your own!"}),Object(m.jsxs)("p",{children:["2.) Click 'Chirp' to reply and share your thoughts in the discussion board! ",Object(m.jsx)("br",{})," (You may edit and delete your reply also!) "]})]}),Object(m.jsx)(v,{onClick:function(){t.setState({showAddForm:!0})},children:"Create New Post"})]}),Object(m.jsxs)("table",{id:"mb-table",children:[Object(m.jsx)("thead",{children:Object(m.jsx)("tr",{id:"table-row",children:Object(m.jsx)("th",{id:"title-tr-mb",children:"Title:"})})}),this.context.posts.map((function(t){return Object(m.jsx)(E,{post:t},t.title)}))]})]})}}]),n}(i.a.Component);P.contextType=u;var N=P,T=function(t){Object(p.a)(n,t);var e=Object(h.a)(n);function n(){var t;Object(l.a)(this,n);for(var s=arguments.length,i=new Array(s),c=0;c<s;c++)i[c]=arguments[c];return(t=e.call.apply(e,[this].concat(i))).state={posts:[]},t.createNewPost=function(e,n,s){var i={id:e,title:n,content:s,participantsInitials:"",numOfParticipants:0,numOfReplies:0,replies:[],timeOpen:"One minute ago"};t.setState((function(t){var e=Object(a.a)(t.posts);return e.push(i),{posts:e}}))},t.addReply=function(e,n,s){var i={id:e,title:"",content:s,postid:n};t.setState((function(t){console.log("prevState:",t);var e=Object(a.a)(t.posts),s=e.find((function(t){return t.id===n}));return console.log("postid:",n),console.log("matching post:",s),s.replies.push(i),{posts:e}}))},t.handleEditReply=function(e,n,s){var i=t.state.posts.find((function(t){return t.id===s})),c=t.state.posts.findIndex((function(t){return t.id===s})),r=i.replies.findIndex((function(t){return t.id===e})),l=Object(o.a)({},i.replies[r]);l.content=n,i.replies.splice(r,1,l);var d=Object(a.a)(t.state.posts);d.splice(c,1,i),t.setState({posts:d})},t.handleDeleteReply=function(e,n){var s=t.state.posts.find((function(t){return t.id===e})),i=s.replies.findIndex((function(t){return t.id===n}));s.replies.splice(i,1);var c=Object(a.a)(t.state.posts),r=t.state.posts.findIndex((function(t){return t.id===e}));c.splice(r,1,s),t.setState({posts:c})},t}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var t=this;fetch("".concat(C.API_URL,"/posts")).then((function(t){return t.json()})).then((function(e){fetch("".concat(C.API_URL,"/replies")).then((function(t){return t.json()})).then((function(n){n.forEach((function(t){var n=e.find((function(e){return e.id===t.postId}));n.replies=n.replies||[],n.replies.push(t)})),t.setState({posts:e})}))}))}},{key:"render",value:function(){var t={posts:this.state.posts,createNewPost:this.createNewPost,addReply:this.addReply,editReply:this.handleEditReply,deleteReply:this.handleDeleteReply,handleCreatePost:this.handleCreatePost,handleEditPost:this.handleEditPost,handleDeletePost:this.handleDeletePost};return Object(m.jsxs)(u.Provider,{value:t,children:[Object(m.jsx)(j.a,{exact:!0,path:"/",component:y}),Object(m.jsx)(j.a,{path:"/message-board",component:N})]})}}]),n}(i.a.Component);T.contextType=u;var D=T;n(27),n(28);r.a.render(Object(m.jsx)(b.a,{children:Object(m.jsx)(D,{})}),document.getElementById("root"))},7:function(t,e,n){t.exports={PORT:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PORT||8e3,NODE_ENV:"production",API_URL:"heroku url"}}},[[45,1,2]]]);
//# sourceMappingURL=main.f74df322.chunk.js.map
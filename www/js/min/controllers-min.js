angular.module("your_app_name.controllers",[]).controller("AppCtrl",function(o,t){o.$on("$ionicView.enter",function(){o.user=t.getUser()})}).controller("PushMenuCtrl",function(o,t){var e=function(o,t){return o.length>0&&_.each(o,function(o){o.name=o.title,o.link=o.slug;var n=_.filter(t,function(t){return t.parent===o.id});n.length>0&&(o.menu={title:o.title,id:o.id,items:n},e(o.menu.items,t))}),o};t.getCategories().then(function(t){var n=_.sortBy(t.categories,function(o){return o.title}),r=_.filter(n,function(o){return 0===o.parent}),s=e(r,n);o.menu={title:"All Categories",id:"0",items:s}})}).controller("BookMarksCtrl",function(o,t,e){o.bookmarks=e.getBookmarks(),t.$on("new-bookmark",function(t,n){o.bookmarks=e.getBookmarks()}),o.remove=function(t){e.remove(t),o.bookmarks=e.getBookmarks()}}).controller("ContactCtrl",function(o){o.position={lat:43.07493,lng:-89.381388},o.$on("mapInitialized",function(t,e){o.map=e})}).controller("SettingCtrl",function(o,t,e,n,r){o.notifications=!0,o.sendLocation=!1,e.fromTemplateUrl("views/common/terms.html",{scope:o,animation:"slide-in-up"}).then(function(t){o.terms_modal=t}),e.fromTemplateUrl("views/common/faqs.html",{scope:o,animation:"slide-in-up"}).then(function(t){o.faqs_modal=t}),e.fromTemplateUrl("views/common/credits.html",{scope:o,animation:"slide-in-up"}).then(function(t){o.credits_modal=t}),o.showTerms=function(){o.terms_modal.show()},o.showFAQS=function(){o.faqs_modal.show()},o.showCredits=function(){o.credits_modal.show()},o.showLogOutMenu=function(){var o=t.show({destructiveText:"Logout",titleText:"Are you sure you want to logout? This app is awsome so I recommend you to stay.",cancelText:"Cancel",cancel:function(){},buttonClicked:function(o){return!0},destructiveButtonClicked:function(){r.logOut(),n.go("login")}})}}).controller("EmailSenderCtrl",function(o,t){o.sendFeedback=function(){cordova.plugins.email.isAvailable(function(o){cordova.plugins.email.open({to:"john@doe.com",cc:"jane@doe.com",subject:"Feedback",body:"This app is awesome"})})},o.sendContactMail=function(){t.isAvailable().then(function(){t.open({to:"john@doe.com",cc:"sally@doe.com",subject:"Contact from ionWordpress",body:"How are you? Nice greetings from Uruguay"}).then(null,function(){})},function(){})}}).controller("RateAppCtrl",function(o){o.rateApp=function(){ionic.Platform.isIOS()?(AppRate.preferences.storeAppURL.ios="<my_app_id>",AppRate.promptForRating(!0)):ionic.Platform.isAndroid()&&(AppRate.preferences.storeAppURL.android="market://details?id=<package_name>",AppRate.promptForRating(!0))}}).controller("AdmobCtrl",function(o,t,e){o.manageAdMob=function(){var o=t.show({buttons:[{text:"Show AdMob Banner"},{text:"Show AdMob Interstitial"}],destructiveText:"Remove Ads",titleText:"Choose the ad to show",cancelText:"Cancel",cancel:function(){},destructiveButtonClicked:function(){return console.log("removing ads"),e.removeAds(),!0},buttonClicked:function(o,t){return"Show AdMob Banner"==t.text&&(console.log("show AdMob banner"),e.showBanner()),"Show AdMob Interstitial"==t.text&&(console.log("show AdMob interstitial"),e.showInterstitial()),!0}})}}).controller("iAdCtrl",function(o,t,e){o.manageiAd=function(){var o=t.show({buttons:[{text:"Show iAd Banner"},{text:"Show iAd Interstitial"}],destructiveText:"Remove Ads",titleText:"Choose the ad to show - Interstitial only works in iPad",cancelText:"Cancel",cancel:function(){},destructiveButtonClicked:function(){return console.log("removing ads"),e.removeAds(),!0},buttonClicked:function(o,t){return"Show iAd Banner"==t.text&&(console.log("show iAd banner"),e.showBanner()),"Show iAd Interstitial"==t.text&&(console.log("show iAd interstitial"),e.showInterstitial()),!0}})}}).controller("WalkthroughCtrl",function(o,t,e){o.$on("$ionicView.enter",function(){e.$getByHandle("walkthrough-slider").update()})}).controller("LoginCtrl",function(o,t,e,n,r){o.user={},o.doLogin=function(){e.show({template:"Loging in..."});var r={userName:o.user.userName,password:o.user.password};n.doLogin(r).then(function(o){t.go("app.home"),e.hide()},function(t){o.error=t,e.hide()})}}).controller("ForgotPasswordCtrl",function(o,t,e,n){o.user={},o.recoverPassword=function(){e.show({template:"Recovering password..."}),n.doForgotPassword(o.user.userName).then(function(t){"error"==t.status?o.error=t.error:o.message="Link for password reset has been emailed to you. Please check your email.",e.hide()})}}).controller("RegisterCtrl",function(o,t,e,n,r){o.user={},o.doRegister=function(){e.show({template:"Registering user..."});var r={userName:o.user.userName,password:o.user.password,email:o.user.email,displayName:o.user.displayName};n.doRegister(r).then(function(o){t.go("app.home"),e.hide()},function(t){o.error=t,e.hide()})}}).controller("HomeCtrl",function(o,t,e,n,r){o.posts=[],o.page=1,o.totalPages=1,o.doRefresh=function(){n.show({template:"Loading posts..."}),r.getRecentAudio(1).then(function(t){o.totalPages=t.pages,o.posts=r.shortenPosts(t.posts),n.hide(),o.$broadcast("scroll.refreshComplete")})},o.loadMoreData=function(){o.page+=1,r.getRecentAudio(o.page).then(function(t){o.totalPages=t.pages;var e=r.shortenPosts(t.posts);o.posts=o.posts.concat(e),o.$broadcast("scroll.infiniteScrollComplete")})},o.moreDataCanBeLoaded=function(){return o.totalPages>o.page},o.sharePost=function(o){r.sharePost(o)},o.bookmarkPost=function(o){n.show({template:"Post Saved!",noBackdrop:!0,duration:1e3}),r.bookmarkPost(o)},o.doRefresh()}).controller("PostCtrl",function(o,t,e,n,r,s){o.post=t.post,o.comments=_.map(t.post.comments,function(o){return o.author?(n.getUserGravatar(o.author.id).then(function(t){o.user_gravatar=t}),o):o}),e.hide(),o.sharePost=function(o){window.plugins.socialsharing.share("Check this post here: ",null,null,o)},o.addComment=function(){e.show({template:"Submiting comment..."}),n.submitComment(o.post.id,o.new_comment).then(function(t){if("ok"==t.status){var n=r.getUser(),a={author:{name:n.data.username},content:o.new_comment,date:Date.now(),user_gravatar:n.avatar,id:t.comment_id};o.comments.push(a),o.new_comment="",o.new_comment_id=t.comment_id,e.hide(),s.scrollBottom(!0)}})}}).controller("PostCategoryCtrl",function(o,t,e,n,r,s){o.category={},o.category.id=r.categoryId,o.category.title=r.categoryTitle,o.posts=[],o.page=1,o.totalPages=1,o.doRefresh=function(){n.show({template:"Loading posts..."}),s.getPostsFromCategory(o.category.id,1).then(function(t){o.totalPages=t.pages,o.posts=s.shortenPosts(t.posts),n.hide(),o.$broadcast("scroll.refreshComplete")})},o.loadMoreData=function(){o.page+=1,s.getRecentAudio(o.category.id,o.page).then(function(t){o.totalPages=t.pages;var e=s.shortenPosts(t.posts);o.posts=o.posts.concat(e),o.$broadcast("scroll.infiniteScrollComplete")})},o.moreDataCanBeLoaded=function(){return o.totalPages>o.page},o.sharePost=function(o){s.sharePost(o)},o.bookmarkPost=function(o){n.show({template:"Post Saved!",noBackdrop:!0,duration:1e3}),s.bookmarkPost(o)},o.doRefresh()}).controller("PageCtrl",function(o,t){o.page=t.page});
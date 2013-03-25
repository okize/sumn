/* last update: 2013-02-22 */
$(document).ready(function ($) {

	'use strict';

  // addthis social share component
  $('#micrositeHeader').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
    googleAnalyticsId: window.SITE_gaAccountID || false
  });

  // init content tabs component
  $('.contentTabs').contentTabs({
    tabLocation: 'left'
  });

  // create contact button and add to dom with click handler
  var contactBtn = $('<a>', {
    text: 'Contact HP',
    'class': 'button',
    href: 'http://www8.hp.com/us/en/contact-hp/contact.html'
  })
    .appendTo('.contentTabsNav')
    .on('click', function(e) {
      e.preventDefault();
      window.open(this.href);
  });

  // init featured video component
  $('.featuredVideo').featuredVideo({
    showPlaylist: true,
    autoplayFirstVideo: true
  });

// end doc.ready
});


/*!
* AddThis Share v1.0.3 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";var i="addThisShare",a={addThisApiVersion:"300",addThisButtons:["email","linkedin","facebook","twitter"],addThisCss:!0,addThisButtonSize:"small",addThisButtonOrientation:"horizontal",addThisButtonFollow:!1,addThisButtonFollowBoundary:"",addThisTwitterTemplate:"{{title}} {{url}}",googleAnalyticsId:!1},d=function(i,d){this.el=i,this.options=t.extend({},a,d),this.init()};d.prototype={init:function(){this.$el=t(this.el),this.addThisButtonsContainer={},this.addThisScript="//s7.addthis.com/js/"+this.options.addThisApiVersion+"/addthis_widget.js",this.addThisConfiguration={pubid:"ra-4f0c7ed813520536",url:window.location.pathname,ui_use_css:this.options.addThisCss,domready:!0,async:!0,data_track_clickback:!1,data_track_addressbar:!1,data_ga_tracker:window.SITE_gaAccountID||!1,data_ga_social:!0};var i=this;this.isAddThisLoaded||this.loadAddthisScript(function(){i.isAddthisLoaded()===!0&&window.addthis_config===void 0&&(window.addthis_config=i.addThisConfiguration,window.addthis_share={templates:{twitter:i.options.addThisTwitterTemplate}}),i.$el.append(i.buildAddthisHtml(i.options.addThisButtons)),i.options.addThisButtonFollow&&i.initializeFollow(),i.addThisButtonsContainer.show()})},isAddthisLoaded:function(){return window.addthis===void 0?!1:!0},loadAddthisScript:function(i){t.ajax({url:this.addThisScript,cache:!0,dataType:"script"}).done(function(){i!==void 0&&i.call()})},buildAddthisHtml:function(i){var a={email:{className:"addthis_button_email",title:"Email A Friend"},linkedin:{className:"addthis_button_linkedin",title:"Share on LinkedIn"},facebook:{className:"addthis_button_facebook",title:"Share on Facebook"},twitter:{className:"addthis_button_twitter",title:"Share on Twitter"},googleplus:{className:"addthis_button_google_plusone_share",title:"Share on Google+"},addthis:{className:"addthis_button_compact",title:"Share with AddThis Services"}},d={small:"addthis_default_style",medium:"addthis_20x20_style",large:"addthis_32x32_style"},s={horizontal:"addThisHorizontal",vertical:"addThisVertical"},o=function(t){for(var i="",d=0,s=t.length;s>d;d++)t[d]in a&&(i+='<a class="'+a[t[d]].className+'" title="'+a[t[d]].title+'" href="#"></a>');return i},n=t("<div>",{"class":"socialShare-addThis "+s[this.options.addThisButtonOrientation]+" "+d[this.options.addThisButtonSize],html:o(i)});return this.addThisButtonsContainer=n,n},initializeFollow:function(){var i,a=this.addThisButtonsContainer,d=a.offset().top,s=2*parseInt(a.css("top"),0),o=178,n=this.$el.height(),e=n-o,h=t(window);h.on("scroll",function(){var t=function(){return i=Math.max(s,h.scrollTop()-(d-s)),e>i?i:e};a.css("top",t())})}},t.fn[i]=function(a){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new d(this,a))})}});

/*!
* Content Tabs v1.0.2 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";function s(s,e){this.el=t(s),this.options=t.extend({},a,e),this._defaults=a,this._name=i,this.tabs=!1,this.panels=!1,this.init()}var i="contentTabs",a={displayTabs:!0,pinPanelIntro:!1,tabLocation:"left",tabActiveClass:"active",panelActiveClass:"active",mouseEvent:"click"};s.prototype={init:function(){if(!this.options.displayTabs)return this.removeTabs(),void 0;this.setTabLocation(this.tabLocationClassName[this.options.tabLocation]),this.options.pinPanelIntro&&this.el.addClass("pinPanelIntro");var s=this.getTabs();s.hasClass("active")||s.eq(0).addClass("active"),s.eq(s.length-1).addClass("last");var i,a=this;s.on("click",function(s){s.preventDefault(),i=t(this).index(),a.selectTab(i),a.selectPanel(i)})},tabLocationClassName:{left:"tabsVerticalLeft",right:"tabsVerticalRight",top:"tabsHorizontalTop",bottom:"tabsHorizontalBottom"},setTabLocation:function(t){this.el.addClass(t)},getTabs:function(){return this.tabs||(this.tabs=this.el.find(".contentTabsNav").find("li")),this.tabs},selectTab:function(t){this.getTabs().removeClass("active").eq(t).addClass("active")},removeTabs:function(){this.el.addClass("tabsNone"),this.getTabs().remove()},getPanels:function(){return this.panels||(this.panels=this.el.find(".contentTabsPanel")),this.panels},selectPanel:function(t){this.getPanels().hide().eq(t).show()}},t.fn[i]=function(a){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new s(this,a))})}});

/*!
* Featured Video v1.1.3 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(i){"function"==typeof define&&define.amd?define(["jquery"],i):i(jQuery)})(function(i){"use strict";var t="featuredVideo",e={autoplayFirstVideo:!0,supportsDeepLinking:!0,showPlaylist:!0,showPlaylistTooltips:!0,tooltipHtml:'<div class="featuredVideoPlaylistTooltip"></div>'},s=function(t,s){this.el=t,this.options=i.extend({},e,s),this.init()};s.prototype={init:function(){return this.$element=i(this.el),this.activeVideoId=0,this.hashVideoId=this.getVideoIdFromUrl(),this.player=this.$element.find(".featuredplayer"),this.playlist=this.$element.find(".featuredVideoPlaylist"),this.playlistVideos=this.playlist.find("li"),this.playlistVideosCount=this.playlistVideos.length,this.playlistFirstVideoId=this.playlistVideos.eq(0).data("videoId"),this.playOnHashChange=!0,0>=this.playlistVideosCount||1===this.playlistVideosCount&&""===this.playlistFirstVideoId?(this.$element.hide(),i.error("no video ids specified in playlist"),void 0):(this.options.supportsDeepLinking&&this.initializeHashLinking(),this.getPlayer(),void 0)},player:{},getPlayer:function(){var t={url:"http://admin.brightcove.com/js/BrightcoveExperiences.js",isLoaded:i(document).data("playerScriptLoaded")||!1},e=this,s=t.isLoaded?this.resolve():this.loadPlayerScript(t.url);i.when(s).done(function(){e.initializePlayer()}).fail(function(){i.error("Brightcove script failed to load")})},loadPlayerScript:function(t){var e=i.ajax(t,{dataType:"script"});return e},initializePlayer:function(){var i=this,t=window.brightcove||{};window.brightcovePlayerLoaded=function(e){var s=t.api.getExperience(e);i.player=s.getModule(t.api.modules.APIModules.VIDEO_PLAYER)},window.brightcovePlayerReady=function(){var t=i.options.autoplayFirstVideo?"load":"cue";i.playVideo(t,i.getVideoId()),i.initializePlaylist()},t.createExperiences()},playVideo:function(i,t,e){e===void 0&&(e="none"),"load"===i?this.player.loadVideoByID(t):"cue"===i&&this.player.cueVideoByID(t),this.options.showPlaylist&&this.activatePlaylistItem(void 0,e)},getVideoId:function(i){return this.activeVideoId=i!==void 0?i.data("videoId"):this.hashVideoId&&this.hasValidId(this.hashVideoId)?this.hashVideoId:this.playlistFirstVideoId,this.activeVideoId},hasValidId:function(i){var t=this.getPlaylistIds();return t.indexOf(i)>=0?!0:!1},activatePlaylistItem:function(i,t){i===void 0&&(i=this.playlist.find('li[data-video-id="'+this.activeVideoId+'"]')),"click"!==t&&this.bringPlaylistItemIntoView(i.get(0)),this.playlistVideos.removeClass("active"),i.addClass("active")},bringPlaylistItemIntoView:function(i){i.scrollIntoViewIfNeeded?i.scrollIntoViewIfNeeded(!0):i.scrollIntoView(!0)},updateUrlHash:function(i){this.options.supportsDeepLinking&&(window.location.hash="videoId="+i)},initializePlaylist:function(){if(!this.options.showPlaylist)return this.playlist.remove(),this.$element.addClass("noPlaylist"),void 0;var t=this;this.playlistVideos.on("click",function(e){e.preventDefault();var s=i(this).data("videoId");t.updateUrlHash(s),t.activeVideoId=s,t.playOnHashChange=!1,t.playVideo("load",s,e.type)}),this.options.showPlaylistTooltips&&this.initializePlaylistTooltips(),this.playlist.css("visibility","visible")},initializePlaylistTooltips:function(){var t=i(this.options.tooltipHtml),e=this.playlist.offset();this.$element.append(t),this.playlistVideos.on({mouseenter:function(){var s=i(this),o=s.find(".featuredVideoSummary").text(),a={top:s.offset().top-e.top};""!==o&&t.text(o).css("top",a.top).show()},mouseleave:function(){t.hide()}})},getPlaylistIds:function(){var t=[];return this.playlistVideos.each(function(){var e=""+i(this).data("videoId");t.push(e)}),t},initializeHashLinking:function(){if("onhashchange"in window){var t=this;i(window).on("hashchange",function(i){i.preventDefault(),t.playOnHashChange&&(t.activeVideoId=t.getVideoIdFromUrl(),t.playVideo("load",t.activeVideoId)),t.playOnHashChange=!0})}},getVideoIdFromUrl:function(){var i=this.getArgsFromUrl().videoId||this.getArgsFromUrl().bctid;return i===void 0&&(i=null),i},getArgsFromUrl:function(i){i=i||window.location.href;for(var t={},e=i.slice(i.indexOf("#")+1).split("&"),s=0,o=e.length;o>s;s++){var a=e[s].split("=");t[a[0]]=a.length>1?a[1]:null}return t}},i.fn[t]=function(e){return this.each(function(){i.data(this,"plugin_"+t)||i.data(this,"plugin_"+t,new s(this,e))})}});

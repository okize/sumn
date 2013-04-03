/* 2013-02-18 */

// BEGIN: doc ready
$(document).ready(function () {

  'use strict';

  /* addthis social share component */
  $('#micrositeHeader').addThisShare({
    addThisButtons: ['email', 'linkedin', 'facebook', 'twitter'],
    addThisProfileID: 'ra-4f0c7ed813520536',
    googleAnalyticsId: window.SITE_gaAccountID || false
  });

  // init featured video component
  $('.featuredVideo').featuredVideo({
    autoplayFirstVideo: false,
    supportsDeepLinking: true,
    showPlaylist: true,
    showPlaylistTooltips: true,
    tooltipHtml: '<div class="featuredVideoPlaylistTooltip"></div>'
  });

  // init content tabs component
  $('.contentTabs').not('#contentTabsDownloads').contentTabs({
    displayTabs: false
  });

  // downloads page needs tabs
  $('#contentTabsDownloads').contentTabs({
    tabLocation: 'top'
  });

  // making sweet, sweet navigation...
  (function () {
    var header = $('#micrositeHeader');
    if ( header.find('#micrositeHeaderNavigation').length === 0 ) {

      var thisPage = window.location.pathname;
      var root = 'http://www.computerweekly.com';

      var navDom = $('<div>', {
        id: 'micrositeHeaderNavigation',
        html: '<ul></ul>'
      });

      var navLinks = [
        {
          text: 'Optimised Data Centre',
          href: '/Oraclebusinesstransformationcentre'
        },
        {
          text: 'Business Analytics',
          href: '/OracleBusinessAnalytics'
        },
        {
          text: 'Customer Experience',
          href: '/OracleCustomerExperience'
        },
        {
          text: 'Cloud',
          href: '/OracleCloudComputing'
        }
      ];

      for (var i = 0, len = navLinks.length, active, tmpl = ''; i < len; i++) {
        active = (thisPage === navLinks[i].href) ? 'on' : '';
        tmpl += '<li class="' + active + '"><a href="' +  root + navLinks[i].href + '">' + navLinks[i].text + '</a></li>';
      }

      navDom.find('ul').append(tmpl);

      header.append(navDom);

    }
  }());

});
// END: doc ready


/*!
* Featured Video v1.0.0 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(i){"function"==typeof define&&define.amd?define(["jquery"],i):i(jQuery)})(function(i){"use strict";var t="featuredVideo",e={showPlaylist:!0,showPlaylistTooltips:!0,tooltipHtml:'<div class="featuredVideoPlaylistTooltip"></div>',autoplayFirstVideo:!0},s=function(t,s){this.el=t,this.options=i.extend({},e,s),this.init()};s.prototype={init:function(){return this.$element=i(this.el),this.activeVideoId=0,this.hashVideoId=this.getHashArgs().videoId,this.player=this.$element.find(".featuredplayer"),this.playlist=this.$element.find(".featuredVideoPlaylist"),this.playlistVideos=this.playlist.find("li"),this.playlistVideosCount=this.playlistVideos.length,this.playlistFirstVideoId=this.playlistVideos.eq(0).data("videoId"),0>=this.playlistVideosCount||1===this.playlistVideosCount&&""===this.playlistFirstVideoId?(this.$element.hide(),i.error("no video ids specified in playlist"),void 0):(this.getPlayer(),void 0)},player:{},getPlayer:function(){var t={url:"http://admin.brightcove.com/js/BrightcoveExperiences.js",isLoaded:i(document).data("playerScriptLoaded")||!1},e=this,s=t.isLoaded?this.resolve():this.loadPlayerScript(t.url);i.when(s).done(function(){e.initializePlayer()}).fail(function(){i.error("Brightcove script failed to load")})},loadPlayerScript:function(t){var e=i.ajax(t,{dataType:"script"});return e},initializePlayer:function(){var i=this,t=window.brightcove||{};window.brightcovePlayerLoaded=function(e){var s=t.api.getExperience(e);i.player=s.getModule(t.api.modules.APIModules.VIDEO_PLAYER)},window.brightcovePlayerReady=function(){var t=i.options.autoplayFirstVideo?"load":"cue";i.playVideo(t,i.getVideoId()),i.initializePlaylist()},t.createExperiences()},playVideo:function(i,t){"load"===i?this.player.loadVideoByID(t):"cue"===i&&this.player.cueVideoByID(t)},getVideoId:function(i){return this.activeVideoId=i!==void 0?i.data("videoId"):this.hashVideoId!==void 0?this.hashVideoId:this.playlistFirstVideoId,this.activeVideoId},getAllVideoIds:function(){var i=[];return i},activatePlaylistItem:function(i){i===void 0&&(i=this.playlist.find('li[data-video-id="'+this.getVideoId()+'"]')),this.playlistVideos.removeClass("active"),i.addClass("active")},initializePlaylist:function(){if(!this.options.showPlaylist)return this.playlist.remove(),this.$element.addClass("noPlaylist"),void 0;var t=this;this.activatePlaylistItem(),this.playlistVideos.on("click",function(e){e.preventDefault();var s=i(this);t.activatePlaylistItem(s),t.playVideo("load",s.data("videoId"))}),this.options.showPlaylistTooltips&&this.initializePlaylistTooltips(),this.playlist.css("visibility","visible")},initializePlaylistTooltips:function(){var t=i(this.options.tooltipHtml),e=this.playlist.offset();this.$element.append(t),this.playlistVideos.on({mouseenter:function(){var s=i(this),o=s.find(".featuredVideoSummary").text(),l={top:s.offset().top-e.top};""!==o&&t.text(o).css("top",l.top).show()},mouseleave:function(){t.hide()}})},getHashArgs:function(i){i=i||window.location.href;for(var t={},e=i.slice(i.indexOf("#")+1).split("&"),s=0;e.length>s;s++){var o=e[s].split("=");t[o[0]]=o.length>1?o[1]:null}return t}},i.fn[t]=function(e){return this.each(function(){i.data(this,"plugin_"+t)||i.data(this,"plugin_"+t,new s(this,e))})}});

/*!
* Content Tabs v0.4 (http://okize.github.com/)
* Copyright (c) 2012 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";function e(e,a){this.el=t(e),this.options=t.extend({},n,a),this._defaults=n,this._name=i,this.init()}var i="contentTabs",n={displayTabs:!0,tabLocation:"left",tabActiveClass:"active",panelActiveClass:"active",mouseEvent:"click"};e.prototype={init:function(){if(!this.options.displayTabs)return this.removeTabs(),void 0;var i=this.tabLocationClassName[this.options.tabLocation];this.el.addClass(i);var n=this.getTabs();n.on("click",function(i){i.preventDefault(),e.prototype.selectTab(t(this).index(),n)})},tabLocationClassName:{left:"tabsVerticalLeft",right:"tabsVerticalRight",top:"tabsHorizontalTop",bottom:"tabsHorizontalBottom"},removeTabs:function(){this.el.addClass("tabsNone"),t(".contentTabsNav",this.el).remove()},getTabs:function(){return this.el.find(".contentTabsNav").find("li")},getPanels:function(){return t(".contentTabsPanel",this.el)},selectTab:function(t,e){e.removeClass("active"),e.eq(t).addClass("active"),this.selectPanel(t)},selectPanel:function(t){var e=this.getPanels();e.hide(),e.eq(t).show()}},t.fn[i]=function(n){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new e(this,n))})}});

/*!
* AddThisShare v1.0.7 (http://okize.github.com/)
* Copyright (c) 2013 | Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){"use strict";var i="addThisShare",s={addThisProfileID:!1,addThisApiVersion:"300",addThisButtons:["email","linkedin","facebook","twitter"],addThisCss:!0,addThisButtonSize:"small",addThisButtonOrientation:"horizontal",addThisButtonFollow:!1,addThisButtonFollowBoundary:"",addThisTwitterTemplate:"{{title}} {{url}}",googleAnalyticsID:!1},o=function(o,d){this.element=o,this.$el=t(this.element),this.doc=t(window.document),this.options=t.extend({},s,d),this._defaults=s,this._name=i,this.addThisButtonsContainer={},this.addThisButtonsContainerHeight=null,this.addThisButtonFollowLimit=null,this.addThisScript="//s7.addthis.com/js/"+this.options.addThisApiVersion+"/addthis_widget.js",this.addThisConfiguration={pubid:this.options.addThisProfileID,url:window.location.href,title:window.document.title,ui_use_css:this.options.addThisCss,domready:!0,async:!0,data_track_clickback:!1,data_track_addressbar:!1,data_ga_tracker:this.options.googleAnalyticsID,data_ga_social:!0},this.addThisShareConfiguration={templates:{twitter:this.options.addThisTwitterTemplate}},this.addThisScriptCache={},this.init()};o.prototype={init:function(){var i=this;t.when(this.loadAddthisScript(this.addThisScript)).then(function(){i.isAddThisLoaded(!0),i.setAddThisConfiguration(),i.$el.append(i.buildAddThisHtml(i.options.addThisButtons)),i.addThisButtonsContainer.show(),i.options.addThisButtonFollow&&i.initializeFollow()})},isAddThisLoaded:function(t){return arguments.length>0&&"boolean"==typeof t&&this.doc.data("addThisScriptLoaded",t),this.doc.data("addThisScriptLoaded")===void 0?(this.doc.data("addThisScriptLoaded",!1),!1):this.doc.data("addThisScriptLoaded")},setAddThisConfiguration:function(){this.isAddThisReady()===!0&&window.addthis_config===void 0&&(window.addthis_config=this.addThisConfiguration,window.addthis_share=this.addThisShareConfiguration)},loadAddthisScript:function(i){var s=this.addThisScriptCache[i];return s||(s=t.ajax({url:this.addThisScript,cache:!0,dataType:"script"}),this.addThisScriptCache[i]=s),s},isAddThisReady:function(){return window.addthis===void 0?!1:!0},buildAddThisHtml:function(i){var s={email:{className:"addthis_button_email",title:"Email A Friend"},linkedin:{className:"addthis_button_linkedin",title:"Share on LinkedIn"},facebook:{className:"addthis_button_facebook",title:"Share on Facebook"},twitter:{className:"addthis_button_twitter",title:"Share on Twitter"},googleplus:{className:"addthis_button_google_plusone_share",title:"Share on Google+"},addthis:{className:"addthis_button_compact",title:"Share with AddThis Services"}},o={small:"addthis_default_style",medium:"addthis_20x20_style",large:"addthis_32x32_style"},d={horizontal:"addThisHorizontal",vertical:"addThisVertical"},a=function(t){for(var i="",o=0,d=t.length;d>o;o++)t[o]in s&&(i+='<a class="'+s[t[o]].className+'" title="'+s[t[o]].title+'" href="#"></a>');return i},n=t("<div>",{"class":"socialShare-addThis "+d[this.options.addThisButtonOrientation]+" "+o[this.options.addThisButtonSize],html:a(i)});return this.addThisButtonsContainer=n,n},initializeFollow:function(){var i=this.addThisButtonsContainer,s=t("<div>",{"class":"socialShare-outer"}),o=t("<div>",{"class":"socialShare-inner",width:this.$el.width()}),d={cssTop:parseInt(i.css("top"),10),offTop:parseInt(this.$el.offset().top,10),contentHeight:parseInt(this.$el.outerHeight(),10)},a=this,n=t(window),e=function(t,i){var s,o,d,a,n=0,e=function(){n=new Date,d=null,a=t.apply(s,o)};return function(){var h=new Date,l=i-(h-n);return s=this,o=arguments,0>=l?(clearTimeout(d),d=null,n=h,a=t.apply(s,o)):d||(d=setTimeout(e,l)),a}},h=function(){null===a.addThisButtonsContainerHeight&&(a.addThisButtonsContainerHeight=i.outerHeight()),null===a.addThisButtonFollowLimit&&(a.addThisButtonFollowLimit=d.contentHeight+d.offTop-d.cssTop-a.addThisButtonsContainerHeight),h=function(){}},l=function(){var t=function(t,o){s.css({position:t}),i.css({top:o+"px"})};0>=d.offTop-n.scrollTop()?a.addThisButtonFollowLimit<=n.scrollTop()?t("absolute",a.addThisButtonFollowLimit+d.cssTop):t("fixed",d.cssTop):d.offTop-n.scrollTop()>0&&t("absolute",d.cssTop+d.offTop)},r=e(l,25);i.css({top:d.cssTop+d.offTop+"px"}).prependTo("body").addClass("following").wrap(s).wrap(o),s=t(".socialShare-outer"),n.on("scroll",function(){h(),r()})}},t.fn[i]=function(s){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new o(this,s))})}});

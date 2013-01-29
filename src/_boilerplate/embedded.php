<?php error_reporting(E_ALL); ini_set('display_errors', '1'); ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta name="pageStart" content="1359057078694" />
  <title>Embedded Version of Microsite</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <link rel="stylesheet" type="text/css" href="http://media.ttgtmedia.com/rms/ux/css/global.css" id="stylesheetGlobal" media="screen" />
  <link rel="stylesheet" type="text/css" href="http://media.ttgtmedia.com/rms/ux/css/searchsqlserver_new.css" id="stylesheetSiteSpecific" media="screen" />
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

  <!-- this needs to be here in order to avoid uncaught reference errors in console -->
  <script type="text/javascript">
  var SITE_name = '';
  var SITE_v5sid = '';
  var SITE_hostName = 'techtarget';
  var ENV_clicktrackHost = 'http://clicktrack.techtarget.com';
  var ENV_mediaHost = 'http://cdn.ttgtmedia.com/rms/ux';
  var zone = 'HOME';
  var taxNameWithOutSpecialChars='Home';
  </script>

</head>
<body>
<div id="header">

  <div id="universalBar">
  <div id="universalBarCompress">
    <div id="seoKeyword">SEO SPAM</div>
    <div id="membershipLinks">
    <ul>
    <li id="mlLogin"><a href="http://users.qa.techtarget.com/registration/searchsqlserver/LoginRegister.page">Login</a></li>
    <li id="mlRegister"><a href="http://users.qa.techtarget.com/registration/searchsqlserver/Register.page">Become a member</a></li>
    <li id="mlRss"><a href="/rss"><span></span>RSS</a></li>
    <li id="mlNetwork"><a href="/?vgnextfmt=portfolio" class="ttNetworkLinks">Part of the TechTarget network</a></li>
    </ul>
    </div>
  </div>
  </div>

  <div id="headerLogo">
  <div id="headerLogoCompress">
    <a href="/">SearchSQLServer.com</a>
    <span id="headerTechtargetLogo"></span>
  </div>
  </div>

  <div id="headerNavigation">
  <div id="headerNavigationCompress">

    <div class="megaMenu">
      <ul>
      <li class="mmNavItem"><a href="http://searchsqlserver.qa.techtarget.com/news" class="mmNavLink">News</a></li>
      <li class="mmNavItem"><a href="http://searchsqlserver.qa.techtarget.com/ebooks" class="mmNavLink">Premium<br />E-Books &amp; E-Zines</a></li>
      <li class="mmNavItem"><a href="http://searchsqlserver.qa.techtarget.com/resources" class="mmNavLink">SQL Server<br />Topics</a></li>
      <li class="mmNavItem"><a href="http://searchsqlserver.qa.techtarget.com/SQL-Server-tutorials" class="mmNavLink">Tutorials</a></li>
      <li class="mmNavItem"><a href="http://searchsqlserver.qa.techtarget.com/tips" class="mmNavLink">Expert<br />Advice</a></li>
      <li class="mmNavItem"><a href="http://searchsqlserver.bitpipe.com" class="mmNavLink">White<br />Papers</a></li>
      <li class="mmNavItem"><a href="http://itknowledgeexchange.techtarget.com/itblogs/" class="mmNavLink">Blogs</a></li>
      </ul>
    </div>

    <div id="headerNavigationSearch" class="navigationSearch">
      <form action="/search/query" method="get" id="headerNavigationSearchForm">
      <fieldset>
      <label for="headerNavigationSearchTextbox" class="navigationSearchLabel">Search this site</label> <input type="hidden" name="start" value="0" /> <input type="hidden" name="filter" value="1" /> <input type="text" name="q" id="headerNavigationSearchTextbox" class="navigationSearchBox" /> <input type="submit" value="Search" id="headerNavigationSearchSubmit" class="navigationSearchSubmitButton" />
      </fieldset>
      </form>
    </div>

  </div>
  </div>

</div>

<div id="content">
<div id="contentCompress">

  <!-- BEGIN: embedded microsite -->
  <div id="micrositeAdvertisement">
  <h3>Advertisement</h3>
  <div id="micrositeClose"><a href="http://searchdatamanagement.techtarget.com">Close</a></div>
  </div>
  <?php include('main.php'); ?>
  <!-- END: embedded microsite -->

</div>
</div>

<div id="footer">

  <div id="footerNavigation">
    <div id="footerNavigationCompress">

      <div class="megaMenu">
        <script type="text/javascript">
        (function ($) {
          var mm = $("#headerNavigation .megaMenu");
          if (mm.length > 0) {
            $("#footerNavigation .megaMenu").html(mm.html());
          } else {
            $(document).ready(function ($) {
              $("#footerNavigation .megaMenu").html($("#headerNavigation .megaMenu").html());
            });
          }
        })(jQuery);
        </script>
      </div>

      <div id="footerNavigationSearch" class="navigationSearch">
        <form action="/search/query" method="get" id="footerNavigationSearchForm">
        <fieldset>
          <label for="footerNavigationSearchTextbox" class="navigationSearchLabel">Search this site</label> <input type="hidden" name="start" value="0" /> <input type="hidden" name="filter" value="1" /> <input type="text" name="q" id="footerNavigationSearchTextbox" class="navigationSearchBox" /> <input type="submit" value="Search" id="footerNavigationSearchSubmit" class="navigationSearchSubmitButton" />
        </fieldset>
        </form>
      </div>

    </div>
  </div>

  <div id="footerCompress">
    <div id="relatedSites">
      <h5>More from Related TechTarget Sites</h5>
      <ul id="relatedSitesNav" class="listTypeTab">
      <li><a href="#rsh-tab0">Business Analytics</a></li>
      <li><a href="#rsh-tab1">Data Center</a></li>
      <li><a href="#rsh-tab2">Data Management</a></li>
      <li><a href="#rsh-tab3">Data Management UK</a></li>
      </ul>
      <ul id="relatedSitesHeadlines" class="listTypeTabContent">
      <li id="rsh-tab0">
      <div class="rshLogo">
      <a class="searchbusinessanalytics" href="http://searchbusinessanalytics.qa.techtarget.com">Business Analytics</a>
      </div>
      <ul class="rshCols">
      <li>
      <h6><a href="http://searchbusinessanalytics.techtarget.com/news/2240169915/Mobile-BI-apps-move-up-the-corporate-priority-list">Mobile BI apps move up the corporate priority list</a></h6>
      <p>The growing use of tablet PCs and smartphones is spurring demand for mobile business intelligence capabilities from end users. Are you ready?</p>
      </li>
      <li>
      <h6><a href="http://searchbusinessanalytics.qa.techtarget.com/feature/BI-competency-center-brings-coordination-but-with-complications">BI competency center brings coordination -- but with complications</a></h6>
      <p>Managed effectively, business intelligence competency centers help align BI projects with corporate goals. But they also can become BI bottlenecks.</p>
      </li>

      <li>
      <h6><a href="http://searchbusinessanalytics.techtarget.com/feature/Survey-reveals-growing-interest-in-cloud-BI-and-analytics">Survey reveals growing interest in cloud BI and analytics</a></h6>

      <p>TechTarget's recent 2012 Cloud Pulse survey suggests cloud BI and analytics are edging closer to mainstream adoption.</p>
      </li>
      </ul>
      </li>

      <li id="rsh-tab1">
      <div class="rshLogo">
      <a class="searchdatacenter" href="http://searchdatacenter.qa.techtarget.com">Data Center</a>
      </div>

      <ul class="rshCols">
      <li>
      <h6><a href="http://searchdatacenter.techtarget.com/news/2240169972/Two-data-center-hosting-companies-one-building-and-Hurricane-Sandy">Two data center hosting companies, one building and Hurricane Sandy</a></h6>

      <p>Updated: Two data center hosting companies make their home in one building in Manhattan, which flooded Sunday.</p>
      </li>

      <li>
      <h6><a href="http://searchdatacenter.qa.techtarget.com/tip/FAQ-Make-the-most-of-VM-resources-with-strategic-allocation">FAQ: Make the most of VM resources with strategic allocation</a></h6>

      <p>Optimizing the allocation of VM resources will help make the most of data center virtualization.</p>
      </li>

      <li>
      <h6><a href="http://searchdatacenter.techtarget.com/quiz/How-much-do-you-know-about-big-data-infrastructure">How much do you know about 'big data' infrastructure?</a></h6>

      <p>Take this quiz to see if your data center's 'big data' infrastructure will hold up.</p>
      </li>
      </ul>
      </li>

      <li id="rsh-tab2">
      <div class="rshLogo">
      <a class="searchdatamanagement" href="http://searchdatamanagement.qa.techtarget.com">Data Management</a>
      </div>

      <ul class="rshCols">
      <li>
      <h6><a href="http://searchdatamanagement.qa.techtarget.com/news/2240169275/IBM-executives-customers-share-big-data-tips-at-Information-on-Demand">IBM executives, customers share 'big data' tips at Information on Demand</a></h6>

      <p>An IBM VP and a user from Sprint took to the stage at the vendor's Information on Demand conference to offer advice on how to make sense of big data.</p>
      </li>

      <li>
      <h6><a href="http://searchdatamanagement.qa.techtarget.com/news/2240165598/Zornes-connects-the-dots-between-big-data-and-master-data-management">Zornes connects the dots between big data and master data management</a></h6>

      <p>Consultant Aaron Zornes believes that MDM and big data were made for one another.</p>
      </li>

      <li>
      <h6><a href="http://searchdatamanagement.techtarget.com/news/2240165242/IT-pros-reveal-the-benefits-drawbacks-of-data-virtualization-software">IT pros reveal benefits, drawbacks of data virtualization software</a></h6>

      <p>Attendees at Composite Software's Data Virtualization Day conference had plenty of advice for companies considering a data virtualization project.</p>
      </li>
      </ul>
      </li>

      <li id="rsh-tab3">
      <div class="rshLogo">
      <a class="searchdatamanagementuk" href="http://searchdatamanagement.qa.techtarget.co.uk">DataManagement UK</a>
      </div>

      <ul class="rshCols">
      <li>
      <h6><a href="http://searchdatamanagement.techtarget.co.uk/video/Big-data-roundtable-webcast-gaining-value-from-big-data">Big data roundtable webcast: gaining value from big data</a></h6>

      <p>Roundtable discussion on business value of big data, chaired by Brian McKenna, Editor, SearchDataManagementUK, and featuring Mike Ferguson, Roxane Edjlali (Gartner), Joshua LeCure (GlaxoSmithKline).</p>
      </li>

      <li>
      <h6><a href="http://searchdatamanagement.techtarget.co.uk/news/2240113692/2012-training-courses-BI-data-management-data-warehousing">2012 training courses: BI, data management, data warehousing</a></h6>

      <p>Find out where to hone your business intelligence, data management and data warehouse skills with this list of training courses for 2012.</p>
      </li>

      <li>
      <h6><a href="http://searchdatamanagement.techtarget.co.uk/news/2240019939/Poor-data-quality-what-is-dirty-data-costing-UK-organizations">Poor data quality: what is dirty data costing UK organisations?</a></h6>

      <p>Poor data quality can have serious financial consequences for businesses. Read about the current state of data quality management at UK companies, including dirty data problems.</p>
      </li>
      </ul>
      </li>
      </ul>

      <span id="footerTechtargetLogo"></span>
    </div>
  </div>

  <div id="footerMiscLinks">
    <div id="footerMiscLinksCompress">
      <div id="footerCopyright">
        All Rights Reserved,<a href="/about/copyright">Copyright 2005 - 2013</a>, TechTarget
      </div>
      <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/about/contact">Contact Us</a></li>
      <li><a href="/about/index">Site Index</a></li>
      <li><a href="http://www.techtarget.com/html/privacy_policy.html">Privacy policy</a></li>
      <li><a href="/about/advertising">Advertisers</a></li>
      <li><a href="/about/partners">Business partners</a></li>
      <li><a href="/events">Events</a></li>
      <li><a href="http://www.techtarget.com/mediakit/">Media kit</a></li>
      <li><a href="http://www.techtarget.com/">TechTarget Corporate site</a></li>
      <li><a href="http://reprints.ygsgroup.com/m/techtarget">Reprints</a></li>
      <li><a href="/sitemap">Site map</a></li>
      </ul>
    </div>
  </div>
</div>

<script type="text/javascript" src="http://media.ttgtmedia.com/rms/ux/javascript/ss-combined.min.js"></script>
</body>
</html>
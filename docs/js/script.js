// table sorting
new Tablesort(document.getElementById('micrositeListTable'));

$(document).on('ready', function() {

  // for now using a symlink to actual json file...
  function getMicrositeList( ) {
    return $.getJSON('micrositeListClone.json').pipe(function (data) {
      return data.sites;
    });
  }

  // moment.js lib
  moment().format();

  var list = getMicrositeList(),
      arr = [],
      rows = { 'sites': []},
      rowsRetired = { 'sites': []},
      rowsCount = 1,
      rowsRetiredCount = 1,
      created,
      ifEmbedded = '',
      data = {},
      rowHtml = '{{#sites}}' +
                '<tr>' +
                '<td class="count">{{ num }}</td>' +
                '<td><a href="{{ localEngPath }}">{{ name }}</a></td>' +
                '<td class="createDate">{{ createDate }}</td>' +
                // '<td class="releases">{{ releases }}</td>' +
                // '<td>{{ lastRelease }}</td>' +
                '<td class="localSite"><a href="{{ localProdPath }}"><i class="icon-edit"></i></a></td>' +
                '<td class="pdSite"><a href="{{ pdPath }}"><i class="icon-share"></i></a></td>' +
                '<td class="previewSite"><a href="{{ previewPath }}"><i class="icon-check"></i></a></td>' +
                '<td><a href="{{ sitePath }}">{{ sitePath }}</a></td>' +
                '</tr>' +
                '{{/sites}}',
      template = Handlebars.compile(rowHtml);

  var getRowCount = function (type) {
    if (type === 'published') {
      return rowsCount;
    } else if (type === 'retired') {
      return rowsRetiredCount;
    }
  }

  list.done(function (items) {

    // get array of site names
    for (var site in items) {
      arr.push(site);
    }

    // sort array on alpha site name
    arr.sort();

    var buildRows = function (type, i) {

      ifEmbedded = (items[ arr[i] ].isEmbedded) ? 'embedded.html' : '';

      data = {
        num: getRowCount(type),
        name: arr[i],
        createDate: moment( new Date(items[ arr[i] ].createDate) ).format('YYYY / MM / DD'),
        releases: items[ arr[i] ].releases.count,
        lastRelease: moment( items[ arr[i] ].releases.last ).fromNow(),
        localEngPath: 'http://microsites.eng.techtarget.com/' + items[ arr[i] ].siteDirectory + '/' + ifEmbedded,
        localProdPath: 'http://microsites.techtarget.com/' + items[ arr[i] ].siteDirectory + '/' + ifEmbedded,
        pdPath: 'http://productdevelopment.techtarget.com/microsites/media.techtarget.com/' + items[ arr[i] ].siteDirectory + '/' + ifEmbedded,
        previewPath: items[ arr[i] ].urlPreview,
        sitePath: items[ arr[i] ].url
      };

      if (type === 'published') {
        rows.sites.push(data);
        rowsCount++;
      } else if (type === 'retired') {
        rowsRetired.sites.push(data);
        rowsRetiredCount++;
      }

    };

    // iterrate through json and build table rows
    for (var i = 0, len = arr.length; i < len; i++) {

      // filter out "inactive" sites
      if (items[ arr[i] ].isActive) {
        buildRows('published', i);
      } else {
        buildRows('retired', i);
      }

    }

    // append row template
    var table = $('#micrositeListTable');
    table
      .find('tbody')
      .append( template(rows) )
      .end()
      .find('tfoot')
      .append( template(rowsRetired) );

    // open links in new window
    $('#micrositeListTable').on('click', 'td', function (e) {
      e.preventDefault();
      var href = $(this).children('a').attr('href');
      if (typeof href !== 'undefined') {
        window.open( href );
      }
    });

  });

});
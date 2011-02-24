function(head, req) {
	var row, ddoc = this;
    var mustache = require("vendor/couchapp/lib/mustache");
    var data = {
      page_title : "Available surveys",
      site_title : this.couchapp.name,
      surveys : []
    };
  provides("html", function() {
    while (row = getRow()) {
      data.surveys.push({
        title : row.value.title,
        id : row.value._id
      });
    };
    log(data);
    send(mustache.to_html(ddoc.templates.surveys, data, ddoc.templates.partials));
  });
}
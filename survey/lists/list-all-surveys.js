function(head, req) {
	var row, ddoc = this;
    var Mustache = require("vendor/couchapp/lib/mustache");
    var Path = require("vendor/couchapp/lib/path").init(req);
	var abs = Path.asset();
	var survey_list = Path.list('list-all-surveys', 'view-all-surveys');
    var data = {
      page_title : "Available surveys",
      site_title : this.couchapp.name,
      abs : abs,
      survey_list : survey_list,
      surveys : []
    };
    provides("html", function() {
    while (row = getRow()) {
      data.surveys.push({
        title : row.value.title,
        id : row.value._id
      }); //push
    }; //while row
    return Mustache.to_html(ddoc.templates.surveys, data, ddoc.templates.partials);
  }); //provides
}
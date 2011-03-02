function(head, req) {
	/*
	 * Displays a list of responses from a view
	 * Template: templates/responses
	 * View: q-and-resp
	 */
	var row, ddoc = this;
    var Mustache = require("vendor/couchapp/lib/mustache");
    var Path = require("vendor/couchapp/lib/path").init(req);
	var abs = Path.asset();
	var survey_list = Path.list('surveys', 'all-surveys');
	var survey_results = Path.list('results', 'all-results');
    var data = {
      page_title : "Available responses",
      site_title : this.couchapp.name,
      abs : abs,
      survey_list : survey_list,
      survey_results : survey_results,
      surveys : []
    };
    provides("html", function() {
    while (row = getRow()) {
      data.surveys.push({
        title : row.value.title,
        id : row.value._id
      }); //push
    }; //while row
    return Mustache.to_html(ddoc.templates.responses, data, ddoc.templates.partials);
  }); //provides
}
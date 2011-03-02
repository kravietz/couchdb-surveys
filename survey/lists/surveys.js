function(head, req) {
	// Display a list of all surveys with link to each survey and its responses
	// Template: templates/surveys
	// View: surveys/all-surveys
	var row, ddoc = this;
    var Mustache = require("vendor/couchapp/lib/mustache");
    var Path = require("vendor/couchapp/lib/path").init(req);
	var abs = Path.asset();
	var survey_list = Path.list('surveys', 'all-surveys');
	var survey_results = Path.list('results', 'all-results');
    var data = {
      page_title : "Available surveys",
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
    return Mustache.to_html(ddoc.templates.surveys, data, ddoc.templates.partials);
  }); //provides
}
function(head, req) {
	// Display a list of all surveys with link to each survey and its responses
	// Template: templates/surveys
	// View: all-surveys
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
      id = row.value._id;
      data.surveys.push({
        title : row.value.title,
        id : id,
        start : escape(JSON.stringify([id])), 
        stop : escape(JSON.stringify([id,"x"]))
        // startkey=["5baf93a6d0e7fe88ba1540506500031c"]&endkey=["5baf93a6d0e7fe88ba1540506500031c","x"]
      }); //push
    }; //while row
    return Mustache.to_html(ddoc.templates.surveys, data, ddoc.templates.partials);
  }); //provides
}
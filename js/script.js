function getFormData(formId) {
  const $inputs = $(formId).find("input, select, textarea");
  var formObj = {};
  $inputs.each((indx, obj) => {
    formObj[$(obj).attr("name")] = $(obj).val();
  });
  return formObj;
}

function patchValue(formId, data) {
  const $inputs = $(formId).find("input, select, textarea");
  $inputs.each((indx, obj) => {
    $(obj).val(data[$(obj).attr("name")]);
  });
}

function getColumns(response) {
  const rowIdentifiers = Object.keys(response);
  var columns = {};
  rowIdentifiers.forEach((id) => {
    const rowColumns = Object.keys(response[id]);
    rowColumns.forEach((key) => {
      columns[key] = key.split("_").join(" ");
    });
  });
  return columns;
}

function generateTable(response, tableId) {
  const rowIdentifiers = Object.keys(response);
  const columns = getColumns(response);
  var theader = "<thead><tr>";
  Object.keys(columns).forEach((key) => {
    theader += '<th class="text-capitalize">' + columns[key] + "</th>";
  });
  theader += "</tr></tbody>";

  var tbody = "<tbody>";
  rowIdentifiers.forEach((id) => {
    tbody += "<tr>";
    Object.keys(columns).forEach((key) => {
      tbody += "<td>" + response[id][key] + "</td>";
    });
    tbody +=
      '<td><a class="btn btn-primary btn-sm mr-2 edit" id="' +
      id +
      '">Edit</a>' +
      '<a class="btn btn-primary btn-sm delete" id="' +
      id +
      '"> Delete</a></td>';
    tbody += "</tr>";
  });

  $(tableId).html(theader + tbody);
}

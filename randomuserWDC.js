(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "gender",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "first_name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "last_name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "title",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "street_name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "street_number",
            dataType: tableau.dataTypeEnum.int,
            columnType: tableau.columnTypeEnum.discrete
        },{
            id: "city",
            dataType: tableau.dataTypeEnum.string,
            geoRole: tableau.geographicRoleEnum.city
        },{
            id: "country",
            dataType: tableau.dataTypeEnum.string,
            geoRole: tableau.geographicRoleEnum.country
        },{
            id: "postcode",
            dataType: tableau.dataTypeEnum.int,
            columnType: tableau.columnTypeEnum.discrete,
            geoRole: tableau.geographicRoleEnum.zip_code_postcode
        },{
            id: "latitude",
            dataType: tableau.dataTypeEnum.float,
            geoRole: tableau.geographicRoleEnum.latitude,
            aggType: tableau.aggTypeEnum.avg
        },{
            id: "longitude",
            dataType: tableau.dataTypeEnum.float,
            geoRole: tableau.geographicRoleEnum.longitude,
            aggType: tableau.aggTypeEnum.avg
        }]
        var tableSchema = {
            id: "RandomUser",
            alias: "RandomUser data",
            columns: cols
        };
    
        schemaCallback([tableSchema]);

    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://randomuser.me/api/?results=100", function(resp) {
            var feat = resp.results,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id.value,
                    "gender": feat[i].gender,
                    "first_name": feat[i].name.first,
                    "last_name": feat[i].name.last,
                    "title": feat[i].name.title,
                    "street_name": feat[i].location.street.name,
                    "street_number": feat[i].location.street.number,
                    "city": feat[i].location.city,
                    "country": feat[i].location.country,
                    "postcode": feat[i].location.postcode,
                    "latitude": feat[i].location.coordinates.latitude,
                    "longitude": feat[i].location.coordinates.longitude
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Random User API";
            tableau.submit();
        });
    });
})();
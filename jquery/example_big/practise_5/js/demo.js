$(document).ready(function() {
    $("#save_condition").click(function() {
        $("#one").show();
        $("#two").hide();
        $(".save_condition").addClass("actives");
        $(".cloud_condition").removeClass("actives");
    });
    $("#cloud_condition").click(function() {
        $("#two").show();
        $("#one").hide();
        $(".save_condition").removeClass("actives");
        $(".cloud_condition").addClass("actives");
    })
    $.ajax({
        type: "GET",
        url: "../js/data.json",
        dataType: "json",
        success: function(msg) {
            var data = msg.data;
            var headerList = data.header;
            var iconHref = data.icon;
            var rows = data.rows;
            $(".card_table_container").tableBanner({
                arrList: ["server", "groupName", "realmName", "breakdown", "load", "automatic"], 
                headerList: headerList,
                rows: rows,
                headerLen: headerList.length,
                rowsLen: rows.length,
                iconHref: iconHref
            });
        }
    });

})
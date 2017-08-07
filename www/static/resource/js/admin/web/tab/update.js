// $(document).ready(
//     function () {
        $("#submit").click(
            function () {
                if ($("#submit").text() == 'Update') {
                    $("#submit").text('Submit');
                    $("*").removeAttr("disabled");
                    return false;
                }
            });
//     }
// );
function validate (){
    let isValid = true;

    //When states and cities are given, add jquery for those select statements
    
    $("input").each(function() {
        var element = $(this);
        if (element.val() == "") {
            isValid = false;
            element.addClass('is-invalid');
            $('#errorMsg').show();
        }
    });
    if(isValid)
        $('#errorMsg').hide();
    return isValid;
}
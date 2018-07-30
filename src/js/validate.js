const validate = () => {
    let isValid = true;

    //Traversing through all the select elements and checking if a value has been selected or not
    $("select").each(function() {
        var element = $(this);
        if (element.val() == "default") {
            isValid = false;
            element.addClass('is-invalid');
        }
    });

    //Traversing through all the input elements and checking if they're empty
    $("input").each(function() {
        var element = $(this);
        if (element.val() == "") {
            isValid = false;
            element.addClass('is-invalid');
        }
    });

    //Show the error alert box if any of the fields are empty/default
    if(isValid) {
        $('#errorMsg').hide();
    } else {
        $('#errorMsg').show();
    }

    return isValid;
}
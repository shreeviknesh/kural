const validate = () => {
    let isValid = true;
    //Traversing through all the select elements and checking if a value has been selected or not
    $("select").each(function() {
        var element = $(this);
        if (element.val() == 'default') {
            isValid = false;
            element.addClass('is-invalid');
        }
        else {
            element.removeClass('is-invalid');
        }
    });
    //Traversing through all the input elements and checking if they're empty
    $("input").each(function() {
        var element = $(this);
        if (element.val() == '') {
            isValid = false;
            element.addClass('is-invalid');
        }
        else {
            element.removeClass('is-invalid');
        }
    });
    if(isValid) {
        if($("#password1").val() != $("#password2").val()) {
            $("#password1").addClass('is-invalid');
            $("#password2").addClass('is-invalid');
            isValid = false;
        } else {
            $("#password1").removeClass('is-invalid');
            $("#password2").removeClass('is-invalid');
        }
    }
    //To Remove all alert messages (error_msg, success_msg, error) if any
    $(".alert").remove();

    return isValid;
}
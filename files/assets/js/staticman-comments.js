// StaticMan comments support for Nikola
var out;
$(document).ready(function() {
    $('.staticman-comment-form').submit(function() {
        jqThis = $(this);
        // Gather data for submission
        slug = jqThis.find('input[name="options[slug]"]').val();
        name = jqThis.find('input#commentName').val();
        text = jqThis.find('textarea#commentText').val();

        posturl = jqThis.attr('action');
        postdata = {
            "options[slug]": slug,
            "fields[name]": name,
            "fields[comment]": text,
        };

        // Submit and handle
        $('button#commentSubmit').attr('disabled', 'disabled');
        $.post(posturl, postdata).done(function(data) {
            console.debug("Received response:");
            console.debug(data);
            $('button#commentSubmit').removeAttr('disabled');
            if (data['success'] === true) {
                alert("Comment added! It might take a while to appear on the site.");
            } else {
                alert("Failed to add comment! Reason:\n" + data.responseText);
            }
        }).fail(function(data) {
            console.error("Received ERROR response:");
            console.error(data);
            $('button#commentSubmit').removeAttr('disabled');
            alert("Failed to add comment! Reason:\n" + data.responseText);
        });

        return false; // don't need to submit again
    });
});

function redirectIfNeeded() {
    // Only redirect utoronto.2i2c.cloud, lets us keep staging at staging.utoronto.2i2c.cloud
    if (window.location.hostname === 'jupyter.cal-icor.org') {
        // Let's give users an indication that something is happening
        document.write("Redirecting you to jupyter.cal-icor.org...");
        window.location.hostname = 'jupyter.cal-icor.org';
    }
}
function setInterface(interfaceUrl) {
    let loginUrl = new URL($('#home').data('authenticator-login-url'), document.location.origin);
    loginUrl.searchParams.set('next', '/hub/user-redirect/' + interfaceUrl)
    $('#login-button').attr(
        'href',
        loginUrl.toString()
    );
}
$(function() {
    redirectIfNeeded();
    // if next query param is presentm just do nothing
    const nextPresent = new URL(document.location).searchParams.get('next');
    // /hub/ being next should be treated same as no next present
    if (!nextPresent || nextPresent === "/hub/") {
        setInterface($("input[name='interface']:checked").val());

        $("input[name='interface']").change(function() {
            if (this.checked) {
                setInterface(this.value)
            }
        });
    }

})
//** OPEN PAGES **//
function openPage(id) {

    $("#pages").addClass("active").find("article").removeClass("active");

    setTimeout(function(){ $("#" + id).addClass("active"); }, 1000);

}

//** CLOSE PAGES **//
function closePages() {
    $("#pages").removeClass("active").find("article").removeClass("active");
}
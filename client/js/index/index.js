s_now = '1s';
function GoPage(s) {
    id_dell = document.getElementById(s_now);
    id_dell.style.border = "0px";
    id_create = document.getElementById(`${s}s`);
    id_create.style.cssText = "border: 1px solid white; border-radius: 8px;";
    s_now = `${s}s`;
}
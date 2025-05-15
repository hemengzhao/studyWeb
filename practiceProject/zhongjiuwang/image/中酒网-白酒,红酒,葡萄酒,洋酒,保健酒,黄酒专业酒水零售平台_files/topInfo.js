$(function () {

    refreshCartProducts();
    initMemInfo();
	$("#searchBox").attr("readonly",true);
	setTimeout(function(){
      $("#searchBox").attr("readonly",false);
    },2000);
});
function refreshCartProducts() {
    $.post('/cart/GetCartProducts', {}, function (cart) {
        var products = cart.products;
        var count = cart.totalCount;
        $('#shopping-amount,#right_cart em').html(count);
    });
}
function initMemInfo() {
    $.ajax({
        url: '/ProductPartial/GetMember',
        dataType: 'JSON',
        success: function (data) {
            if (data.islogin) {
                $('.login-regin').html('<li> <a href="/usercenter/home">' + data.username+'</a> &nbsp; <a href="javascript:logout()">[退出]</a></li>');
            }
        }
    });
}

function logout() {
    $.removeCookie('Himall-User', { path: '/', domain: '.zhongjiu.cn' });
    $.removeCookie('Himall-SellerManager', { path: "/", domain: '.zhongjiu.cn' });
    $.removeCookie('cps_cookie', { path: "/", domain: '.zhongjiu.cn' });
    window.location.href = "/Login";
}
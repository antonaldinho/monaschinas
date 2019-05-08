const urls = {};

urls.base = "http://192.169.99.1:3000/";

urls.login = urls.base + 'login';
urls.getUserPurchaseHistory = urls.base + 'api/ticket/getUserPurchaseHistory?user_id=';
urls.getProducts = urls.base + 'api/products';
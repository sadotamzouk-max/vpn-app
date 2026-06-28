// تسجيل الـ Service Worker ليعمل المتصفح بدون إنترنت
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('جاهز للعمل كمتصفح مستقل!'))
            .catch(err => console.log('خطأ في التسجيل:', err));
    });
}

const goBtn = document.getElementById('goBtn');
const urlInput = document.getElementById('urlInput');
const countrySelect = document.getElementById('countrySelect');
const statusText = document.getElementById('statusText');
const statusDot = document.getElementById('statusDot');

goBtn.addEventListener('click', launchSecureBrowser);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') launchSecureBrowser();
});

function launchSecureBrowser() {
    let targetUrl = urlInput.value.trim();
    if (!targetUrl) return;

    // إصلاح الرابط تلقائياً
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
    }

    const selectedCountryName = countrySelect.options[countrySelect.selectedIndex].text;

    // تحديث شريط الحالة
    statusDot.classList.add('active');
    statusText.innerText = `متصل عبر سيرفر منزلك - جاري تشفير: ${selectedCountryName}`;
    statusText.style.color = "#00e676";

    // رابط السيرفر الخاص بكمبيوترك
    const myComputerServer = "https://cool-melons-wash.loca.lt"; 
    
    // توجيه الطلب المشفر عبر كمبيوترك الخاص مباشرة
    const finalUrl = `${myComputerServer}/?url=${encodeURIComponent(targetUrl)}`;
    
    // فتح النافذة بنجاح وتخطي كل حجب
    window.open(finalUrl, '_blank');
}

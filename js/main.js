const osTheme = window.matchMedia("(prefers-color-scheme: dark)")
osTheme.addEventListener("change", onOsThemeHasChanged)

const cache = localStorage.getItem("theme")
const osThemeIsDark = osTheme.matches

if (cache === "dark") {
    toDark()
} else if (cache === "light") {
    toLight()
} else if (osThemeIsDark) {
    toDark()
} else {
    toLight()
}

/* 切替ボタン関連の処理は画面読み込み後に行う(nullってしまうの防止) */
window.onload = function(){
    const toggle = document.getElementById("darkmode-toggle")
    toggle.checked = currentThemeIsDark()
    toggle.addEventListener("click", onToggleHasChanged)
}

function onToggleHasChanged(event) {
    const isDark = event.target.checked
    if (isDark) {
        toDark()
    } else {
        toLight()
    }  
    syncLocalStorage(isDark)
}

function onOsThemeHasChanged() {
    const osThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (osThemeIsDark) {
        toDark()
    } else {
        toLight()
    }
    syncLocalStorage(osThemeIsDark)
}

/* テーマの切替状態を保存 ページ遷移後も状態を維持する */
function syncLocalStorage(isDark) {
    const osThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (isDark == osThemeIsDark ){
        localStorage.removeItem("theme")
        return
    }

    if (isDark) {
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.setItem("theme", "light")
    }
}

function toDark() {
    document.documentElement.setAttribute("theme", "dark")
}

function toLight() {
    document.documentElement.setAttribute("theme", "light")
}

function currentThemeIsDark() {
    return (document.documentElement.getAttribute("theme") === "dark")
}
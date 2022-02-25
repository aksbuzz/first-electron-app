const osName = document.getElementById('os-name');

let os_name = '';
const getOpSysName = async () => {
    os_name = await window.electronAPI.getOpSysName();
    return String(os_name);
};
getOpSysName().then(name => (osName.textContent = name));

// http://35.229.174.180:18866/portfolio/index.html

async function remote_hi(){
    response=await fetch('http://35.229.174.180:18866/hi');
    return response.text();
//     json=await response.json();
//     return json;
}

function listen_click(){
    document.querySelectorAll('.column').forEach(async div=>{
        div.addEventListener('click', async event=>{
            str_hi=await remote_hi();
            console.log(str_hi);
            console.log(div);
            str_project_name="cameo_motion_new_project";
            prompt("請輸入數據動圖專案名稱", str_project_name);
            alert(`${str_project_name} 專案建立成功`)
        })
    })    
}
listen_click()
